export const LINE_COLORS: Record<string, { bg: string; fg: string }> = {
  '1': { bg: '#FFCD00', fg: '#1F2433' },
  '2': { bg: '#003CA6', fg: '#FFFFFF' },
  '5': { bg: '#FF7E2E', fg: '#1F2433' },
  '7bis': { bg: '#6ECA97', fg: '#1F2433' },
  '8': { bg: '#C9A4D0', fg: '#1F2433' },
  '9': { bg: '#C7C000', fg: '#1F2433' },
  '11': { bg: '#704B1C', fg: '#FFFFFF' },
  '12': { bg: '#007852', fg: '#FFFFFF' },
  '14': { bg: '#62259D', fg: '#FFFFFF' },
  walk: { bg: '#E7DCCB', fg: '#1F2433' }
};

export interface RouteStep {
  line: string; // broj linije ili 'walk'
  direction?: string;
  from: string;
  to: string;
  stops?: number;
  note?: string;
}

export interface MetroRoute {
  id: string;
  title: string;
  short: string;
  destStation: string;
  transfer: string;
  steps: RouteStep[];
  walkAfter: string;
  total: string;
  back: string;
  alt?: string;
}

// Rute su sastavljene prema zvaničnim trasama RATP linija (linija 11 od juna 2024. ide do Rosny–Bois-Perrier).
// Vremena su PROCENE i ne uključuju čekanje, gužve ili radove.
export const ROUTES: MetroRoute[] = [
  {
    id: 'montmartre',
    title: 'Smeštaj → Montmartre / Sacré-Cœur',
    short: 'Montmartre',
    destStation: 'Anvers (linija 2)',
    transfer: 'Belleville (11 → 2)',
    steps: [
      { line: 'walk', from: 'Smeštaj', to: 'Jourdain', note: 'nekoliko minuta' },
      { line: '11', direction: 'Châtelet', from: 'Jourdain', to: 'Belleville', stops: 2 },
      { line: '2', direction: 'Porte Dauphine', from: 'Belleville', to: 'Anvers', stops: 6 }
    ],
    walkAfter: 'Od Anvers do podnožja Sacré-Cœur-a oko 5 min (Rue de Steinkerque), pa stepenice ili uspinjača — ukupno 10–15 min do bazilike.',
    total: 'oko 25–35 min do bazilike (procena)',
    back: 'Iz Blanche ili Pigalle: linija 2, smer Nation → Belleville → linija 11, smer Rosny–Bois-Perrier → Jourdain.'
  },
  {
    id: 'louvre',
    title: 'Smeštaj → Luvr',
    short: 'Luvr',
    destStation: 'Palais Royal – Musée du Louvre (linija 1)',
    transfer: 'Châtelet (11 → 1)',
    steps: [
      { line: 'walk', from: 'Smeštaj', to: 'Jourdain', note: 'nekoliko minuta' },
      { line: '11', direction: 'Châtelet', from: 'Jourdain', to: 'Châtelet', stops: 8, note: 'Châtelet je poslednja stanica — svi izlaze.' },
      { line: '1', direction: 'La Défense', from: 'Châtelet', to: 'Palais Royal – Musée du Louvre', stops: 2, note: 'Presedanje u Châtelet je dug podzemni hodnik — pratite žute oznake „1”.' }
    ],
    walkAfter: 'Oko 3–5 min do piramide (izlaz ka Musée du Louvre / Rue de Rivoli).',
    total: 'oko 30–40 min (procena)',
    back: 'Linija 1, smer Château de Vincennes → Châtelet → linija 11, smer Rosny–Bois-Perrier → Jourdain.',
    alt: 'Alternativa bez presedanja: linija 11 do Châtelet, pa 15 min peške niz Rue de Rivoli.'
  },
  {
    id: 'eiffel',
    title: 'Smeštaj → Trocadéro / Ajfelova kula',
    short: 'Ajfelova kula',
    destStation: 'Trocadéro (linija 9)',
    transfer: 'République (11 → 9)',
    steps: [
      { line: 'walk', from: 'Smeštaj', to: 'Jourdain', note: 'nekoliko minuta' },
      { line: '11', direction: 'Châtelet', from: 'Jourdain', to: 'République', stops: 4 },
      { line: '9', direction: 'Pont de Sèvres', from: 'République', to: 'Trocadéro', stops: 13 }
    ],
    walkAfter: 'Od Trocadéro do esplanade 2 min; preko Pont d’Iéna do kule još 10–15 min.',
    total: 'oko 40–50 min (procena)',
    back: 'Iz École Militaire (kod Rue Cler): linija 8, smer Pointe du Lac → République → linija 11, smer Rosny–Bois-Perrier → Jourdain. Ili iz Trocadéro: linija 9, smer Mairie de Montreuil → République → linija 11.'
  },
  {
    id: 'notre-dame',
    title: 'Smeštaj → centar / Notre-Dame',
    short: 'Notre-Dame',
    destStation: 'Hôtel de Ville (linija 11)',
    transfer: 'Bez presedanja',
    steps: [
      { line: 'walk', from: 'Smeštaj', to: 'Jourdain', note: 'nekoliko minuta' },
      { line: '11', direction: 'Châtelet', from: 'Jourdain', to: 'Hôtel de Ville', stops: 7 }
    ],
    walkAfter: 'Oko 8–10 min peške preko Pont d’Arcole do Notre-Dame-a.',
    total: 'oko 25–30 min (procena)',
    back: 'Hôtel de Ville → linija 11, smer Rosny–Bois-Perrier → Jourdain (direktno).',
    alt: 'Marais je odmah pored: Rambuteau i Arts et Métiers su takođe na liniji 11.'
  },
  {
    id: 'belleville',
    title: 'Smeštaj → Belleville',
    short: 'Belleville',
    destStation: 'Belleville (linije 2 i 11)',
    transfer: 'Bez presedanja',
    steps: [
      { line: 'walk', from: 'Smeštaj', to: 'Jourdain', note: 'nekoliko minuta' },
      { line: '11', direction: 'Châtelet', from: 'Jourdain', to: 'Belleville', stops: 2 }
    ],
    walkAfter: 'Izlazite direktno na raskršće Boulevard de Belleville / Rue de Belleville.',
    total: 'oko 10 min metroom; peške niz Rue de Belleville oko 15 min (procena)',
    back: 'Linija 11, smer Rosny–Bois-Perrier, 2 stanice. Uzbrdo peške oko 15–20 min.',
    alt: 'Preporuka: nizbrdo peške (lepa ulica), nazad metroom.'
  },
  {
    id: 'canal',
    title: 'Smeštaj → Canal de l’Ourcq / Bassin de la Villette',
    short: 'Kanal',
    destStation: 'Jaurès (linija 2)',
    transfer: 'Belleville (11 → 2)',
    steps: [
      { line: 'walk', from: 'Smeštaj', to: 'Jourdain', note: 'nekoliko minuta' },
      { line: '11', direction: 'Châtelet', from: 'Jourdain', to: 'Belleville', stops: 2 },
      { line: '2', direction: 'Porte Dauphine', from: 'Belleville', to: 'Jaurès', stops: 2 }
    ],
    walkAfter: 'Oko 3–10 min do vode Bassin de la Villette (Quai de la Seine / Quai de la Loire).',
    total: 'oko 20 min metroom; peške kroz Buttes-Chaumont oko 25–30 min (procena)',
    back: 'Jaurès → linija 2, smer Nation → Belleville → linija 11, smer Rosny–Bois-Perrier → Jourdain.',
    alt: 'Peške je lepše: kroz Parc des Buttes-Chaumont pa niz Avenue Secrétan do kanala.'
  }
];

