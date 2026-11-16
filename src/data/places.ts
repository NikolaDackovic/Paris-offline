import { LAST_CHECKED } from './trip';

export type PlaceCategory = 'lokalno' | 'bistro' | 'vino' | 'romanticno' | 'pekare' | 'brzo' | 'blizu';

export const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  blizu: 'Blizu smeštaja',
  lokalno: 'Povoljno i lokalno',
  bistro: 'Francuski bistroi',
  vino: 'Vinski barovi',
  romanticno: 'Romantična večera',
  pekare: 'Pekare i kafa',
  brzo: 'Brz ručak'
};

export type BestFor = 'doručak' | 'ručak' | 'večera' | 'kafa' | 'vino';

export interface Place {
  id: string;
  name: string;
  address: string;
  area: string;
  food: string;
  price: string;
  why: string;
  vibe: string;
  bestFor: BestFor[];
  tip: string;
  categories: PlaceCategory[];
  hoursNote: string;
  metro: string;
  verified: string;
  lastChecked: string;
}

const C = LAST_CHECKED;

// Napomena: adrese su proverene u više nezavisnih izvora (Time Out, Paris je t'aime, Le Fooding,
// Frommer's, Paris by Mouth i sl.). Radno vreme se često menja i razlikuje između izvora —
// zato ga NE prikazujemo kao potvrđeno. Cene su orijentacione procene po osobi.

