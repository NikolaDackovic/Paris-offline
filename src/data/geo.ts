// Približne geografske koordinate za mapu-smernicu sa pinovima.
// Tačnost je ~50–150 m — dovoljno za orijentaciju, NE za navigaciju.

export type LatLon = [number, number];

export const HOME: LatLon = [48.8756, 2.3898]; // 5 Rue Lassus — približno, kod metroa Jourdain

// Restorani i barovi (ključ = id iz places.ts)
export const PLACE_COORDS: Record<string, LatLon> = {
  paloma: [48.8713, 2.3833],
  'artisan-libanais': [48.8729, 2.3831],
  'vieux-belleville': [48.8707, 2.3862],
  'cave-belleville': [48.8724, 2.38],
  'flying-chouette': [48.8746, 2.3878],
  'aux-folies': [48.8718, 2.3775],
  'rosa-bonheur': [48.879, 2.3842],
  bastringue: [48.8865, 2.3725],
  'zebre-montmartre': [48.8854, 2.3343],
  'jardin-den-face': [48.8848, 2.3401],
  'grenier-abbesses': [48.8847, 2.3374],
  'deux-moulins': [48.8848, 2.3335],
  barav: [48.8657, 2.362],
  breizh: [48.8613, 2.3626],
  'as-du-fallafel': [48.8572, 2.359],
  'enfants-rouges': [48.8628, 2.362],
  berthillon: [48.8516, 2.3567],
  'cafe-du-marche': [48.8566, 2.3063],
  'petit-cler': [48.857, 2.3066]
};

export interface Sight {
  id: string;
  name: string;
  pos: LatLon;
  day?: string; // 'd1'..'d4'
}

export const SIGHTS: Sight[] = [
  { id: 'buttes-chaumont', name: 'Parc des Buttes-Chaumont', pos: [48.8809, 2.3828], day: 'd1' },
  { id: 'butte-bergeyre', name: 'Butte Bergeyre', pos: [48.8776, 2.3793], day: 'd1' },
  { id: 'mouzaia', name: 'La Mouzaïa', pos: [48.8798, 2.3953], day: 'd1' },
  { id: 'parc-belleville', name: 'Parc de Belleville (pogled)', pos: [48.8716, 2.3832], day: 'd1' },
  { id: 'sacre-coeur', name: 'Sacré-Cœur', pos: [48.8867, 2.3431], day: 'd2' },
  { id: 'tertre', name: 'Place du Tertre', pos: [48.8865, 2.3408], day: 'd2' },
  { id: 'maison-rose', name: 'La Maison Rose', pos: [48.8874, 2.3394], day: 'd2' },
  { id: 'je-taime', name: 'Zid „Volim te”', pos: [48.8846, 2.3385], day: 'd2' },
  { id: 'moulin-rouge', name: 'Moulin Rouge', pos: [48.8841, 2.3322], day: 'd2' },
  { id: 'palais-royal', name: 'Vrt Palais-Royal', pos: [48.8648, 2.3378], day: 'd3' },
  { id: 'louvre', name: 'Luvr (piramida)', pos: [48.8611, 2.3358], day: 'd3' },
  { id: 'tuileries', name: 'Jardin des Tuileries', pos: [48.8635, 2.3275], day: 'd3' },
  { id: 'concorde', name: 'Place de la Concorde', pos: [48.8656, 2.3212], day: 'd3' },
  { id: 'pont-neuf', name: 'Pont Neuf', pos: [48.8572, 2.3413], day: 'd3' },
  { id: 'notre-dame', name: 'Notre-Dame', pos: [48.853, 2.3499], day: 'd3' },
  { id: 'ile-st-louis', name: 'Île Saint-Louis', pos: [48.8517, 2.3567], day: 'd3' },
  { id: 'vosges', name: 'Place des Vosges', pos: [48.8556, 2.3655], day: 'd3' },
  { id: 'trocadero', name: 'Trocadéro', pos: [48.862, 2.2885], day: 'd4' },
  { id: 'eiffel', name: 'Ajfelova kula', pos: [48.8584, 2.2945], day: 'd4' },
  { id: 'champ-de-mars', name: 'Champ de Mars', pos: [48.8556, 2.2986], day: 'd4' },
  { id: 'cygnes', name: 'Labudovo ostrvo', pos: [48.852, 2.2838], day: 'd4' },
  { id: 'rue-cler', name: 'Rue Cler', pos: [48.8566, 2.3062], day: 'd4' },
  { id: 'villette', name: 'Bassin de la Villette (kanal)', pos: [48.8862, 2.3722] }
];

export interface Station {
  name: string;
  pos: LatLon;
  lines: string[];
}