export const METRO_GUIDE: { title: string; text: string }[] = [
  {
    title: 'Kako funkcioniše metro',
    text: 'Pariz ima 16 linija metroa, svaka ima broj i boju. Vozovi idu otprilike od 5:30 do oko 1h (petkom i subotom duže), na nekoliko minuta. Vaša linija je 11 (braon), stanica Jourdain.'
  },
  {
    title: 'Karte (procena — proverite na licu mesta)',
    text: 'Najlakše: kupite Navigo Easy karticu (oko 2 €) na šalteru ili automatu i napunite je kartama „Ticket Métro-Train-RER”. Jedna vožnja košta 2,55 € (tarif 2026, proverite na automatu). Kartica važi za oboje ako svako ima svoju — jedna kartica = jedna osoba. Karte čuvajte do izlaska iz metroa.'
  },
  {
    title: 'Linija i smer (direction)',
    text: 'Na peronu NE piše „levo/desno” već naziv POSLEDNJE stanice. Iz Jourdain ka centru = smer „Châtelet”. Ka kući = smer „Rosny–Bois-Perrier” (stare table mogu još pisati „Mairie des Lilas”).'
  },
  {
    title: 'Presedanje (correspondance)',
    text: 'Presedanje znači prelazak na drugu liniju bez izlaska napolje. Pratite narandžaste table „Correspondance” i broj linije u boji, pa onda pravi smer. Plavo-bele table „Sortie” vode NAPOLJE — ne idite tuda ako presedate.'
  },
  {
    title: 'Kako naći pravi izlaz (sortie)',
    text: 'Velike stanice imaju više izlaza sa brojevima i nazivom ulice. U stanici postoji „plan du quartier” (mapa kvarta) — na njoj pronađite ulicu i broj izlaza. Za smeštaj: izađite na Rue de Belleville kod crkve.'
  },
  {
    title: 'Ako uđete u pogrešan metro',
    text: 'Bez panike. Izađite na sledećoj stanici, pređite na suprotni peron (prati „Correspondance” ili isti broj linije, drugi smer) i vratite se. Karta obično ostaje važeća dok ne izađete kroz izlaz.'
  },
  {
    title: 'Znakovi koje ćete viđati',
    text: '„Direction” = smer • „Correspondance” = presedanje • „Sortie” = izlaz • „Accès aux quais” = ka peronima • „Prochain train” = sledeći voz • „Trafic perturbé” = poremećen saobraćaj • „Grève” = štrajk.'
  },
  {
    title: 'Vrata i bezbednost',
    text: 'Na starijim vozovima vrata otvarate sami (dugme ili ručica). Ne stojte uz vrata sa telefonom u ruci — džeparoši rade baš tu, posebno na linijama 1 i 2.'
  }
];

