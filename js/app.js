(function() {
  'use strict';

  var state = { view: null, mode: 'flip', deck: [], idx: 0, flipped: false, correct: 0, total: 0, coinsEarned: 0, quizDone: false, typeDone: false, shopTab: 'food', invTab: 'consumables' };

  function init() {
    PetManager.load(); Economy.load(); SRS.load(); Inventory.load(); Room.load(); Achievements.load(); Diary.load();
    PetManager.tick();

    if (!PetManager.exists()) {
      setTimeout(function() { el('splash').classList.remove('active'); showChoose(); }, 1200);
    } else {
      setTimeout(function() { el('splash').classList.remove('active'); nav('view-home'); checkDaily(); }, 1200);
    }

    bindNav(); bindStudy(); bindShop(); bindInventory();

    // Pet stat decay every 60s
    setInterval(function() { PetManager.tick(); if (state.view === 'view-home') updateHome(); }, 60000);

    if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(function(){});
  }

  /* ======== NAV ======== */
  function nav(id) {
    var views = document.querySelectorAll('.view');
    for (var i = 0; i < views.length; i++) views[i].classList.remove('active');
    el(id).classList.add('active');
    var btns = document.querySelectorAll('.nav-btn');
    for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('active', btns[i].dataset.view === id);
    state.view = id;

    if (id === 'view-home') updateHome();
    else if (id === 'view-chapters') renderChapters();
    else if (id === 'view-shop') renderShop();
    else if (id === 'view-inventory') renderInventory();
    else if (id === 'view-more') renderMore();
  }

  function bindNav() {
    on(document.querySelectorAll('.nav-btn'), 'click', function() { nav(this.dataset.view); });
    el('btn-home-study').addEventListener('click', function() { nav('view-chapters'); });
    el('btn-home-feed').addEventListener('click', showFeedModal);
    el('btn-home-play').addEventListener('click', function() { startSession(ALL_WORDS, 'quiz'); });
    el('btn-study-back').addEventListener('click', function() { nav('view-home'); });
    el('btn-session-done').addEventListener('click', function() { el('modal-complete').classList.remove('active'); nav('view-home'); });
    el('btn-daily-claim').addEventListener('click', claimDaily);

    // Close modals on overlay
    on(document.querySelectorAll('.modal-overlay'), 'click', function() {
      var m = this.closest('.modal');
      if (m && m.id !== 'modal-complete' && m.id !== 'modal-daily') m.classList.remove('active');
    });
  }

  /* ======== PET SELECTION ======== */
  function showChoose() {
    var grid = el('choose-grid');
    grid.innerHTML = '';
    var selected = null;
    for (var i = 0; i < PetManager.TYPES.length; i++) {
      (function(t) {
        var card = document.createElement('button');
        card.className = 'choose-card';
        var previewSvg = PET_SPRITES[t.id] || '';
        card.innerHTML = '<div class="choose-pet-preview">' + previewSvg + '</div><span class="choose-card-name">' + t.name + '<br><small style="color:var(--text-3)">' + t.nameJa + '</small></span>';
        card.addEventListener('click', function() {
          var all = grid.querySelectorAll('.choose-card');
          for (var j = 0; j < all.length; j++) all[j].classList.remove('selected');
          card.classList.add('selected');
          selected = t.id;
          el('choose-name-section').style.display = 'block';
        });
        grid.appendChild(card);
      })(PetManager.TYPES[i]);
    }

    el('btn-start').addEventListener('click', function() {
      if (!selected) { toast('Pick a pet first!'); return; }
      var name = el('pet-name-input').value.trim() || 'Mochi';
      PetManager.create(selected, name);
      Economy.earn(50); // starting coins
      Diary.addEntry();
      nav('view-home');
      showTutorial();
    });

    el('view-choose').classList.add('active');
  }

  /* ======== HOME ======== */
  function updateHome() {
    if (!PetManager.pet) return;
    var p = PetManager.pet;
    el('pet-name-display').textContent = p.name;
    el('pet-level-badge').textContent = 'Lv.' + p.level;
    el('coin-amount').textContent = Economy.getCoins();

    el('stat-hunger').style.width = p.hunger + '%';
    el('stat-thirst').style.width = p.thirst + '%';
    el('stat-happy').style.width = p.happiness + '%';
    el('stat-clean').style.width = p.cleanliness + '%';

    renderPet('pet-home');
  }

  function renderPet(containerId) {
    var c = el(containerId);
    if (!c || !PetManager.pet) return;
    var p = PetManager.pet;
    var mood = PetManager.getMood();
    var svg = PET_SPRITES[p.type] || PET_SPRITES.cat;

    var outfitClasses = '';
    if (p.equipped.hat) outfitClasses += ' ' + getOutfitClass(p.equipped.hat);
    if (p.equipped.acc) outfitClasses += ' ' + getOutfitClass(p.equipped.acc);
    if (p.equipped.body) outfitClasses += ' ' + getOutfitClass(p.equipped.body);

    c.innerHTML = '<div class="pet mood-' + mood + outfitClasses + '">' + svg +
      '<div class="outfit-hat"></div><div class="outfit-acc"></div><div class="outfit-body"></div></div>';
  }

  function getOutfitClass(itemId) {
    var item = getShopItem(itemId);
    return item && item.cssClass ? item.cssClass : '';
  }

  /* ======== CHAPTERS ======== */
  function renderChapters() {
    var box = el('chapters-list');
    box.innerHTML = '<h2 class="section-title" style="margin-top:0">Intensive Oral Japanese</h2>';
    if (typeof CLASS_NOTES_DATA === 'undefined') return;

    for (var i = 0; i < CLASS_NOTES_DATA.length; i++) {
      (function(ch) {
        var mastered = 0, learning = 0;
        for (var j = 0; j < ch.words.length; j++) {
          var c = SRS.cards[ch.words[j].id];
          if (c && c.iv >= 21) mastered++;
          else if (c && c.rc > 0) learning++;
        }
        var pct = ch.words.length > 0 ? Math.round((mastered / ch.words.length) * 100) : 0;

        var div = document.createElement('div');
        div.className = 'ch-card';
        div.style.borderLeftColor = ch.color;
        div.innerHTML =
          '<div class="ch-header"><span class="ch-emoji">' + ch.emoji + '</span><div><div class="ch-name">' + esc(ch.name) + '</div><div class="ch-sub">' + esc(ch.subtitle) + '</div></div></div>' +
          '<div class="ch-meta"><span>' + ch.words.length + ' words</span><span>' + mastered + ' mastered</span><span>' + learning + ' learning</span></div>' +
          '<div class="ch-bar"><div class="ch-fill" style="width:' + pct + '%"></div></div>' +
          '<div class="ch-actions"><button class="ch-btn ch-btn-study">Study</button><button class="ch-btn ch-btn-quiz">Quiz</button></div>';

        div.querySelector('.ch-btn-study').addEventListener('click', function() { startSession(ch.words, 'study'); });
        div.querySelector('.ch-btn-quiz').addEventListener('click', function() { startSession(ch.words, 'quiz'); });
        box.appendChild(div);
      })(CLASS_NOTES_DATA[i]);
    }
  }

  /* ======== STUDY ======== */
  function startSession(words, mode) {
    state.deck = mode === 'quiz' ? SRS._sh(words).slice(0, 20) : SRS.buildDeck(words, Math.min(words.length, 20));
    if (!state.deck.length) { toast('No cards available'); return; }
    state.idx = 0; state.flipped = false; state.correct = 0; state.total = 0; state.coinsEarned = 0;
    state.mode = mode === 'quiz' ? 'quiz' : 'flip';
    switchMode(state.mode);
    showCard();
    if (PetManager.pet) renderPet('study-pet-mini');
    nav('view-study');
  }

  function bindStudy() {
    on(document.querySelectorAll('.mode-btn'), 'click', function() { switchMode(this.dataset.mode); if (state.deck.length) showCard(); });
    el('card').addEventListener('click', function(e) { if (!e.target.closest('.btn-listen')) flipCard(); });
    on(document.querySelectorAll('.rate-btn'), 'click', function() { rateCard(parseInt(this.dataset.rate)); });
    el('btn-listen').addEventListener('click', function(e) { e.stopPropagation(); if (state.deck[state.idx]) speak(state.deck[state.idx].hiragana); });
    el('btn-quiz-next').addEventListener('click', advance);
    el('btn-submit').addEventListener('click', checkType);
    el('tp-input').addEventListener('keydown', function(e) { if (e.key === 'Enter') checkType(); });
    el('btn-type-next').addEventListener('click', advance);
    initSwipe();
  }

  function switchMode(m) {
    state.mode = m;
    var panels = document.querySelectorAll('.mode-panel');
    for (var i = 0; i < panels.length; i++) panels[i].classList.remove('active');
    el('mode-' + m).classList.add('active');
    var btns = document.querySelectorAll('.mode-btn');
    for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('active', btns[i].dataset.mode === m);
  }

  function showCard() {
    if (state.idx >= state.deck.length) { showComplete(); return; }
    var w = state.deck[state.idx];
    el('counter').textContent = (state.idx + 1) + '/' + state.deck.length;
    el('study-prog-fill').style.width = ((state.idx / state.deck.length) * 100) + '%';
    if (state.mode === 'flip') showFlip(w);
    else if (state.mode === 'quiz') showQuiz(w);
    else showType(w);
  }

  function showFlip(w) {
    state.flipped = false;
    var c = el('card'); c.classList.remove('flipped', 'swipe-right', 'swipe-left'); c.style.transform = ''; c.style.transition = '';
    el('cf-emoji').textContent = w.emoji; el('cf-meaning').textContent = w.meaning;
    el('cb-emoji').textContent = w.emoji; el('cb-kanji').textContent = w.kanji;
    el('cb-reading').textContent = w.hiragana; el('cb-romaji').textContent = w.romaji;
    el('cb-sja').textContent = w.sentence.ja; el('cb-sro').textContent = w.sentence.romaji; el('cb-sen').textContent = w.sentence.en;
    el('rating-bar').style.display = 'none';
  }

  function flipCard() {
    if (state.mode !== 'flip' || state.flipped) return;
    state.flipped = true; el('card').classList.add('flipped'); el('rating-bar').style.display = 'flex';
    speak(state.deck[state.idx].hiragana);
  }

  function rateCard(r) {
    var w = state.deck[state.idx];
    var ok = SRS.review(w.id, r);
    var coins = Economy.earnFromStudy(r);
    state.total++; if (ok) state.correct++; state.coinsEarned += coins;
    PetManager.addXP(ok ? 10 : 2);
    el('card').classList.add(ok ? 'swipe-right' : 'swipe-left');
    setTimeout(function() { state.idx++; showCard(); }, 350);
  }

  function showQuiz(w) {
    state.quizDone = false;
    el('qz-emoji').textContent = w.emoji; el('qz-word').textContent = w.kanji;
    el('qz-sub').textContent = w.hiragana + ' (' + w.romaji + ')';
    el('btn-quiz-next').style.display = 'none';
    var opts = quizOpts(w);
    var box = el('qz-options'); box.innerHTML = '';
    for (var i = 0; i < opts.length; i++) {
      (function(o) {
        var b = document.createElement('button'); b.className = 'quiz-opt'; b.textContent = o.meaning;
        b.dataset.correct = o.id === w.id ? '1' : '0';
        b.addEventListener('click', function() { if (!state.quizDone) quizPick(this, w); });
        box.appendChild(b);
      })(opts[i]);
    }
    speak(w.hiragana);
  }

  function quizOpts(w) {
    var pool = state.deck.filter(function(v) { return v.id !== w.id && v.meaning !== w.meaning; });
    if (pool.length < 3) pool = ALL_WORDS.filter(function(v) { return v.id !== w.id && v.meaning !== w.meaning; });
    var picks = [w]; var sh = SRS._sh(pool);
    for (var i = 0; i < sh.length && picks.length < 4; i++) picks.push(sh[i]);
    return SRS._sh(picks);
  }

  function quizPick(btn, w) {
    state.quizDone = true;
    var ok = btn.dataset.correct === '1';
    btn.classList.add(ok ? 'correct' : 'wrong');
    var all = document.querySelectorAll('.quiz-opt');
    for (var i = 0; i < all.length; i++) { all[i].classList.add('disabled'); if (all[i].dataset.correct === '1') all[i].classList.add('correct'); }
    var isOk = SRS.review(w.id, ok ? 3 : 1);
    var coins = Economy.earnFromStudy(ok ? 3 : 1);
    state.total++; if (isOk) state.correct++; state.coinsEarned += coins;
    PetManager.addXP(isOk ? 10 : 2);
    el('btn-quiz-next').style.display = 'block';
  }

  function showType(w) {
    state.typeDone = false;
    el('tp-emoji').textContent = w.emoji; el('tp-word').textContent = w.meaning;
    var inp = el('tp-input'); inp.value = ''; inp.className = 'type-field'; inp.disabled = false;
    setTimeout(function() { inp.focus(); }, 50);
    el('tp-result').style.display = 'none'; el('btn-submit').style.display = 'inline-flex';
  }

  function checkType() {
    if (state.typeDone) return; state.typeDone = true;
    var w = state.deck[state.idx]; var inp = el('tp-input');
    var ok = inp.value.trim().toLowerCase() === w.romaji.toLowerCase();
    inp.classList.add(ok ? 'correct' : 'wrong'); inp.disabled = true; el('btn-submit').style.display = 'none';
    var isOk = SRS.review(w.id, ok ? 3 : 1);
    var coins = Economy.earnFromStudy(ok ? 3 : 1);
    state.total++; if (isOk) state.correct++; state.coinsEarned += coins;
    PetManager.addXP(isOk ? 10 : 2);
    el('tp-answer').innerHTML = '<span class="answer-kanji">' + esc(w.kanji) + '</span><span class="answer-reading">' + esc(w.hiragana) + '</span><span class="answer-romaji">' + esc(w.romaji) + '</span>';
    el('tp-result').style.display = 'block'; speak(w.hiragana);
  }

  function advance() { state.idx++; showCard(); }

  function showComplete() {
    el('study-prog-fill').style.width = '100%';
    // Session bonus
    var bonus = 10;
    if (state.total > 0 && state.correct === state.total) { bonus = 25; Achievements.unlock('perfect_session'); }
    Economy.earn(bonus); state.coinsEarned += bonus;

    var acc = state.total > 0 ? Math.round((state.correct / state.total) * 100) : 0;
    el('cs-correct').textContent = state.correct; el('cs-total').textContent = state.total; el('cs-acc').textContent = acc + '%';
    el('cs-coins').textContent = '+' + state.coinsEarned + ' 🪙';
    el('modal-complete').classList.add('active');

    Diary.addEntry();
    var badges = Achievements.check();
    if (badges.length > 0) setTimeout(function() { toast(badges[0].emoji + ' Achievement: ' + badges[0].name + '!'); }, 1500);
  }

  /* ======== SHOP ======== */
  function bindShop() {
    on(document.querySelectorAll('.shop-tab'), 'click', function() {
      var tabs = document.querySelectorAll('.shop-tab');
      for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
      this.classList.add('active');
      state.shopTab = this.dataset.tab;
      renderShop();
    });
  }

  function renderShop() {
    el('shop-coins').textContent = Economy.getCoins();
    var items = SHOP_ITEMS[state.shopTab] || [];
    var grid = el('shop-grid'); grid.innerHTML = '';

    for (var i = 0; i < items.length; i++) {
      (function(item) {
        var cat = state.shopTab;
        var owned = (cat === 'furniture' || cat === 'outfits') && Inventory.owns(item.id, cat);
        var div = document.createElement('div');
        div.className = 'shop-item' + (owned ? ' owned' : '') + (item.rarity === 'rare' ? ' si-rarity-rare' : '');
        var btnHtml = owned
          ? '<div class="si-owned-badge">✓ Owned</div>'
          : '<button class="si-buy"' + (Economy.canAfford(item.price) ? '' : ' disabled') + '>Buy</button>';
        div.innerHTML =
          '<span class="si-emoji">' + item.emoji + '</span>' +
          '<span class="si-name">' + esc(item.name) + '</span>' +
          '<span class="si-name-ja">' + esc(item.nameJa) + '</span>' +
          '<span class="si-price">🪙 ' + item.price + '</span>' + btnHtml;
        var buyBtn = div.querySelector('.si-buy');
        if (buyBtn) buyBtn.addEventListener('click', function() {
          if (Inventory.buy(item, cat)) {
            toast('Bought ' + item.emoji + ' ' + item.name + '!');
            if (!Achievements.isUnlocked('first_purchase')) Achievements.unlock('first_purchase');
            renderShop();
          } else {
            toast('Not enough coins!');
          }
        });
        grid.appendChild(div);
      })(items[i]);
    }
  }

  /* ======== INVENTORY ======== */
  function bindInventory() {
    on(document.querySelectorAll('.inv-tab'), 'click', function() {
      var tabs = document.querySelectorAll('.inv-tab');
      for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
      this.classList.add('active');
      state.invTab = this.dataset.tab;
      renderInventory();
    });
  }

  function renderInventory() {
    var grid = el('inv-grid'); grid.innerHTML = '';
    var empty = el('inv-empty');
    var items = [];

    if (state.invTab === 'consumables') {
      items = Inventory.getOwnedConsumables();
    } else if (state.invTab === 'furniture') {
      items = Inventory.getOwned('furniture');
    } else {
      items = Inventory.getOwned('outfits');
    }

    if (items.length === 0) { empty.style.display = 'block'; return; }
    empty.style.display = 'none';

    for (var i = 0; i < items.length; i++) {
      (function(entry) {
        var it = entry.item;
        var div = document.createElement('div');
        div.className = 'inv-item';
        var btnHtml = '';
        if (state.invTab === 'consumables') {
          btnHtml = '<button class="inv-btn inv-btn-use">Use (' + entry.qty + ')</button>';
        } else if (state.invTab === 'outfits') {
          var equipped = PetManager.pet && PetManager.pet.equipped[it.slot] === it.id;
          btnHtml = equipped ? '<button class="inv-btn inv-btn-remove">Remove</button>' : '<button class="inv-btn inv-btn-equip">Wear</button>';
        } else {
          var placed = Room.isPlaced(it.id);
          btnHtml = placed ? '<button class="inv-btn inv-btn-remove">Remove</button>' : '<button class="inv-btn inv-btn-place">Place</button>';
        }
        div.innerHTML = '<span class="inv-item-emoji">' + it.emoji + '</span><span class="inv-item-name">' + esc(it.name) + '</span>' + btnHtml;

        var btn = div.querySelector('.inv-btn');
        btn.addEventListener('click', function() {
          if (state.invTab === 'consumables') {
            useConsumable(it);
          } else if (state.invTab === 'outfits') {
            var eq = PetManager.pet && PetManager.pet.equipped[it.slot] === it.id;
            if (eq) PetManager.unequip(it.slot);
            else { PetManager.equip(it.slot, it.id); if (!Achievements.isUnlocked('first_outfit')) Achievements.unlock('first_outfit'); }
            renderInventory();
          } else {
            if (Room.isPlaced(it.id)) Room.removeFurniture(it.id);
            else { Room.placeFurniture(it.id, it.slot); if (!Achievements.isUnlocked('first_furniture')) Achievements.unlock('first_furniture'); }
            renderInventory();
          }
        });
        grid.appendChild(div);
      })(items[i]);
    }
  }

  function useConsumable(item) {
    var cat = item.effect && item.effect.stat === 'thirst' ? 'drinks' : 'food';
    if (!Inventory.useItem(item.id, cat)) { toast('None left!'); return; }
    PetManager.feed(item.effect.stat, item.effect.amount);
    if (item.effect.bonus) PetManager.feed(item.effect.bonus.stat, item.effect.bonus.amount);
    if (!Achievements.isUnlocked('feed_pet')) Achievements.unlock('feed_pet');
    Achievements.check();
    toast(PetManager.pet.name + ' enjoyed the ' + item.emoji + '!');
    updateHome();
    renderInventory();
  }

  /* ======== FEED MODAL ======== */
  function showFeedModal() {
    var grid = el('feed-grid'); grid.innerHTML = '';
    var items = Inventory.getOwnedConsumables();
    if (items.length === 0) { toast('No food! Visit the shop.'); return; }

    for (var i = 0; i < items.length; i++) {
      (function(entry) {
        var div = document.createElement('button');
        div.className = 'feed-item';
        div.innerHTML = '<span class="feed-item-emoji">' + entry.item.emoji + '</span><span class="feed-item-name">' + esc(entry.item.name) + '</span><span class="feed-item-qty">x' + entry.qty + '</span>';
        div.addEventListener('click', function() {
          useConsumable(entry.item);
          el('modal-feed').classList.remove('active');
        });
        grid.appendChild(div);
      })(items[i]);
    }
    el('modal-feed').classList.add('active');
  }

  /* ======== DAILY BONUS ======== */
  function checkDaily() {
    if (Economy.hasDailyBonus()) {
      var streak = Economy.data.dailyStreak || 0;
      var bonus = 20 + Math.min((streak + 1) * 5, 50);
      el('daily-streak').textContent = 'Day ' + (streak + 1) + ' streak!';
      el('daily-coins').textContent = '+' + bonus + ' 🪙';
      el('modal-daily').classList.add('active');
    }
  }

  function claimDaily() {
    Economy.claimDaily();
    el('modal-daily').classList.remove('active');
    updateHome();
    toast('Daily bonus claimed! 🌸');
  }

  /* ======== PROFILE / MORE ======== */
  function renderMore() {
    if (!PetManager.pet) return;
    var p = PetManager.pet;
    var ts = SRS.todayStats();

    el('profile-card').innerHTML =
      '<div class="profile-pet-name">' + esc(p.name) + '</div>' +
      '<div class="profile-level">Level ' + p.level + ' ' + PetManager.getType().emoji + '</div>';

    el('profile-stats').innerHTML =
      '<div class="p-stat"><span class="p-stat-val">' + SRS.getMastered(ALL_WORDS).length + '</span><span class="p-stat-lbl">Mastered</span></div>' +
      '<div class="p-stat"><span class="p-stat-val">' + (SRS.stats.totalReviews || 0) + '</span><span class="p-stat-lbl">Reviews</span></div>' +
      '<div class="p-stat"><span class="p-stat-val">' + (Economy.data.totalEarned || 0) + '</span><span class="p-stat-lbl">Coins Earned</span></div>';

    // Achievements
    var ag = el('achievements-grid'); ag.innerHTML = '';
    for (var i = 0; i < Achievements.BADGES.length; i++) {
      var b = Achievements.BADGES[i];
      var unlocked = Achievements.isUnlocked(b.id);
      var div = document.createElement('div');
      div.className = 'ach-badge' + (unlocked ? '' : ' locked');
      div.innerHTML = '<span class="ach-emoji">' + (unlocked ? b.emoji : '🔒') + '</span><span class="ach-name">' + (unlocked ? b.name : '???') + '</span>';
      ag.appendChild(div);
    }

    // Diary
    var dl = el('diary-list'); dl.innerHTML = '';
    var entries = Diary.getEntries();
    if (entries.length === 0) dl.innerHTML = '<p style="text-align:center;color:var(--text-3);padding:20px">No entries yet. Study to create memories!</p>';
    for (var i = 0; i < Math.min(entries.length, 7); i++) {
      var e = entries[i];
      var d = document.createElement('div');
      d.className = 'diary-entry';
      d.innerHTML = '<div class="diary-date">' + e.date + '</div><div class="diary-msg">' + esc(e.msg) + '</div>';
      dl.appendChild(d);
    }
  }

  /* ======== TTS ======== */
  function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text); u.lang = 'ja-JP'; u.rate = 0.8;
    window.speechSynthesis.speak(u);
  }

  /* ======== SWIPE ======== */
  function initSwipe() {
    var wrap = el('card-wrapper'), card = el('card'), sx = 0, dx = 0;
    wrap.addEventListener('touchstart', function(e) { if (state.mode !== 'flip' || !state.flipped) return; sx = e.touches[0].clientX; card.style.transition = 'none'; }, { passive: true });
    wrap.addEventListener('touchmove', function(e) { if (state.mode !== 'flip' || !state.flipped) return; dx = e.touches[0].clientX - sx; card.style.transform = 'rotateY(180deg) translateX(' + dx + 'px) rotate(' + (dx * 0.05) + 'deg)'; }, { passive: true });
    wrap.addEventListener('touchend', function() { if (state.mode !== 'flip' || !state.flipped) return; card.style.transition = ''; if (Math.abs(dx) > 80) rateCard(dx > 0 ? 3 : 1); else card.style.transform = 'rotateY(180deg)'; dx = 0; }, { passive: true });
  }

  /* ======== HELPERS ======== */
  function el(id) { return document.getElementById(id); }
  function on(nodes, evt, fn) { for (var i = 0; i < nodes.length; i++) nodes[i].addEventListener(evt, fn); }
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  function toast(msg) { var t = el('toast'); t.textContent = msg; t.classList.add('show'); setTimeout(function() { t.classList.remove('show'); }, 2500); }

  /* ======== TUTORIAL ======== */
  function showTutorial() {
    var step = 0;
    var slides = document.querySelectorAll('.tut-slide');
    var dots = document.querySelectorAll('.tut-dot');
    var btn = el('btn-tut-next');
    el('modal-tutorial').classList.add('active');

    function goStep() {
      for (var i = 0; i < slides.length; i++) {
        slides[i].classList.toggle('active', i === step);
        dots[i].classList.toggle('active', i === step);
      }
      btn.textContent = step >= 2 ? "Let's Start! 🌸" : 'Next';
    }

    btn.onclick = function() {
      step++;
      if (step >= 3) {
        el('modal-tutorial').classList.remove('active');
        toast('Welcome! You got 50 coins to start! 🪙');
        return;
      }
      goStep();
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
