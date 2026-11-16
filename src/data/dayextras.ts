// Dodaci za svaki dan: kako stižemo (korak po korak) i Plan B.
// Smer iz zgrade (levo/desno) zavisi od toga na koja vrata izlazite — zato je opisan orijentir (crkva).

export interface HowStep {
  line: string; // 'walk' ili broj linije
  title: string;
  text: string;
}

export interface DayHowTo {
  intro: string;
  steps: HowStep[];
  back: HowStep[];
}

export type PlanBKind = 'kisa' | 'umorni' | 'sto' | 'lagano';

export interface PlanBOption {
  kind: PlanBKind;
  title: string;
  text: string;
  placeIds: string[];
}

export const PLANB_META: Record<PlanBKind, { label: string; emoji: string }> = {
  kisa: { label: 'Pada kiša', emoji: '☔' },
  umorni: { label: 'Umorni smo', emoji: '😴' },
  sto: { label: 'Duže za stolom', emoji: '🍷' },
  lagano: { label: 'Samo lagana šetnja', emoji: '🚶' }
};

const TO_METRO: HowStep = {
  line: 'walk',
  title: 'Iz smeštaja do metroa Jourdain',
  text: 'Izađite na Rue Lassus i krenite ka velikoj crkvi sa dva tornja (Saint-Jean-Baptiste de Belleville). Ulaz u metro je baš tu — jedan je na samoj Rue Lassus. Par minuta hoda. Prvi put proverite da li skrećete levo ili desno — zavisi od vrata zgrade.'
};

const FROM_METRO_HOME: HowStep = {
  line: 'walk',
  title: 'Jourdain → kuća',
  text: 'Izađite na izlaz „Rue Lassus” (ili kod crkve) — smeštaj je na par minuta.'
};