export const PLACES: Place[] = [
  {
    id: 'paloma',
    name: 'Paloma',
    address: '93 Rue Julien-Lacroix, 75020 Paris',
    area: 'Belleville',
    food: 'Savremeni francuski bistro',
    price: 'Ručak (meni radnim danima): oko 15–16 € prema izvorima; večera: procena 30–45 €',
    why: 'Omiljen među lokalcima i hvaljen u Le Fooding i Time Out vodičima. Podnevni meni je jedna od najboljih vrednosti u kraju.',
    vibe: 'Mali, živ i opušten restoran na uglu, pun ljudi iz kraja.',
    bestFor: ['ručak', 'večera'],
    tip: 'Dođite odmah na otvaranje ili rezervišite — mesta se brzo popune.',
    categories: ['blizu', 'bistro', 'lokalno'],
    hoursNote: 'Radno vreme nije pouzdano potvrđeno — proverite pre polaska.',
    metro: 'Pyrénées (11) — ili 10–15 min peške od Jourdain',
    verified: 'Adresa potvrđena u više izvora',
    lastChecked: C
  },
  {
    id: 'artisan-libanais',
    name: 'L’Artisan Libanais',
    address: '91 Rue de Belleville, 75019 Paris',
    area: 'Jourdain / Belleville',
    food: 'Libanska kuhinja: meze, humus, falafel, roštilj',
    price: 'Procena: 12–25 € po osobi',
    why: 'Sveža, ukusna i povoljna hrana na pešačkoj udaljenosti od smeštaja. Dobro i za poneti.',
    vibe: 'Neformalno, toplo, porodično.',
    bestFor: ['ručak', 'večera'],
    tip: 'Naručite mešani meze za dvoje i podelite. Odlično za veče kad ste umorni.',
    categories: ['blizu', 'lokalno', 'brzo'],
    hoursNote: 'Izvori navode podne–kasno uveče, ali se razlikuju — proverite.',
    metro: 'Pyrénées / Jourdain (11)',
    verified: 'Adresa potvrđena u više izvora',
    lastChecked: C
  },
  {
    id: 'vieux-belleville',
    name: 'Le Vieux Belleville',
    address: '12 Rue des Envierges, 75020 Paris',
    area: 'Belleville (vrh Parc de Belleville)',
    food: 'Tradicionalna francuska bistro kuhinja',
    price: 'Procena: 25–40 € po osobi sa vinom',
    why: 'Jedan od poslednjih „pevajućih bistroa” u Parizu: harmonika, stare šansone i Edit Pjaf, a gosti pevaju zajedno.',
    vibe: 'Stari Pariz, nostalgično, glasno i veselo — nezaboravno veče.',
    bestFor: ['večera', 'vino'],
    tip: 'Rezervišite telefonom (zvanični sajt navodi 01 44 62 92 66). Muzičke večeri nisu svakog dana — pitajte pri rezervaciji.',
    categories: ['blizu', 'bistro', 'romanticno'],
    hoursNote: 'Izvori se ne slažu oko dana sa muzikom — obavezno proverite.',
    metro: 'Pyrénées (11)',
    verified: 'Adresa potvrđena na zvaničnom sajtu i u vodičima',
    lastChecked: C
  },
  {
    id: 'cave-belleville',
    name: 'La Cave de Belleville',
    address: '51 Rue de Belleville, 75019 Paris',
    area: 'Belleville',
    food: 'Vinoteka, vinski bar i delikatesi (sirevi, suhomesnato)',
    price: 'Čaša vina oko 4,50–6 €, daska suhomesnatog oko 10 € (stariji podaci, mogu biti viši)',
    why: 'Ogroman izbor vina po cenama prodavnice i odlične daske. Prava pariska „cave à manger”.',
    vibe: 'Rafe sa bocama do plafona, opušteno, lokalno.',
    bestFor: ['vino', 'večera'],
    tip: 'Pitajte: „Qu’est-ce que vous nous conseillez ?” — vole da preporuče.',
    categories: ['blizu', 'vino'],
    hoursNote: 'Izvori navode različito radno vreme (nedeljom kraće) — proverite.',
    metro: 'Belleville (2, 11)',
    verified: 'Adresa potvrđena u više izvora',
    lastChecked: C
  },
  {
    id: 'flying-chouette',
    name: 'Flying Chouette',
    address: '2 Rue de Palestine, 75019 Paris',
    area: 'Jourdain',
    food: 'Bar / vino i mali obroci',
    price: 'Nema pouzdanih podataka o cenama',
    why: 'Mali komšijski lokal na samo par minuta od smeštaja, naveden u aplikaciji za prirodna vina Raisin i sa visokim ocenama gostiju.',
    vibe: 'Lokalno i nepretenciozno.',
    bestFor: ['vino'],
    tip: 'Odlično za poslednju čašu pred spavanje — najbliže kući.',
    categories: ['blizu', 'vino'],
    hoursNote: 'Radno vreme i ponuda nisu potvrđeni — malo pouzdanih izvora.',
    metro: 'Jourdain (11)',
    verified: 'Postojanje i adresa potvrđeni u 2 izvora; ostali detalji nepotvrđeni',
    lastChecked: C
  },
  {
    id: 'aux-folies',
    name: 'Aux Folies',
    address: '8 Rue de Belleville, 75020 Paris',
    area: 'Belleville',
    food: 'Kultni kafić-bar (pića)',
    price: 'Povoljna pića (pivo i vino među najjeftinijima u kraju)',
    why: 'Najpoznatiji bar Belleville-a sa neonskim natpisom i terasom — ovde se gleda život ulice.',
    vibe: 'Živahno, šareno, mešavina svih generacija.',
    bestFor: ['kafa', 'vino'],
    tip: 'Sedite na (grejanu) terasu i samo posmatrajte Rue de Belleville.',
    categories: ['blizu', 'vino', 'pekare'],
    hoursNote: 'Radi od jutra do kasno, ali tačno vreme varira po izvoru.',
    metro: 'Belleville (2, 11)',
    verified: 'Adresa potvrđena u više izvora',
    lastChecked: C
  },
  {
    id: 'rosa-bonheur',
    name: 'Rosa Bonheur (Buttes-Chaumont)',
    address: 'Parc des Buttes-Chaumont (ulaz kod Rue Botzaris), 75019 Paris',
    area: 'Buttes-Chaumont',
    food: 'Guinguette: pića, tapas, mali obroci',
    price: 'Procena: 10–20 € za pića i grickalice',
    why: 'Paviljon usred parka — pariška „guinguette” atmosfera, posebno vikendom.',
    vibe: 'Veselo, opušteno, muzika i ples kasnije uveče.',
    bestFor: ['vino'],
    tip: 'Izvori navode rad uglavnom od četvrtka do nedelje — proverite pre odlaska.',
    categories: ['blizu', 'vino'],
    hoursNote: 'Novembarsko radno vreme nije potvrđeno.',
    metro: 'Botzaris (7bis)',
    verified: 'Postojanje potvrđeno (Paris je t’aime, Sortiraparis)',
    lastChecked: C
  },
  {
    id: 'bastringue',
    name: 'Le Bastringue',
    address: '67 Quai de la Seine, 75019 Paris',
    area: 'Bassin de la Villette / Canal de l’Ourcq',
    food: 'Bar-bistro: francuska jela, burgeri, daske',
    price: 'Procena: 15–30 € po osobi',
    why: 'Terasa tik uz vodu Bassin de la Villette — lokalni Pariz uz kanal, daleko od turista.',
    vibe: 'Opušteno, mlado, komšijski.',
    bestFor: ['ručak', 'vino', 'kafa'],
    tip: 'Kombinujte sa šetnjom uz kanal od Stalingrada ka Parc de la Villette.',
    categories: ['lokalno', 'vino'],
    hoursNote: 'Izvori navode rad od jutra do kasno, ali se razlikuju — proverite.',
    metro: 'Riquet (7) ili Laumière (5); od kuće: Jaurès (2)',
    verified: 'Adresa potvrđena u više izvora',
    lastChecked: C
  },
  {
    id: 'zebre-montmartre',
    name: 'Un Zèbre à Montmartre',
    address: '38 Rue Lepic, 75018 Paris',
    area: 'Montmartre',
    food: 'Bistro / brasserie',
    price: 'Procena: 20–30 € po osobi',
    why: 'Prema Time Out-u: razumne cene i prijatna atmosfera, na Rue Lepic umesto na turističkom vrhu brda.',
    vibe: 'Topao, ušuškan bistro.',
    bestFor: ['ručak', 'večera'],
    tip: 'Pitajte za „plat du jour” (jelo dana) — obično najbolja vrednost.',
    categories: ['bistro', 'lokalno'],
    hoursNote: 'Radno vreme nije potvrđeno.',
    metro: 'Blanche (2) / Abbesses (12)',
    verified: 'Postojanje potvrđeno (Time Out); cene nisu aktuelne',
    lastChecked: C
  },
  {
    id: 'jardin-den-face',
    name: 'Le Jardin d’en Face',
    address: '29 Rue des Trois Frères, 75018 Paris',
    area: 'Montmartre / Abbesses',
    food: 'Francuski bistro',
    price: 'Procena: 30–45 € po osobi sa vinom',
    why: 'Mali bistro u mirnoj ulici ispod Sacré-Cœur-a, preporučen u Frommer’s vodiču; daleko od gužve na Place du Tertre.',
    vibe: 'Intimno, romantično, malo stolova.',
    bestFor: ['večera'],
    tip: 'Rezervišite — mali je.',
    categories: ['romanticno', 'bistro'],
    hoursNote: 'Radno vreme nije potvrđeno.',
    metro: 'Abbesses (12) / Anvers (2)',
    verified: 'Postojanje potvrđeno (Frommer’s); stariji podaci o cenama',
    lastChecked: C
  },
  {
    id: 'grenier-abbesses',
    name: 'Le Grenier à Pain Abbesses',
    address: '38 Rue des Abbesses, 75018 Paris',
    area: 'Montmartre / Abbesses',
    food: 'Pekara (boulangerie)',
    price: 'Baguette oko 1,30–1,60 € (procena), kroasan oko 1,50–2 €',
    why: 'Pobednik takmičenja za najbolji baguette u Parizu (2010. i 2015).',
    vibe: 'Mala pekara sa redom ispred — to je dobar znak.',
    bestFor: ['doručak', 'ručak'],
    tip: 'Tražite „une tradition” — klasičan baguette od tradicionalnog testa.',
    categories: ['pekare', 'brzo'],
    hoursNote: 'Prema izvorima zatvoreno utorkom i sredom.',
    metro: 'Abbesses (12)',
    verified: 'Adresa potvrđena u više izvora',
    lastChecked: C
  },
  {
    id: 'deux-moulins',
    name: 'Café des Deux Moulins',
    address: '15 Rue Lepic, 75018 Paris',
    area: 'Montmartre (kod Blanche)',
    food: 'Kafić-brasserie',
    price: 'Procena: kafa 3–5 €, obrok 15–25 €',
    why: 'Kafić u kome je radila Amelie iz istoimenog filma. Pravi pariski kafić iz kraja.',
    vibe: 'Retro, ćaskanje, lokalci i fanovi filma.',
    bestFor: ['kafa', 'doručak'],
    tip: 'Savršena pauza pre Moulin Rouge-a (2 min hoda).',
    categories: ['pekare'],
    hoursNote: 'Radno vreme nije potvrđeno.',
    metro: 'Blanche (2)',
    verified: 'Dobro poznata adresa',
    lastChecked: C
  },
  {
    id: 'barav',
    name: 'Le Barav',
    address: '6 Rue Charles-François Dupuis, 75003 Paris',
    area: 'Haut-Marais',
    food: 'Vinski bar + vinoteka: daske, sirevi, salate',
    price: 'Čaša vina od oko 5–7 € (stariji podaci), daske procena 12–20 €',
    why: 'Stotine etiketa (mnogo prirodnih vina), vino iz susedne vinoteke po pristupačnim cenama.',
    vibe: 'Gužva, žamor, Parižani posle posla. Retko je prazno.',
    bestFor: ['vino', 'večera'],
    tip: 'Rezervišite ili dođite ranije. Pitajte za vino iz Loare ili Burgundije.',
    categories: ['vino', 'romanticno'],
    hoursNote: 'Izvori: uveče utorak–subota; nedeljom zatvoreno — proverite.',
    metro: 'Temple (3) / République; kući: Arts et Métiers (11)',
    verified: 'Adresa potvrđena u više izvora',
    lastChecked: C
  },
  {
    id: 'breizh',
    name: 'Breizh Café (Marais)',
    address: '109 Rue Vieille du Temple, 75003 Paris',
    area: 'Marais',
    food: 'Bretonske palačinke (galettes i crêpes), jabukovača',
    price: 'Glavna jela oko 7–15 € (Time Out); ukupno procena 20–30 €',
    why: 'Verovatno najbolje galettes u Parizu, od heljdinog brašna, uz bretonski cidre.',
    vibe: 'Moderno, svetlo, uvek puno.',
    bestFor: ['ručak', 'večera'],
    tip: 'Probajte „galette complète” (šunka, sir, jaje) i „bolée de cidre”.',
    categories: ['brzo', 'lokalno'],
    hoursNote: 'Izvori navode rad od srede do nedelje — proverite.',
    metro: 'Saint-Sébastien–Froissart (8) / Rambuteau (11)',
    verified: 'Adresa potvrđena u više izvora',
    lastChecked: C
  },
  {
    id: 'as-du-fallafel',
    name: 'L’As du Fallafel',
    address: '34 Rue des Rosiers, 75004 Paris',
    area: 'Marais',
    food: 'Falafel u pita hlebu',
    price: 'Procena: 9–12 € po osobi',
    why: 'Najpoznatiji falafel u Parizu — ogromna porcija, brzo i jeftino.',
    vibe: 'Red na ulici, jede se u hodu ili za brzim stolom.',
    bestFor: ['ručak'],
    tip: 'Košer lokal: subotom zatvoreno, petkom radi samo do popodne.',
    categories: ['brzo', 'lokalno'],
    hoursNote: 'Subota: ZATVORENO (potvrđeno u više izvora).',
    metro: 'Saint-Paul (1)',
    verified: 'Adresa potvrđena u više izvora',
    lastChecked: C
  },
  {
    id: 'enfants-rouges',
    name: 'Marché des Enfants Rouges',
    address: '39 Rue de Bretagne, 75003 Paris',
    area: 'Haut-Marais',
    food: 'Najstarija natkrivena pijaca u Parizu sa tezgama hrane iz celog sveta',
    price: 'Procena: 10–18 € po osobi',
    why: 'Brz i ukusan obrok sa lokalcima — francuski, marokanski, japanski štandovi pod jednim krovom.',
    vibe: 'Pijačna gužva, zajednički stolovi.',
    bestFor: ['ručak'],
    tip: 'Ponedeljkom zatvoreno; najživlje vikendom za ručak.',
    categories: ['brzo', 'lokalno'],
    hoursNote: 'Radno vreme proverite; uveče rano zatvara.',
    metro: 'Filles du Calvaire (8) / Temple (3)',
    verified: 'Dobro poznata adresa',
    lastChecked: C
  },
  {
    id: 'berthillon',
    name: 'Berthillon',
    address: '29–31 Rue Saint-Louis-en-l’Île, 75004 Paris',
    area: 'Île Saint-Louis',
    food: 'Čuveni sladoled i sorbe',
    price: 'Procena: 4–7 € po kornetu',
    why: 'Pariska legenda od 1954 — sorbe od crne čokolade ili kajsije.',
    vibe: 'Mala prodavnica na najmirnijem ostrvu Pariza.',
    bestFor: ['kafa'],
    tip: 'Tradicionalno ne radi ponedeljkom i utorkom; subota je u redu.',
    categories: ['pekare'],
    hoursNote: 'Radno vreme proverite.',
    metro: 'Pont Marie (7)',
    verified: 'Dobro poznata adresa',
    lastChecked: C
  },
  {
    id: 'cafe-du-marche',
    name: 'Café du Marché',
    address: '38 Rue Cler, 75007 Paris',
    area: 'Rue Cler / Ajfelova kula',
    food: 'Francuski bistro: salate, jela dana, croque-monsieur',
    price: 'Glavna jela oko 14–18 € (Frommer’s); procena 20–30 € po osobi',
    why: 'Pravi kafić pijačne ulice, obilne porcije i grejana terasa — 10 minuta od kule.',
    vibe: 'Živo, komšijski, kelneri u trku.',
    bestFor: ['ručak', 'kafa', 'vino'],
    tip: 'Prema Time Out-u nedeljom radi kraće (do popodne) — idealno za ručak 4. dana.',
    categories: ['bistro', 'lokalno'],
    hoursNote: 'Nedeljom verovatno do ~17h (nije potvrđeno).',
    metro: 'École Militaire (8)',
    verified: 'Adresa potvrđena u više izvora',
    lastChecked: C
  },
  {
    id: 'petit-cler',
    name: 'Le Petit Cler',
    address: '29 Rue Cler, 75007 Paris',
    area: 'Rue Cler / Ajfelova kula',
    food: 'Mali francuski bistro: jela dana, supa od luka',
    price: 'Procena: 25–40 € po osobi sa vinom',
    why: 'Mali, retro bistro istih vlasnika kao poznati La Fontaine de Mars, ali povoljniji.',
    vibe: 'Ušuškano, crveni stolovi, pariška klasika.',
    bestFor: ['večera', 'ručak'],
    tip: 'Rezervacija preporučena (izvori navode 01 45 50 17 50).',
    categories: ['romanticno', 'bistro'],
    hoursNote: 'Prema Frommer’s-u radi svaki dan — proverite za nedelju uveče.',
    metro: 'École Militaire (8)',
    verified: 'Adresa potvrđena u više izvora',
    lastChecked: C
  }
];

export const placeById = (id: string) => PLACES.find((p) => p.id === id);
