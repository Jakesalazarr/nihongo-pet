/* Firebase cloud sync — Google auth + Firestore localStorage mirror */
var FirebaseSync = {
  config: {
    apiKey: "AIzaSyA0YHX62RyzNGVVqIJTFtoc95pLrECSdVE",
    authDomain: "nihonggo-pet.firebaseapp.com",
    projectId: "nihonggo-pet",
    storageBucket: "nihonggo-pet.firebasestorage.app",
    messagingSenderId: "868387860028",
    appId: "1:868387860028:web:a54799b9d82d9ecc825d39",
    measurementId: "G-R9GTRFFV9P"
  },
  SYNC_KEYS: ['np_pet', 'np_econ', 'np_srs', 'np_stats', 'np_inv', 'np_room', 'np_ach', 'np_diary'],
  user: null,
  saveTimer: null,
  isLoading: false,
  db: null,
  auth: null,
  initialized: false,

  init: function() {
    if (typeof firebase === 'undefined') {
      console.warn('Firebase SDK not loaded — cloud sync disabled');
      return false;
    }
    try {
      firebase.initializeApp(this.config);
      this.auth = firebase.auth();
      this.db = firebase.firestore();
      this.initialized = true;

      var self = this;
      this.auth.onAuthStateChanged(function(user) {
        self.user = user;
        self.updateUI();
        if (user) {
          self.loadFromCloud();
        }
      });
      return true;
    } catch (e) {
      console.error('Firebase init failed:', e);
      return false;
    }
  },

  signIn: function() {
    if (!this.initialized) return;
    var provider = new firebase.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider).catch(function(err) {
      alert('Sign in failed: ' + err.message);
    });
  },

  signOut: function() {
    if (!this.initialized) return;
    this.auth.signOut();
  },

  /* Save with debounce - called after every data change */
  saveToCloud: function() {
    if (!this.user || this.isLoading || !this.initialized) return;
    var self = this;
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(function() {
      self._doSave();
    }, 2000);
  },

  _doSave: function() {
    if (!this.user || !this.initialized) return;
    var data = { updated: Date.now() };
    for (var i = 0; i < this.SYNC_KEYS.length; i++) {
      var k = this.SYNC_KEYS[i];
      var v = localStorage.getItem(k);
      if (v !== null) data[k] = v;
    }
    var self = this;
    this.db.collection('users').doc(this.user.uid).set(data)
      .then(function() {
        self._showStatus('✓ Saved');
      })
      .catch(function(err) {
        console.error('Cloud save failed:', err);
        self._showStatus('⚠ Save failed');
      });
  },

  loadFromCloud: function() {
    if (!this.user || !this.initialized) return;
    var self = this;
    this.isLoading = true;
    this.db.collection('users').doc(this.user.uid).get()
      .then(function(doc) {
        if (doc.exists) {
          var data = doc.data();
          var hasLocal = !!localStorage.getItem('np_pet');
          var cloudTime = data.updated || 0;
          var localTime = parseInt(localStorage.getItem('np_last_local_save') || '0');

          if (!hasLocal || cloudTime > localTime + 30000) {
            // Cloud is newer (or local is empty) — load from cloud
            for (var i = 0; i < self.SYNC_KEYS.length; i++) {
              var k = self.SYNC_KEYS[i];
              if (data[k] !== undefined) localStorage.setItem(k, data[k]);
            }
            self.isLoading = false;
            self._showStatus('✓ Loaded from cloud');
            setTimeout(function() { location.reload(); }, 800);
          } else {
            // Local is newer — push to cloud
            self.isLoading = false;
            self._doSave();
          }
        } else {
          // No cloud save yet — push what we have
          self.isLoading = false;
          self._doSave();
        }
      })
      .catch(function(err) {
        console.error('Cloud load failed:', err);
        self.isLoading = false;
      });
  },

  _showStatus: function(msg) {
    var el = document.getElementById('cloud-status');
    if (!el) return;
    el.textContent = msg;
    el.style.opacity = '1';
    clearTimeout(this._statusTimer);
    this._statusTimer = setTimeout(function() {
      el.style.opacity = '0';
    }, 2500);
  },

  updateUI: function() {
    var btn = document.getElementById('btn-cloud');
    var status = document.getElementById('cloud-status');
    if (!btn) return;
    if (this.user) {
      var name = this.user.displayName || this.user.email.split('@')[0];
      btn.innerHTML = '<div class="cloud-ok">☁️ Signed in as <b>' + name + '</b></div><div class="cloud-sub">Progress syncs automatically · Tap to sign out</div>';
      btn.className = 'btn-cloud signed-in';
    } else {
      btn.innerHTML = '<div>☁️ Sign in with Google</div><div class="cloud-sub">Save progress to the cloud & sync across devices</div>';
      btn.className = 'btn-cloud';
    }
  }
};

/* Wrap manager save methods to auto-trigger cloud sync */
function wrapSavesForCloudSync() {
  var managers = [];
  if (typeof PetManager !== 'undefined') managers.push(PetManager);
  if (typeof Economy !== 'undefined') managers.push(Economy);
  if (typeof Inventory !== 'undefined') managers.push(Inventory);
  if (typeof Room !== 'undefined') managers.push(Room);
  if (typeof Achievements !== 'undefined') managers.push(Achievements);
  if (typeof Diary !== 'undefined') managers.push(Diary);
  if (typeof SRS !== 'undefined') managers.push(SRS);

  managers.forEach(function(mgr) {
    if (!mgr.save || mgr._wrapped) return;
    var origSave = mgr.save.bind(mgr);
    mgr.save = function() {
      origSave();
      try { localStorage.setItem('np_last_local_save', Date.now().toString()); } catch (e) {}
      if (typeof FirebaseSync !== 'undefined' && FirebaseSync.user) {
        FirebaseSync.saveToCloud();
      }
    };
    mgr._wrapped = true;
  });
}