export const STATIONS: Station[] = [
  { name: 'Jourdain', pos: [48.8752, 2.3895], lines: ['11'] },
  { name: 'Pyrénées', pos: [48.8738, 2.3851], lines: ['11'] },
  { name: 'Belleville', pos: [48.8722, 2.3767], lines: ['2', '11'] },
  { name: 'Goncourt', pos: [48.87, 2.3708], lines: ['11'] },
  { name: 'République', pos: [48.8675, 2.3637], lines: ['8', '9', '11'] },
  { name: 'Arts et Métiers', pos: [48.8653, 2.3561], lines: ['11'] },
  { name: 'Rambuteau', pos: [48.8613, 2.3535], lines: ['11'] },
  { name: 'Hôtel de Ville', pos: [48.8574, 2.352], lines: ['1', '11'] },
  { name: 'Châtelet', pos: [48.8583, 2.3474], lines: ['1', '11', '14'] },
  { name: 'Jaurès', pos: [48.8826, 2.3707], lines: ['2'] },
  { name: 'Anvers', pos: [48.8829, 2.3441], lines: ['2'] },
  { name: 'Pigalle', pos: [48.8821, 2.3372], lines: ['2'] },
  { name: 'Blanche', pos: [48.8838, 2.3324], lines: ['2'] },
  { name: 'Abbesses', pos: [48.8844, 2.3384], lines: ['12'] },
  { name: 'Palais Royal', pos: [48.8625, 2.3363], lines: ['1'] },
  { name: 'Concorde', pos: [48.8656, 2.3212], lines: ['1', '8'] },
  { name: 'Trocadéro', pos: [48.8631, 2.2876], lines: ['9'] },
  { name: 'École Militaire', pos: [48.8549, 2.3065], lines: ['8'] }
];

// Pojednostavljene trase linija koje koristimo
export const LINES: { line: string; path: LatLon[] }[] = [
  {
    line: '11',
    path: [
      [48.8752, 2.3895],
      [48.8738, 2.3851],
      [48.8722, 2.3767],
      [48.87, 2.3708],
      [48.8675, 2.3637],
      [48.8653, 2.3561],
      [48.8613, 2.3535],
      [48.8574, 2.352],
      [48.8583, 2.3474]
    ]
  },
  {
    line: '2',
    path: [
      [48.8722, 2.3767],
      [48.8777, 2.3704],
      [48.8826, 2.3707],
      [48.8843, 2.3683],
      [48.8844, 2.36],
      [48.8838, 2.3505],
      [48.8829, 2.3441],
      [48.8821, 2.3372],
      [48.8838, 2.3324]
    ]
  },
  {
    line: '1',
    path: [
      [48.8583, 2.3474],
      [48.8608, 2.341],
      [48.8625, 2.3363],
      [48.8644, 2.3297],
      [48.8656, 2.3212]
    ]
  },
  {
    line: '9',
    path: [
      [48.8675, 2.3637],
      [48.8696, 2.3543],
      [48.8716, 2.343],
      [48.8722, 2.3388],
      [48.873, 2.3336],
      [48.8737, 2.3277],
      [48.8746, 2.3203],
      [48.8735, 2.3158],
      [48.8723, 2.31],
      [48.8689, 2.3098],
      [48.8647, 2.301],
      [48.8647, 2.2938],
      [48.8631, 2.2876]
    ]
  },
  {
    line: '8',
    path: [
      [48.8549, 2.3065],
      [48.8577, 2.3104],
      [48.8611, 2.3146],
      [48.8656, 2.3212],
      [48.87, 2.3245],
      [48.8713, 2.3311],
      [48.8722, 2.3388],
      [48.8716, 2.343],
      [48.8706, 2.3486],
      [48.8696, 2.3543],
      [48.8675, 2.3637]
    ]
  }
];

export const SEINE: LatLon[] = [
  [48.8405, 2.408],
  [48.8445, 2.37],
  [48.8505, 2.36],
  [48.8535, 2.35],
  [48.8575, 2.341],
  [48.86, 2.33],
  [48.864, 2.32],
  [48.8645, 2.305],
  [48.862, 2.295],
  [48.856, 2.285],
  [48.847, 2.276],
  [48.84, 2.272]
];

export const CANAL: LatLon[] = [
  [48.853, 2.369],
  [48.862, 2.366],
  [48.871, 2.365],
  [48.88, 2.368],
  [48.884, 2.369],
  [48.8895, 2.3795],
  [48.8925, 2.388]
];

// Glavne ulice u našem kraju (skica)
export const STREETS: { name: string; path: LatLon[] }[] = [
  {
    name: 'Rue de Belleville',
    path: [
      [48.8722, 2.3767],
      [48.8738, 2.3851],
      [48.8752, 2.3895],
      [48.8768, 2.3985]
    ]
  },
  {
    name: 'Bd de Belleville / de la Villette',
    path: [
      [48.8843, 2.3683],
      [48.8777, 2.3704],
      [48.8722, 2.3767],
      [48.866, 2.381]
    ]
  }
];

export const PARKS: { name: string; pos: LatLon; rx: number; ry: number; rot?: number }[] = [
  { name: 'Buttes-Chaumont', pos: [48.8809, 2.3828], rx: 330, ry: 220, rot: -10 },
  { name: 'Parc de Belleville', pos: [48.8712, 2.3845], rx: 160, ry: 110 },
  { name: 'Tuileries', pos: [48.8635, 2.3275], rx: 480, ry: 120, rot: -25 },
  { name: 'Champ de Mars', pos: [48.8556, 2.2986], rx: 480, ry: 110, rot: 52 },
  { name: 'Montmartre', pos: [48.8862, 2.3405], rx: 520, ry: 300 }
];

/** Udaljenost vazdušnom linijom u km (haversine). */
export function distanceKm(a: LatLon, b: LatLon): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Gruba procena hoda: ulice su ~30% duže od vazdušne linije, ~4,8 km/h. */
export function walkMinutes(km: number): number {
  return Math.round((km * 1.3 * 60) / 4.8);
}

// Projekcija u lokalne metre (dovoljno tačno za Pariz)
const LAT0 = 48.9;
const LON0 = 2.27;
const M_LAT = 111200;
const M_LON = 73300;

export function project([lat, lon]: LatLon): [number, number] {
  return [(lon - LON0) * M_LON, (LAT0 - lat) * M_LAT];
}