export const HOWTO: Record<string, DayHowTo> = {
  d1: {
    intro: 'Danas bez metroa — sve je peške iz kraja.',
    steps: [
      { line: 'walk', title: 'Do crkve i Rue du Jourdain', text: 'Iz smeštaja do crkve Saint-Jean-Baptiste (par minuta). Kod crkve se sastaju Rue Lassus, Rue de Belleville i Rue du Jourdain — tu je sve.' },
      { line: 'walk', title: 'Do Parc des Buttes-Chaumont', text: 'Park je severozapadno od metroa, oko 10–15 min hoda (procena). Ako niste sigurni, pitajte: „Le parc des Buttes-Chaumont, s’il vous plaît ?”' },
      { line: 'walk', title: 'Ka Belleville-u', text: 'Rue de Belleville vodi NIZBRDO ka stanici Belleville (oko 15 min). Parc de Belleville i Rue des Envierges su levo (južno) od nje.' }
    ],
    back: [
      { line: 'walk', title: 'Peške nazad', text: 'Iz Belleville-a uzbrdo Rue de Belleville oko 15–20 min — crkva sa dva tornja je vaš orijentir.' },
      { line: '11', title: 'Ili metro', text: 'Iz Belleville: linija 11 (braon), smer Rosny–Bois-Perrier, 2 stanice (Pyrénées → Jourdain).' }
    ]
  },
  d2: {
    intro: 'Do Montmartra: jedno presedanje, oko 25–35 min (procena).',
    steps: [
      TO_METRO,
      { line: '11', title: 'Linija 11 (braon) — smer Châtelet', text: 'Vozite se 2 stanice: Pyrénées → Belleville. Izađite u Belleville.' },
      { line: '2', title: 'Presedanje na liniju 2 (tamnoplava) — smer Porte Dauphine', text: 'Pratite narandžastu tablu „Correspondance — 2”. Vozite se 6 stanica do Anvers.' },
      { line: 'walk', title: 'Anvers → Sacré-Cœur', text: 'Izađite i idite uzbrdo Rue de Steinkerque (pune je suvenirnica) do parka ispod bazilike — 5 min, pa stepenice ili uspinjača.' }
    ],
    back: [
      { line: '2', title: 'Iz Blanche (kod Moulin Rouge) — linija 2, smer Nation', text: '8 stanica do Belleville.' },
      { line: '11', title: 'Linija 11 — smer Rosny–Bois-Perrier', text: '2 stanice do Jourdain.' },
      FROM_METRO_HOME
    ]
  },
  d3: {
    intro: 'Do Luvra: jedno presedanje, oko 30–40 min (procena).',
    steps: [
      TO_METRO,
      { line: '11', title: 'Linija 11 (braon) — smer Châtelet', text: 'Vozite se do kraja: 8 stanica do Châtelet. Svi izlaze.' },
      { line: '1', title: 'Presedanje na liniju 1 (žuta) — smer La Défense', text: 'Duži hodnik — pratite žute table „1”. Vozite se 2 stanice do Palais Royal – Musée du Louvre.' },
      { line: 'walk', title: 'Do piramide', text: 'Izlaz „Musée du Louvre”: piramida je na 3–5 min. Vrt Palais-Royal je odmah preko puta.' }
    ],
    back: [
      { line: '11', title: 'Iz Marais-a: Rambuteau ili Arts et Métiers — linija 11, smer Rosny–Bois-Perrier', text: 'Direktno, bez presedanja: 6 stanica iz Rambuteau (5 iz Arts et Métiers) do Jourdain.' },
      FROM_METRO_HOME
    ]
  },
  d4: {
    intro: 'Do Ajfelove kule: jedno presedanje, oko 40–50 min (procena).',
    steps: [
      TO_METRO,
      { line: '11', title: 'Linija 11 (braon) — smer Châtelet', text: 'Vozite se 4 stanice: Pyrénées, Belleville, Goncourt → République. Izađite u République.' },
      { line: '9', title: 'Presedanje na liniju 9 (žuto-zelena) — smer Pont de Sèvres', text: '13 stanica do Trocadéro (oko 25 min). Opustite se, dugo je.' },
      { line: 'walk', title: 'Trocadéro → kula', text: 'Izlaz ka „Tour Eiffel”: esplanada sa pogledom je na 2 min, preko mosta Pont d’Iéna do kule još 10–15 min.' }
    ],
    back: [
      { line: '8', title: 'Iz École Militaire (kod Rue Cler) — linija 8 (lila), smer Pointe du Lac', text: '10 stanica do République.' },
      { line: '11', title: 'Linija 11 — smer Rosny–Bois-Perrier', text: '4 stanice do Jourdain.' },
      FROM_METRO_HOME
    ]
  }
};

