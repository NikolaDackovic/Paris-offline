// Ručno crtane, lokalne SVG ilustracije (bez spoljnih slika).

export function SkylineArt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 360 120" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMax meet">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Sena */}
        <path d="M0 112 C60 106 120 116 180 110 S300 104 360 112" opacity=".5" />
        <path d="M20 118 C80 113 140 120 200 116 S310 112 350 118" opacity=".3" />
        {/* krovovi levo */}
        <path d="M0 104 V84 h18 l6 -8 h20 l6 8 h14 v20" />
        <path d="M8 84 v-6 M30 76 v-6 M52 84 v-5" opacity=".7" />
        <path d="M70 104 V90 h26 V80 l10 -6 l10 6 v24" />
        {/* Sacré-Cœur (u daljini) */}
        <path d="M120 104 V92 h8 v-6 a8 8 0 0 1 16 0 v6 h8 v12" opacity=".6" />
        <path d="M136 80 v-6 M133 77 h6" opacity=".6" />
        {/* Ajfelova kula */}
        <path d="M232 104 L246 62 L250 30 L252 12 L254 30 L258 62 L272 104" />
        <path d="M241 78 h22 M246 62 h12 M249 40 h6" />
        <path d="M238 104 q14 -18 28 0" />
        <path d="M252 12 v-6" />
        {/* krovovi desno */}
        <path d="M282 104 V86 h22 l4 -6 h14 l4 6 h34 v18" />
        <path d="M296 86 v-6 M318 80 v-6 M340 86 v-5" opacity=".7" />
        <path d="M168 104 V88 h40 v16" />
        <path d="M174 88 v-6 h6 v6 M196 88 v-5" opacity=".7" />
        {/* prozori */}
        <path d="M14 92 h4 M30 92 h4 M46 92 h4 M80 96 h4 M98 96 h4 M176 96 h4 M192 96 h4 M290 94 h4 M306 94 h4 M330 94 h4" opacity=".55" />
      </g>
      {/* sunce u sumrak */}
      <circle cx="300" cy="40" r="14" fill="currentColor" opacity=".08" />
    </svg>
  );
}

export function Flourish() {
  return (
    <svg viewBox="0 0 120 10" width="120" height="10" aria-hidden="true" className="flourish">
      <path d="M2 5 H48 M72 5 H118" stroke="currentColor" strokeWidth="1" />
      <path d="M60 1 L64 5 L60 9 L56 5 Z" fill="currentColor" />
    </svg>
  );
}