export const METRO_TERMS: { fr: string; sr: string }[] = [
  { fr: 'Direction', sr: 'Smer (poslednja stanica linije)' },
  { fr: 'Correspondance', sr: 'Presedanje na drugu liniju' },
  { fr: 'Sortie', sr: 'Izlaz' },
  { fr: 'Accès aux quais', sr: 'Prolaz ka peronima' },
  { fr: 'Quai', sr: 'Peron' },
  { fr: 'Ligne', sr: 'Linija' },
  { fr: 'Station', sr: 'Stanica' },
  { fr: 'Plan du quartier', sr: 'Mapa okoline stanice' },
  { fr: 'Prochain train', sr: 'Sledeći voz' },
  { fr: 'Terminus', sr: 'Poslednja stanica' },
  { fr: 'Trafic perturbé / interrompu', sr: 'Poremećen / prekinut saobraćaj' },
  { fr: 'Grève', sr: 'Štrajk' },
  { fr: 'Travaux', sr: 'Radovi' },
  { fr: 'Valider', sr: 'Prisloniti/ubaciti kartu na ulazu' },
  { fr: 'Guichet', sr: 'Šalter' },
  { fr: 'Ascenseur / Escalier', sr: 'Lift / Stepenice' },
  { fr: 'Attention à la marche', sr: 'Pazite na stepenik' }
];