export const PLAN_B: Record<string, PlanBOption[]> = {
  d1: [
    {
      kind: 'kisa',
      title: 'Kišni dan u komšiluku',
      text: 'Ostanite blizu kuće. Dug ručak u L’Artisan Libanais ili Paloma, pa kafa na grejanoj terasi Aux Folies. Popodne vino i daska sireva unutra u La Cave de Belleville. Buttes-Chaumont samo kratko, ako prestane.',
      placeIds: ['artisan-libanais', 'paloma', 'aux-folies', 'cave-belleville']
    },
    {
      kind: 'umorni',
      title: 'Spor dan za oporavak od puta',
      text: 'Doručak u pekari kod crkve, kratka šetnja Rue du Jourdain, popodne odmor. Uveče jedna čaša u najbližem Flying Chouette ili meze za poneti iz L’Artisan Libanais.',
      placeIds: ['flying-chouette', 'artisan-libanais']
    },
    {
      kind: 'sto',
      title: 'Veče za stolom',
      text: 'Apéro od 17h u La Cave de Belleville, pa duga večera uz harmoniku u Le Vieux Belleville (rezervišite). Sve je 15 min od kuće — nema žurbe.',
      placeIds: ['cave-belleville', 'vieux-belleville']
    },
    {
      kind: 'lagano',
      title: 'Samo Buttes-Chaumont',
      text: 'Krug oko jezera i do hrama na steni (oko 2 km), kafa usput, pa nazad kući. Bez Belleville-a.',
      placeIds: ['rosa-bonheur']
    }
  ],
  d2: [
    {
      kind: 'kisa',
      title: 'Montmartre na suvom',
      text: 'Uspinjača umesto stepenica, Sacré-Cœur iznutra (besplatno). Zatim pravo niz Rue Lepic u bistro Un Zèbre à Montmartre i kafa u Café des Deux Moulins. Vinograd i Place du Tertre preskočite.',
      placeIds: ['zebre-montmartre', 'deux-moulins']
    },
    {
      kind: 'umorni',
      title: 'Kratka verzija (2–3 km)',
      text: 'Uspinjača gore, pogled sa Sacré-Cœur-a, pa nizbrdo Rue Lepic do Deux Moulins i Moulin Rouge-a. Metro Blanche kući.',
      placeIds: ['deux-moulins']
    },
    {
      kind: 'sto',
      title: 'Dug ručak i romantična večera',
      text: 'Ručak bez žurbe u Un Zèbre à Montmartre, popodne Abbesses, a večera u Le Jardin d’en Face (rezervišite). Moulin Rouge osvetljen posle večere.',
      placeIds: ['zebre-montmartre', 'jardin-den-face']
    },
    {
      kind: 'lagano',
      title: 'Ravnije ulice podno brda',
      text: 'Metro do Abbesses (ili Blanche): Rue des Abbesses, Zid „Volim te”, baguette iz Le Grenier à Pain, Rue Lepic do vetrenjača — bez penjanja na sam vrh.',
      placeIds: ['grenier-abbesses', 'deux-moulins']
    }
  ],
  d3: [
    {
      kind: 'kisa',
      title: 'Natkriveni Pariz',
      text: 'Dan kada vredi ući u Luvr (karta unapred, potreban internet). Odmah iza Palais-Royal je natkriveni pasaž Galerie Vivienne (2 min). Notre-Dame iznutra, ručak pod krovom u Marché des Enfants Rouges, uveče Le Barav.',
      placeIds: ['enfants-rouges', 'barav']
    },
    {
      kind: 'umorni',
      title: 'Sve na liniji 11',
      text: 'Preskočite Luvr i Tuileries. Metro 11 direktno do Hôtel de Ville → Notre-Dame → Île Saint-Louis (Berthillon) → večera u Marais-u → metro 11 iz Rambuteau kući.',
      placeIds: ['berthillon', 'breizh']
    },
    {
      kind: 'sto',
      title: 'Marais od ručka do kasno',
      text: 'Posle Notre-Dame-a pravo u Marais: kasni ručak u Marché des Enfants Rouges, vino u Le Barav od 18h, galettes i cidre u Breizh Café.',
      placeIds: ['enfants-rouges', 'barav', 'breizh']
    },
    {
      kind: 'lagano',
      title: 'Dva ostrva i Place des Vosges',
      text: 'Île de la Cité, Pont Saint-Louis, Île Saint-Louis i Place des Vosges — oko 3 km, ravno, uz sladoled.',
      placeIds: ['berthillon']
    }
  ],
  d4: [
    {
      kind: 'kisa',
      title: 'Kula iz suvog',
      text: 'Pogled sa Trocadéra (galerija Palais de Chaillot), pa dug ručak na grejanoj terasi Café du Marché. Uveče Le Petit Cler — svetlucanje kule se vidi i po kiši.',
      placeIds: ['cafe-du-marche', 'petit-cler']
    },
    {
      kind: 'umorni',
      title: 'Samo pogled i zalazak',
      text: 'Kasniji polazak, ručak na Rue Cler, odmor na klupi u Champ de Mars, pa Trocadéro za zalazak. Labudovo ostrvo preskočite.',
      placeIds: ['cafe-du-marche']
    },
    {
      kind: 'sto',
      title: 'Rue Cler od ručka do večere',
      text: 'Ručak u Café du Marché, šetnja, pa vino i večera u Le Petit Cler pre svetlucanja kule na pun sat.',
      placeIds: ['cafe-du-marche', 'petit-cler']
    },
    {
      kind: 'lagano',
      title: 'Klasičan krug od 2,5 km',
      text: 'Trocadéro → Pont d’Iéna → Champ de Mars → Rue Cler, pa metro 8 iz École Militaire.',
      placeIds: ['petit-cler']
    }
  ]
};
