// Ilustrativna šema: pozicije su izračunate iz približnih geografskih koordinata,
// ali ovo NIJE navigaciona mapa i ne prikazuje vašu lokaciju.

const BOUNDS = { west: 2.272, east: 2.408, north: 48.897, south: 48.838 };
const W = 360;
const KM_X = 73.3; // km po stepenu dužine na ovoj širini
const KM_Y = 111.2;
const H = Math.round((W * ((BOUNDS.north - BOUNDS.south) * KM_Y)) / ((BOUNDS.east - BOUNDS.west) * KM_X));

const px = (lat: number, lon: number): [number, number] => [
  ((lon - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * W,
  ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * H
];

const pts = (arr: [number, number][]) =>
  arr
    .map(([lat, lon], i) => {
      const [x, y] = px(lat, lon);
      return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');

const SEINE: [number, number][] = [
  [48.8405, 2.4080],
  [48.8445, 2.3700],
  [48.8505, 2.3600],
  [48.8535, 2.3500],
  [48.8575, 2.3410],
  [48.8600, 2.3300],
  [48.8640, 2.3200],
  [48.8645, 2.3050],
  [48.8620, 2.2950],
  [48.8560, 2.2850],
  [48.8470, 2.2760],
  [48.8400, 2.2720]
];

const CANAL: [number, number][] = [
  [48.8530, 2.3690],
  [48.8620, 2.3660],
  [48.8710, 2.3650],
  [48.8800, 2.3680],
  [48.8840, 2.3690],
  [48.8895, 2.3795],
  [48.8925, 2.3880]
];

interface Spot {
  name: string;
  lat: number;
  lon: number;
  kind: 'home' | 'sight' | 'area' | 'park';
  anchor?: 'start' | 'middle' | 'end';
  dy?: number;
  day?: string;
}

const SPOTS: Spot[] = [
  { name: 'Jourdain', lat: 48.8752, lon: 2.3895, kind: 'home', anchor: 'start', dy: -2 },
  { name: 'Belleville', lat: 48.8722, lon: 2.3767, kind: 'area', anchor: 'end', dy: 4, day: '1' },
  { name: 'Buttes-Chaumont', lat: 48.8809, lon: 2.3828, kind: 'park', anchor: 'end', dy: 14, day: '1' },
  { name: 'Kanal (Villette)', lat: 48.8865, lon: 2.3730, kind: 'area', anchor: 'start', dy: -8 },
  { name: 'Sacré-Cœur', lat: 48.8867, lon: 2.3431, kind: 'sight', anchor: 'end', dy: -10, day: '2' },
  { name: 'Moulin Rouge', lat: 48.8841, lon: 2.3322, kind: 'sight', anchor: 'end', dy: 12, day: '2' },
  { name: 'Louvre', lat: 48.8606, lon: 2.3376, kind: 'sight', anchor: 'middle', dy: 14, day: '3' },
  { name: 'Concorde', lat: 48.8656, lon: 2.3212, kind: 'sight', anchor: 'start', dy: -8, day: '3' },
  { name: 'Notre-Dame', lat: 48.853, lon: 2.3499, kind: 'sight', anchor: 'start', dy: 12, day: '3' },
  { name: 'Marais', lat: 48.8575, lon: 2.3622, kind: 'area', anchor: 'start', dy: -4, day: '3' },
  { name: 'Trocadéro', lat: 48.8629, lon: 2.2875, kind: 'sight', anchor: 'start', dy: -8, day: '4' },
  { name: 'Ajfelova kula', lat: 48.8584, lon: 2.2945, kind: 'sight', anchor: 'start', dy: 16, day: '4' },
  { name: 'Rue Cler', lat: 48.8565, lon: 2.3062, kind: 'area', anchor: 'start', dy: -8, day: '4' }
];

export default function AreaMap({ day }: { day?: string } = {}) {
  const [hx, hy] = px(48.8752, 2.3895);
  const bc = px(48.8809, 2.3828);
  const mm = px(48.8862, 2.3400);
  return (
    <figure className="area-map">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Šematski prikaz Pariza sa smeštajem i glavnim kvartovima">
        <rect x="0" y="0" width={W} height={H} rx="14" fill="#FBF7F0" />
        {/* Brdo Montmartre */}
        <ellipse cx={mm[0]} cy={mm[1]} rx="34" ry="20" fill="#EFE3D0" />
        {/* Park Buttes-Chaumont */}
        <ellipse cx={bc[0]} cy={bc[1]} rx="13" ry="9" fill="#CFE0C3" />
        {/* Tuileries */}
        {(() => {
          const t = px(48.8635, 2.3275);
          return <rect x={t[0] - 14} y={t[1] - 5} width="28" height="10" rx="3" fill="#CFE0C3" transform={`rotate(-20 ${t[0]} ${t[1]})`} />;
        })()}
        {/* Champ de Mars */}
        {(() => {
          const t = px(48.8556, 2.2985);
          return <rect x={t[0] - 5} y={t[1] - 14} width="10" height="26" rx="3" fill="#CFE0C3" transform={`rotate(-40 ${t[0]} ${t[1]})`} />;
        })()}
        <path d={pts(SEINE)} fill="none" stroke="#BFD6E2" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <path d={pts(CANAL)} fill="none" stroke="#BFD6E2" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 0" />
        {/* Ostrva */}
        {(() => {
          const a = px(48.8547, 2.3475);
          const b = px(48.8517, 2.3567);
          return (
            <>
              <ellipse cx={a[0]} cy={a[1]} rx="9" ry="3" fill="#E9DFCF" transform={`rotate(-20 ${a[0]} ${a[1]})`} />
              <ellipse cx={b[0]} cy={b[1]} rx="6" ry="2.5" fill="#E9DFCF" transform={`rotate(-20 ${b[0]} ${b[1]})`} />
            </>
          );
        })()}
        {/* Linija do kuće (vazdušna) */}
        {SPOTS.filter((s) => (day ? s.day === day && s.kind === 'sight' : s.kind === 'sight' && ['Sacré-Cœur', 'Louvre', 'Ajfelova kula'].includes(s.name))).map((s) => {
          const [x, y] = px(s.lat, s.lon);
          return <line key={'l' + s.name} x1={hx} y1={hy} x2={x} y2={y} stroke="#2F5D8C" strokeWidth="1" strokeDasharray="3 4" opacity=".45" />;
        })}
        {SPOTS.map((s) => {
          const [x, y] = px(s.lat, s.lon);
          if (s.kind === 'home') {
            return (
              <g key={s.name}>
                <circle cx={x} cy={y} r="10" fill="#2F5D8C" />
                <path d={`M${x - 5} ${y + 1} l5 -5 l5 5 v5 h-10 z`} fill="#fff" />
                <text x={x - 4} y={y - 16} textAnchor="middle" className="am-home">
                  Kuća
                </text>
              </g>
            );
          }
          const dim = !!day && s.day !== day;
          const hot = !!day && s.day === day;
          return (
            <g key={s.name} opacity={dim ? 0.3 : 1}>
              {hot && <circle cx={x} cy={y} r="9" fill="#2F5D8C" opacity=".18" />}
              <circle cx={x} cy={y} r={s.kind === 'sight' ? 4.5 : 3.5} fill={s.kind === 'sight' ? '#1F2433' : s.kind === 'park' ? '#5F8A4E' : '#8C7B66'} />
              <text x={x + (s.anchor === 'start' ? 7 : s.anchor === 'end' ? -7 : 0)} y={y + (s.dy || 0) + 3} textAnchor={s.anchor || 'start'} className={'am-label' + (s.kind === 'area' ? ' am-label--area' : '')}>
                {s.name}
                {s.day ? ` (${s.day})` : ''}
              </text>
            </g>
          );
        })}
        <text x="16" y={H - 14} className="am-water">
          Sena
        </text>
        {/* Sever */}
        <g transform={`translate(${W - 22} 22)`}>
          <circle r="12" fill="#fff" stroke="#E2D7C5" />
          <path d="M0 -8 L4 4 L0 1 L-4 4 Z" fill="#2F5D8C" />
          <text y="-14" textAnchor="middle" className="am-small">
            S
          </text>
        </g>
      </svg>
      <figcaption className="map-legend">
        <span>
          <i className="dot dot--home" /> smeštaj
        </span>
        <span>
          <i className="dot dot--sight" /> znamenitost (broj = dan)
        </span>
        <span>
          <i className="dot dot--area" /> kvart
        </span>
      </figcaption>
    </figure>
  );
}

export const DISTANCES = [
  { to: 'Parc des Buttes-Chaumont', km: '≈ 0,8 km', time: '10–15 min peške' },
  { to: 'Belleville (metro)', km: '≈ 1 km', time: '12–15 min peške' },
  { to: 'Bassin de la Villette', km: '≈ 1,7 km', time: '25–30 min peške' },
  { to: 'Marais (Place des Vosges)', km: '≈ 2,8 km', time: 'metro 11' },
  { to: 'Sacré-Cœur', km: '≈ 3,6 km', time: 'metro 11 + 2' },
  { to: 'Notre-Dame', km: '≈ 3,8 km', time: 'metro 11' },
  { to: 'Luvr', km: '≈ 4,1 km', time: 'metro 11 + 1' },
  { to: 'Ajfelova kula', km: '≈ 7,2 km', time: 'metro 11 + 9' }
];
