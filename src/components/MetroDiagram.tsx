import { LINE_COLORS } from '../data/transport';

// Statička, pojednostavljena šema SAMO za naše rute. Nije zvanična mapa RATP-a.
type Pt = [number, number];

const S: Record<string, Pt> = {
  jourdain: [326, 96],
  pyrenees: [306, 116],
  belleville: [286, 136],
  goncourt: [270, 152],
  republique: [252, 170],
  artsmetiers: [240, 192],
  rambuteau: [228, 212],
  hoteldeville: [216, 232],
  chatelet: [196, 252],
  louvrerivoli: [172, 252],
  palaisroyal: [146, 252],
  concorde: [96, 252],
  colonelfabien: [270, 112],
  jaures: [252, 88],
  stalingrad: [232, 72],
  barbes: [192, 58],
  anvers: [160, 58],
  pigalle: [130, 58],
  blanche: [100, 58],
  trocadero: [36, 236],
  ecolemilitaire: [96, 336]
};

const P = (k: string) => S[k].join(' ');

export default function MetroDiagram() {
  const c = (l: string) => LINE_COLORS[l].bg;
  return (
    <figure className="metro-diagram">
      <svg viewBox="0 0 360 372" role="img" aria-label="Šema metro linija 11, 2, 1, 9 i 8 za naše glavne rute">
        {/* Sena */}
        <path
          d="M360 300 C320 296 280 286 240 276 C215 270 190 276 165 278 C135 280 110 276 90 282 C70 288 58 300 44 318 C34 332 20 346 0 356"
          fill="none"
          stroke="#BFD6E2"
          strokeWidth="12"
          strokeLinecap="round"
          opacity=".8"
        />
        <text x="300" y="304" className="md-water">Sena</text>
        {/* Île de la Cité / Notre-Dame */}
        <ellipse cx="204" cy="276" rx="16" ry="5" fill="#E9DFCF" />

        {/* Linija 9: République → Trocadéro */}
        <path d={`M${P('republique')} L 60 170 Q 36 170 36 194 L ${P('trocadero')}`} fill="none" stroke={c('9')} strokeWidth="6" strokeLinejoin="round" />
        {/* Linija 8: République → Concorde → École Militaire */}
        <path d={`M${P('republique')} L 244 180 L 112 180 Q 96 180 96 196 L ${P('concorde')} L ${P('ecolemilitaire')}`} fill="none" stroke={c('8')} strokeWidth="6" strokeLinejoin="round" />
        {/* Linija 1: Châtelet → Concorde */}
        <path d={`M${P('chatelet')} L ${P('concorde')}`} fill="none" stroke={c('1')} strokeWidth="6" />
        {/* Linija 2: Belleville → Blanche */}
        <path
          d={`M${P('belleville')} L ${P('colonelfabien')} L ${P('jaures')} L ${P('stalingrad')} L 212 58 L ${P('blanche')}`}
          fill="none"
          stroke={c('2')}
          strokeWidth="6"
          strokeLinejoin="round"
        />
        {/* Linija 11: Jourdain → Châtelet */}
        <path d={`M${P('jourdain')} L ${P('chatelet')}`} fill="none" stroke={c('11')} strokeWidth="7" strokeLinecap="round" />

        {/* Male stanice */}
        {['pyrenees', 'goncourt', 'artsmetiers', 'rambuteau', 'colonelfabien', 'stalingrad', 'barbes', 'louvrerivoli'].map((k) => (
          <circle key={k} cx={S[k][0]} cy={S[k][1]} r="3" fill="#fff" stroke="#1F2433" strokeWidth="1.2" />
        ))}

        {/* Važne / presedanje */}
        {['belleville', 'republique', 'chatelet', 'concorde'].map((k) => (
          <circle key={k} cx={S[k][0]} cy={S[k][1]} r="6.5" fill="#fff" stroke="#1F2433" strokeWidth="2.2" />
        ))}
        {['hoteldeville', 'palaisroyal', 'jaures', 'anvers', 'pigalle', 'blanche', 'trocadero', 'ecolemilitaire'].map((k) => (
          <circle key={k} cx={S[k][0]} cy={S[k][1]} r="5" fill="#fff" stroke="#1F2433" strokeWidth="1.8" />
        ))}

        {/* Dom */}
        <circle cx={S.jourdain[0]} cy={S.jourdain[1]} r="11" fill="#2F5D8C" />
        <path d="M321 97 l5 -5 l5 5 v5 h-10 z" fill="#fff" />

        {/* Oznake */}
        <g className="md-label">
          <text x="318" y="78" textAnchor="middle" className="md-home">Jourdain</text>
          <text x="318" y="68" textAnchor="middle" className="md-small">KUĆA</text>
          <text x="314" y="120">Pyrénées</text>
          <text x="296" y="142">Belleville</text>
          <text x="262" y="174">République</text>
          <text x="226" y="236">Hôtel de Ville</text>
          <text x="204" y="248" textAnchor="start">Châtelet</text>
          <text x="146" y="270" textAnchor="middle">Palais Royal</text>
          <text x="146" y="280" textAnchor="middle" className="md-small">Luvr</text>
          <text x="104" y="246" textAnchor="start">Concorde</text>
          <text x="260" y="84" textAnchor="start">Jaurès</text>
          <text x="260" y="94" textAnchor="start" className="md-small">kanal</text>
          <text x="160" y="46" textAnchor="middle">Anvers</text>
          <text x="160" y="36" textAnchor="middle" className="md-small">Sacré-Cœur ↑</text>
          <text x="130" y="76" textAnchor="middle">Pigalle</text>
          <text x="100" y="46" textAnchor="middle">Blanche</text>
          <text x="100" y="36" textAnchor="middle" className="md-small">Moulin Rouge</text>
          <text x="44" y="226" textAnchor="start">Trocadéro</text>
          <text x="106" y="340" textAnchor="start">École Militaire</text>
          <text x="106" y="350" textAnchor="start" className="md-small">Rue Cler</text>
          <text x="204" y="292" textAnchor="middle" className="md-small">Notre-Dame</text>
        </g>

        {/* Ajfelova kula */}
        <g transform="translate(58 300)" stroke="#1F2433" strokeWidth="1.3" fill="none">
          <path d="M0 22 L5 8 L6 0 L7 8 L12 22 M3 14 h7" />
        </g>

        {/* Brojevi linija */}
        {[
          ['11', 206, 206],
          ['2', 214, 48],
          ['1', 120, 262],
          ['9', 60, 160],
          ['8', 82, 300]
        ].map(([l, x, y]) => (
          <g key={l as string} transform={`translate(${x} ${y})`}>
            <circle r="9" fill={c(l as string)} />
            <text textAnchor="middle" y="3.5" className="md-line" fill={LINE_COLORS[l as string].fg}>
              {l}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="small muted">
        Pojednostavljena šema samo za naše rute — nije zvanična mapa metroa i ne prikazuje sve stanice. U stanicama uvek pratite zvanične table.
      </figcaption>
    </figure>
  );
}
