/* Kawaii SVG pet sprites — Sumikko Gurashi / Molang inspired */
var PET_SPRITES = {

cat: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
  '<ellipse cx="100" cy="125" rx="56" ry="50" fill="#FFB7C5"/>' +
  '<path d="M58 88 L70 52 L84 85" fill="#FFB7C5"/><path d="M116 85 L130 52 L142 88" fill="#FFB7C5"/>' +
  '<path d="M64 86 L70 60 L78 84" fill="#FF9EB0"/><path d="M122 84 L130 60 L136 86" fill="#FF9EB0"/>' +
  '<ellipse cx="55" cy="138" rx="13" ry="9" fill="#FFA8BC" transform="rotate(-10 55 138)"/>' +
  '<ellipse cx="145" cy="138" rx="13" ry="9" fill="#FFA8BC" transform="rotate(10 145 138)"/>' +
  '<ellipse cx="78" cy="170" rx="15" ry="8" fill="#FFA8BC"/><ellipse cx="122" cy="170" rx="15" ry="8" fill="#FFA8BC"/>' +
  '<path d="M152 135 Q172 122 168 98" fill="none" stroke="#FFB7C5" stroke-width="9" stroke-linecap="round"/>' +
  '<ellipse cx="70" cy="124" rx="11" ry="7" fill="#FF9EB0" opacity="0.3"/>' +
  '<ellipse cx="130" cy="124" rx="11" ry="7" fill="#FF9EB0" opacity="0.3"/>' +
  '<ellipse cx="100" cy="118" rx="3.5" ry="2.5" fill="#FF8DA1"/>' +
  '<line x1="58" y1="115" x2="80" y2="118" stroke="#FFD0DB" stroke-width="1.3" opacity="0.5"/>' +
  '<line x1="58" y1="122" x2="80" y2="121" stroke="#FFD0DB" stroke-width="1.3" opacity="0.5"/>' +
  '<line x1="142" y1="115" x2="120" y2="118" stroke="#FFD0DB" stroke-width="1.3" opacity="0.5"/>' +
  '<line x1="142" y1="122" x2="120" y2="121" stroke="#FFD0DB" stroke-width="1.3" opacity="0.5"/>' +
  '<g class="e-normal"><circle cx="82" cy="110" r="5" fill="#333"/><circle cx="118" cy="110" r="5" fill="#333"/><circle cx="84" cy="108" r="2" fill="#fff"/><circle cx="120" cy="108" r="2" fill="#fff"/></g>' +
  '<g class="e-happy"><path d="M74 108 Q82 100 90 108" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/><path d="M110 108 Q118 100 126 108" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/></g>' +
  '<g class="e-neutral"><ellipse cx="82" cy="110" rx="5" ry="3" fill="#333"/><ellipse cx="118" cy="110" rx="5" ry="3" fill="#333"/><circle cx="84" cy="109" r="1.5" fill="#fff"/><circle cx="120" cy="109" r="1.5" fill="#fff"/></g>' +
  '<g class="e-sad"><circle cx="82" cy="110" r="5" fill="#333"/><circle cx="118" cy="110" r="5" fill="#333"/><circle cx="84" cy="108" r="2" fill="#fff"/><circle cx="120" cy="108" r="2" fill="#fff"/><line x1="74" y1="100" x2="88" y2="103" stroke="#555" stroke-width="2" stroke-linecap="round"/><line x1="126" y1="100" x2="112" y2="103" stroke="#555" stroke-width="2" stroke-linecap="round"/></g>' +
  '<g class="e-sleep"><line x1="75" y1="110" x2="89" y2="110" stroke="#333" stroke-width="2.5" stroke-linecap="round"/><line x1="111" y1="110" x2="125" y2="110" stroke="#333" stroke-width="2.5" stroke-linecap="round"/></g>' +
  '<path class="m-smile" d="M92 124 Q100 132 108 124" fill="none" stroke="#FF8DA1" stroke-width="2" stroke-linecap="round"/>' +
  '<path class="m-wide" d="M88 122 Q100 136 112 122" fill="none" stroke="#FF8DA1" stroke-width="2" stroke-linecap="round"/>' +
  '<path class="m-sad" d="M92 128 Q100 122 108 128" fill="none" stroke="#FF8DA1" stroke-width="2" stroke-linecap="round"/>' +
  '<line class="m-flat" x1="93" y1="124" x2="107" y2="124" stroke="#FF8DA1" stroke-width="2" stroke-linecap="round"/>' +
  '<g class="fx-sparkle"><text x="38" y="72" font-size="16" opacity="0.9">✨</text><text x="148" y="62" font-size="14" opacity="0.7">✨</text><text x="158" y="88" font-size="11" opacity="0.6">⭐</text></g>' +
  '<g class="fx-tear"><ellipse cx="128" cy="118" rx="3" ry="5" fill="#93C5FD" opacity="0.6"><animate attributeName="cy" values="118;130;118" dur="2s" repeatCount="indefinite"/></ellipse></g>' +
  '<g class="fx-zzz"><text x="132" y="78" font-size="18" fill="#C4B5FD" opacity="0.8"><animate attributeName="y" values="78;68" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite"/>Z</text><text x="146" y="62" font-size="13" fill="#C4B5FD" opacity="0.6"><animate attributeName="y" values="62;52" dur="2s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.6;0" dur="2s" begin="0.5s" repeatCount="indefinite"/>z</text></g>' +
  '<g class="fx-thought"><circle cx="150" cy="78" r="18" fill="#fff" stroke="#F0E0E8" stroke-width="1.5"/><text x="150" y="84" font-size="18" text-anchor="middle">🍙</text><circle cx="138" cy="98" r="5" fill="#fff" stroke="#F0E0E8" stroke-width="1"/><circle cx="134" cy="108" r="3" fill="#fff" stroke="#F0E0E8" stroke-width="1"/></g>' +
  '</svg>',

dog: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
  '<ellipse cx="100" cy="125" rx="56" ry="50" fill="#FFDAB9"/>' +
  '<ellipse cx="58" cy="100" rx="16" ry="28" fill="#F0C8A0" rx="16" transform="rotate(15 58 100)"/>' +
  '<ellipse cx="142" cy="100" rx="16" ry="28" fill="#F0C8A0" transform="rotate(-15 142 100)"/>' +
  '<ellipse cx="55" cy="138" rx="14" ry="9" fill="#F5D0A8" transform="rotate(-8 55 138)"/>' +
  '<ellipse cx="145" cy="138" rx="14" ry="9" fill="#F5D0A8" transform="rotate(8 145 138)"/>' +
  '<ellipse cx="78" cy="170" rx="16" ry="8" fill="#F5D0A8"/><ellipse cx="122" cy="170" rx="16" ry="8" fill="#F5D0A8"/>' +
  '<path d="M150 140 Q162 130 158 118" fill="none" stroke="#FFDAB9" stroke-width="10" stroke-linecap="round"/>' +
  '<ellipse cx="70" cy="124" rx="11" ry="7" fill="#FFCBA4" opacity="0.35"/>' +
  '<ellipse cx="130" cy="124" rx="11" ry="7" fill="#FFCBA4" opacity="0.35"/>' +
  '<ellipse cx="100" cy="117" rx="5" ry="3.5" fill="#4A3548"/>' +
  '<g class="e-normal"><circle cx="82" cy="108" r="6" fill="#333"/><circle cx="118" cy="108" r="6" fill="#333"/><circle cx="85" cy="105" r="2.5" fill="#fff"/><circle cx="121" cy="105" r="2.5" fill="#fff"/></g>' +
  '<g class="e-happy"><path d="M73 107 Q82 98 91 107" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/><path d="M109 107 Q118 98 127 107" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/></g>' +
  '<g class="e-neutral"><ellipse cx="82" cy="109" rx="5.5" ry="3" fill="#333"/><ellipse cx="118" cy="109" rx="5.5" ry="3" fill="#333"/><circle cx="84" cy="108" r="1.5" fill="#fff"/><circle cx="120" cy="108" r="1.5" fill="#fff"/></g>' +
  '<g class="e-sad"><circle cx="82" cy="108" r="6" fill="#333"/><circle cx="118" cy="108" r="6" fill="#333"/><circle cx="85" cy="105" r="2.5" fill="#fff"/><circle cx="121" cy="105" r="2.5" fill="#fff"/><line x1="73" y1="99" x2="89" y2="101" stroke="#555" stroke-width="2" stroke-linecap="round"/><line x1="127" y1="99" x2="111" y2="101" stroke="#555" stroke-width="2" stroke-linecap="round"/></g>' +
  '<g class="e-sleep"><line x1="75" y1="109" x2="89" y2="109" stroke="#333" stroke-width="2.5" stroke-linecap="round"/><line x1="111" y1="109" x2="125" y2="109" stroke="#333" stroke-width="2.5" stroke-linecap="round"/></g>' +
  '<path class="m-smile" d="M92 122 Q100 130 108 122" fill="none" stroke="#D4868A" stroke-width="2" stroke-linecap="round"/>' +
  '<path class="m-wide" d="M88 120 Q100 136 112 120" fill="#FF9EB0" stroke="#D4868A" stroke-width="1.5" stroke-linecap="round"/>' +
  '<path class="m-sad" d="M92 128 Q100 122 108 128" fill="none" stroke="#D4868A" stroke-width="2" stroke-linecap="round"/>' +
  '<line class="m-flat" x1="93" y1="123" x2="107" y2="123" stroke="#D4868A" stroke-width="2" stroke-linecap="round"/>' +
  '<g class="fx-sparkle"><text x="38" y="72" font-size="16" opacity="0.9">✨</text><text x="148" y="62" font-size="14" opacity="0.7">✨</text><text x="158" y="88" font-size="11" opacity="0.6">⭐</text></g>' +
  '<g class="fx-tear"><ellipse cx="128" cy="116" rx="3" ry="5" fill="#93C5FD" opacity="0.6"><animate attributeName="cy" values="116;128;116" dur="2s" repeatCount="indefinite"/></ellipse></g>' +
  '<g class="fx-zzz"><text x="132" y="78" font-size="18" fill="#C4B5FD" opacity="0.8"><animate attributeName="y" values="78;68" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite"/>Z</text><text x="146" y="62" font-size="13" fill="#C4B5FD" opacity="0.6"><animate attributeName="y" values="62;52" dur="2s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.6;0" dur="2s" begin="0.5s" repeatCount="indefinite"/>z</text></g>' +
  '<g class="fx-thought"><circle cx="150" cy="78" r="18" fill="#fff" stroke="#F0E0E8" stroke-width="1.5"/><text x="150" y="84" font-size="18" text-anchor="middle">🍙</text><circle cx="138" cy="98" r="5" fill="#fff" stroke="#F0E0E8" stroke-width="1"/><circle cx="134" cy="108" r="3" fill="#fff" stroke="#F0E0E8" stroke-width="1"/></g>' +
  '</svg>',

bunny: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
  '<ellipse cx="100" cy="130" rx="52" ry="46" fill="#E8D5F5"/>' +
  '<rect x="72" y="30" rx="14" ry="14" width="22" height="70" fill="#E8D5F5"/>' +
  '<rect x="106" y="30" rx="14" ry="14" width="22" height="70" fill="#E8D5F5"/>' +
  '<rect x="77" y="38" rx="8" ry="8" width="12" height="50" fill="#D4B8EA" opacity="0.5"/>' +
  '<rect x="111" y="38" rx="8" ry="8" width="12" height="50" fill="#D4B8EA" opacity="0.5"/>' +
  '<ellipse cx="52" cy="142" rx="12" ry="8" fill="#DCC8EE" transform="rotate(-10 52 142)"/>' +
  '<ellipse cx="148" cy="142" rx="12" ry="8" fill="#DCC8EE" transform="rotate(10 148 142)"/>' +
  '<ellipse cx="78" cy="172" rx="16" ry="9" fill="#DCC8EE"/><ellipse cx="122" cy="172" rx="16" ry="9" fill="#DCC8EE"/>' +
  '<circle cx="100" cy="172" r="10" fill="#fff"/>' +
  '<ellipse cx="70" cy="128" rx="11" ry="7" fill="#D4B8EA" opacity="0.3"/>' +
  '<ellipse cx="130" cy="128" rx="11" ry="7" fill="#D4B8EA" opacity="0.3"/>' +
  '<circle cx="100" cy="120" r="3" fill="#D4A0D4"/>' +
  '<g class="e-normal"><circle cx="82" cy="114" r="6" fill="#333"/><circle cx="118" cy="114" r="6" fill="#333"/><circle cx="85" cy="111" r="2.5" fill="#fff"/><circle cx="121" cy="111" r="2.5" fill="#fff"/></g>' +
  '<g class="e-happy"><path d="M73 112 Q82 103 91 112" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/><path d="M109 112 Q118 103 127 112" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/></g>' +
  '<g class="e-neutral"><ellipse cx="82" cy="114" rx="5.5" ry="3" fill="#333"/><ellipse cx="118" cy="114" rx="5.5" ry="3" fill="#333"/><circle cx="84" cy="113" r="1.5" fill="#fff"/><circle cx="120" cy="113" r="1.5" fill="#fff"/></g>' +
  '<g class="e-sad"><circle cx="82" cy="114" r="6" fill="#333"/><circle cx="118" cy="114" r="6" fill="#333"/><circle cx="85" cy="111" r="2.5" fill="#fff"/><circle cx="121" cy="111" r="2.5" fill="#fff"/><line x1="73" y1="104" x2="89" y2="107" stroke="#555" stroke-width="2" stroke-linecap="round"/><line x1="127" y1="104" x2="111" y2="107" stroke="#555" stroke-width="2" stroke-linecap="round"/></g>' +
  '<g class="e-sleep"><line x1="75" y1="114" x2="89" y2="114" stroke="#333" stroke-width="2.5" stroke-linecap="round"/><line x1="111" y1="114" x2="125" y2="114" stroke="#333" stroke-width="2.5" stroke-linecap="round"/></g>' +
  '<path class="m-smile" d="M92 126 Q100 134 108 126" fill="none" stroke="#D4A0D4" stroke-width="2" stroke-linecap="round"/>' +
  '<path class="m-wide" d="M88 124 Q100 138 112 124" fill="none" stroke="#D4A0D4" stroke-width="2" stroke-linecap="round"/>' +
  '<path class="m-sad" d="M92 132 Q100 126 108 132" fill="none" stroke="#D4A0D4" stroke-width="2" stroke-linecap="round"/>' +
  '<line class="m-flat" x1="93" y1="127" x2="107" y2="127" stroke="#D4A0D4" stroke-width="2" stroke-linecap="round"/>' +
  '<g class="fx-sparkle"><text x="38" y="60" font-size="16" opacity="0.9">✨</text><text x="148" y="50" font-size="14" opacity="0.7">✨</text><text x="155" y="78" font-size="11" opacity="0.6">⭐</text></g>' +
  '<g class="fx-tear"><ellipse cx="128" cy="122" rx="3" ry="5" fill="#93C5FD" opacity="0.6"><animate attributeName="cy" values="122;134;122" dur="2s" repeatCount="indefinite"/></ellipse></g>' +
  '<g class="fx-zzz"><text x="132" y="68" font-size="18" fill="#C4B5FD" opacity="0.8"><animate attributeName="y" values="68;58" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite"/>Z</text><text x="146" y="52" font-size="13" fill="#C4B5FD" opacity="0.6"><animate attributeName="y" values="52;42" dur="2s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.6;0" dur="2s" begin="0.5s" repeatCount="indefinite"/>z</text></g>' +
  '<g class="fx-thought"><circle cx="150" cy="70" r="18" fill="#fff" stroke="#E8D5F5" stroke-width="1.5"/><text x="150" y="76" font-size="18" text-anchor="middle">🍙</text><circle cx="138" cy="90" r="5" fill="#fff" stroke="#E8D5F5" stroke-width="1"/><circle cx="134" cy="100" r="3" fill="#fff" stroke="#E8D5F5" stroke-width="1"/></g>' +
  '</svg>',

hamster: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
  '<ellipse cx="100" cy="120" rx="60" ry="55" fill="#FFE4B5"/>' +
  '<circle cx="68" cy="78" r="12" fill="#FFE4B5"/><circle cx="132" cy="78" r="12" fill="#FFE4B5"/>' +
  '<circle cx="68" cy="78" r="7" fill="#FFDAA0" opacity="0.5"/><circle cx="132" cy="78" r="7" fill="#FFDAA0" opacity="0.5"/>' +
  '<ellipse cx="100" cy="125" rx="35" ry="30" fill="#FFF5E0" opacity="0.6"/>' +
  '<ellipse cx="55" cy="135" rx="11" ry="8" fill="#FFDAA0" transform="rotate(-10 55 135)"/>' +
  '<ellipse cx="145" cy="135" rx="11" ry="8" fill="#FFDAA0" transform="rotate(10 145 135)"/>' +
  '<ellipse cx="80" cy="170" rx="13" ry="7" fill="#FFDAA0"/><ellipse cx="120" cy="170" rx="13" ry="7" fill="#FFDAA0"/>' +
  '<ellipse cx="64" cy="120" rx="14" ry="10" fill="#FFCBA4" opacity="0.4"/>' +
  '<ellipse cx="136" cy="120" rx="14" ry="10" fill="#FFCBA4" opacity="0.4"/>' +
  '<circle cx="100" cy="113" r="3" fill="#FFB088"/>' +
  '<g class="e-normal"><circle cx="85" cy="106" r="4.5" fill="#333"/><circle cx="115" cy="106" r="4.5" fill="#333"/><circle cx="87" cy="104" r="1.8" fill="#fff"/><circle cx="117" cy="104" r="1.8" fill="#fff"/></g>' +
  '<g class="e-happy"><path d="M78 105 Q85 98 92 105" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/><path d="M108 105 Q115 98 122 105" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/></g>' +
  '<g class="e-neutral"><ellipse cx="85" cy="106" rx="4.5" ry="2.5" fill="#333"/><ellipse cx="115" cy="106" rx="4.5" ry="2.5" fill="#333"/><circle cx="86" cy="105" r="1.3" fill="#fff"/><circle cx="116" cy="105" r="1.3" fill="#fff"/></g>' +
  '<g class="e-sad"><circle cx="85" cy="106" r="4.5" fill="#333"/><circle cx="115" cy="106" r="4.5" fill="#333"/><circle cx="87" cy="104" r="1.8" fill="#fff"/><circle cx="117" cy="104" r="1.8" fill="#fff"/><line x1="77" y1="97" x2="91" y2="99" stroke="#555" stroke-width="2" stroke-linecap="round"/><line x1="123" y1="97" x2="109" y2="99" stroke="#555" stroke-width="2" stroke-linecap="round"/></g>' +
  '<g class="e-sleep"><line x1="78" y1="106" x2="92" y2="106" stroke="#333" stroke-width="2.5" stroke-linecap="round"/><line x1="108" y1="106" x2="122" y2="106" stroke="#333" stroke-width="2.5" stroke-linecap="round"/></g>' +
  '<path class="m-smile" d="M93 118 Q100 125 107 118" fill="none" stroke="#FFB088" stroke-width="2" stroke-linecap="round"/>' +
  '<path class="m-wide" d="M90 117 Q100 130 110 117" fill="none" stroke="#FFB088" stroke-width="2" stroke-linecap="round"/>' +
  '<path class="m-sad" d="M93 124 Q100 118 107 124" fill="none" stroke="#FFB088" stroke-width="2" stroke-linecap="round"/>' +
  '<line class="m-flat" x1="94" y1="119" x2="106" y2="119" stroke="#FFB088" stroke-width="2" stroke-linecap="round"/>' +
  '<g class="fx-sparkle"><text x="35" y="68" font-size="16" opacity="0.9">✨</text><text x="150" y="58" font-size="14" opacity="0.7">✨</text><text x="158" y="82" font-size="11" opacity="0.6">⭐</text></g>' +
  '<g class="fx-tear"><ellipse cx="125" cy="114" rx="3" ry="5" fill="#93C5FD" opacity="0.6"><animate attributeName="cy" values="114;126;114" dur="2s" repeatCount="indefinite"/></ellipse></g>' +
  '<g class="fx-zzz"><text x="132" y="72" font-size="18" fill="#C4B5FD" opacity="0.8"><animate attributeName="y" values="72;62" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite"/>Z</text><text x="146" y="56" font-size="13" fill="#C4B5FD" opacity="0.6"><animate attributeName="y" values="56;46" dur="2s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.6;0" dur="2s" begin="0.5s" repeatCount="indefinite"/>z</text></g>' +
  '<g class="fx-thought"><circle cx="152" cy="72" r="18" fill="#fff" stroke="#F0E8D8" stroke-width="1.5"/><text x="152" y="78" font-size="18" text-anchor="middle">🍙</text><circle cx="140" cy="92" r="5" fill="#fff" stroke="#F0E8D8" stroke-width="1"/><circle cx="136" cy="102" r="3" fill="#fff" stroke="#F0E8D8" stroke-width="1"/></g>' +
  '</svg>',

penguin: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
  '<ellipse cx="100" cy="120" rx="52" ry="58" fill="#B8D4E3"/>' +
  '<ellipse cx="100" cy="130" rx="34" ry="38" fill="#fff"/>' +
  '<ellipse cx="55" cy="125" rx="15" ry="10" fill="#A0C4D8" transform="rotate(-20 55 125)"/>' +
  '<ellipse cx="145" cy="125" rx="15" ry="10" fill="#A0C4D8" transform="rotate(20 145 125)"/>' +
  '<ellipse cx="82" cy="172" rx="14" ry="7" fill="#FFB74D"/><ellipse cx="118" cy="172" rx="14" ry="7" fill="#FFB74D"/>' +
  '<ellipse cx="70" cy="118" rx="11" ry="7" fill="#FFCDD2" opacity="0.35"/>' +
  '<ellipse cx="130" cy="118" rx="11" ry="7" fill="#FFCDD2" opacity="0.35"/>' +
  '<path d="M94 112 L100 118 L106 112" fill="#FFB74D" stroke="#FF9800" stroke-width="1" stroke-linejoin="round"/>' +
  '<g class="e-normal"><circle cx="82" cy="104" r="5" fill="#333"/><circle cx="118" cy="104" r="5" fill="#333"/><circle cx="84" cy="102" r="2" fill="#fff"/><circle cx="120" cy="102" r="2" fill="#fff"/></g>' +
  '<g class="e-happy"><path d="M74 103 Q82 95 90 103" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/><path d="M110 103 Q118 95 126 103" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/></g>' +
  '<g class="e-neutral"><ellipse cx="82" cy="105" rx="5" ry="3" fill="#333"/><ellipse cx="118" cy="105" rx="5" ry="3" fill="#333"/><circle cx="84" cy="104" r="1.5" fill="#fff"/><circle cx="120" cy="104" r="1.5" fill="#fff"/></g>' +
  '<g class="e-sad"><circle cx="82" cy="104" r="5" fill="#333"/><circle cx="118" cy="104" r="5" fill="#333"/><circle cx="84" cy="102" r="2" fill="#fff"/><circle cx="120" cy="102" r="2" fill="#fff"/><line x1="74" y1="95" x2="88" y2="97" stroke="#555" stroke-width="2" stroke-linecap="round"/><line x1="126" y1="95" x2="112" y2="97" stroke="#555" stroke-width="2" stroke-linecap="round"/></g>' +
  '<g class="e-sleep"><line x1="75" y1="105" x2="89" y2="105" stroke="#333" stroke-width="2.5" stroke-linecap="round"/><line x1="111" y1="105" x2="125" y2="105" stroke="#333" stroke-width="2.5" stroke-linecap="round"/></g>' +
  '<path class="m-smile" d="M93 120 Q100 127 107 120" fill="none" stroke="#E08080" stroke-width="2" stroke-linecap="round"/>' +
  '<path class="m-wide" d="M90 118 Q100 132 110 118" fill="none" stroke="#E08080" stroke-width="2" stroke-linecap="round"/>' +
  '<path class="m-sad" d="M93 124 Q100 118 107 124" fill="none" stroke="#E08080" stroke-width="2" stroke-linecap="round"/>' +
  '<line class="m-flat" x1="94" y1="120" x2="106" y2="120" stroke="#E08080" stroke-width="2" stroke-linecap="round"/>' +
  '<g class="fx-sparkle"><text x="38" y="58" font-size="16" opacity="0.9">✨</text><text x="148" y="52" font-size="14" opacity="0.7">✨</text><text x="155" y="78" font-size="11" opacity="0.6">⭐</text></g>' +
  '<g class="fx-tear"><ellipse cx="128" cy="112" rx="3" ry="5" fill="#93C5FD" opacity="0.6"><animate attributeName="cy" values="112;124;112" dur="2s" repeatCount="indefinite"/></ellipse></g>' +
  '<g class="fx-zzz"><text x="132" y="72" font-size="18" fill="#C4B5FD" opacity="0.8"><animate attributeName="y" values="72;62" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite"/>Z</text><text x="146" y="56" font-size="13" fill="#C4B5FD" opacity="0.6"><animate attributeName="y" values="56;46" dur="2s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.6;0" dur="2s" begin="0.5s" repeatCount="indefinite"/>z</text></g>' +
  '<g class="fx-thought"><circle cx="150" cy="68" r="18" fill="#fff" stroke="#D8E8F0" stroke-width="1.5"/><text x="150" y="74" font-size="18" text-anchor="middle">🍙</text><circle cx="138" cy="88" r="5" fill="#fff" stroke="#D8E8F0" stroke-width="1"/><circle cx="134" cy="98" r="3" fill="#fff" stroke="#D8E8F0" stroke-width="1"/></g>' +
  '</svg>'

};
