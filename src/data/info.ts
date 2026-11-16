export interface InfoSection {
  id: string;
  title: string;
  points: string[];
}

// Brojevi su zvanični francuski brojevi za hitne slučajeve (service-public.fr / gouvernement.fr).
export const EMERGENCY_NUMBERS = [
  { num: '112', title: 'Evropski broj za hitne slučajeve', text: 'Radi sa svakog telefona, i bez SIM kartice. Operateri često govore engleski.', main: true },
  { num: '15', title: 'SAMU — hitna medicinska pomoć', text: 'Ozbiljan zdravstveni problem.' },
  { num: '17', title: 'Policija (Police secours)', text: 'Krađa sa nasiljem, napad, opasnost.' },
  { num: '18', title: 'Vatrogasci (Pompiers)', text: 'Požar, nesreće, povrede.' },
  { num: '114', title: 'Hitni broj za osobe sa oštećenjem sluha ili govora', text: 'Kontakt porukom (SMS) umesto glasovnog poziva.' }
];

export const EMBASSY = {
  name: 'Ambasada Republike Srbije u Parizu',
  address: '5 Rue Léonard de Vinci, 75116 Paris',
  phone: '+33 1 40 72 24 24',
  phone2: '+33 1 40 72 24 17',
  note: 'Za izgubljen pasoš ili ozbiljne probleme. Podaci iz više javnih izvora — pre poziva proverite na amb-serbie.fr ako imate internet.'
};

export const INFO_SECTIONS: InfoSection[] = [
  {
    id: 'bonton',
    title: 'Francuski bonton',
    points: [
      '„Bonjour” je zlatno pravilo: pozdravite pri ulasku u svaku radnju, kafić, pekaru i pre nego što bilo šta pitate. Bez pozdrava ljudi deluju hladno.',
      'Pri izlasku: „Merci, au revoir !” ili „Bonne journée !”.',
      'Oslovljavajte sa „Monsieur” i „Madame” — „Bonjour, Madame”.',
      'Francuzi govore tiše u restoranima i metrou nego što smo navikli.',
      'Pokušaj na francuskom (makar „Bonjour, excusez-moi…”) otvara vrata, pa tek onda pređite na engleski.'
    ]
  },
  {
    id: 'restoran',
    title: 'Kako se ponašati u restoranu',
    points: [
      'Sačekajte da vas smeste („Une table pour deux ?”), osim u kafićima gde je očigledno da sedate sami.',
      'Ručak je obično 12–14h, večera 19:30–22h. Između (oko 15–18h) mnoge kuhinje ne rade — tada su otvoreni kafići i vinski barovi.',
      'Konobara pozovite pogledom ili sa „Excusez-moi !”. Nikad zviždanjem ili „garçon”.',
      'Račun ne stiže sam — tražite „L’addition, s’il vous plaît”.',
      'Plaćanje karticom je skoro svuda moguće; terminal donose do stola.',
      '„Entrée” je PREDJELO, a ne glavno jelo. Glavno jelo je „plat”.'
    ]
  },
  {
    id: 'voda',
    title: 'Kako tražiti besplatnu vodu',
    points: [
      'Recite: „Une carafe d’eau, s’il vous plaît” — bokal česmenske vode je po zakonu besplatan uz obrok.',
      'Ako pitate samo „de l’eau”, mogu vam doneti flaširanu (plaća se).',
      'Česmenska voda u Parizu je bezbedna. Zelene česme Wallace na ulicama su takođe pitke.'
    ]
  },
  {
    id: 'vino',
    title: 'Kako naručiti vino',
    points: [
      '„Un verre de rouge / blanc / rosé” — čaša crnog / belog / roze.',
      '„Un pichet” (25 ili 50 cl) kućnog vina je najpovoljnija opcija i uglavnom sasvim dobra.',
      '„Une bouteille” = boca. „Un demi” je mala točena čaša PIVA, ne vina.',
      'Pitajte: „Qu’est-ce que vous conseillez avec ce plat ?” — šta preporučujete uz ovo jelo.',
      'Regioni za probati: Côtes du Rhône i Beaujolais (crno, povoljno), Loire — Sancerre/Muscadet (belo), Bordeaux, Bourgogne.',
      'Prirodna vina („vin nature”) su vrlo popularna u Belleville-u i Marais-u — mogu biti neobična, slobodno tražite da probate.'
    ]
  },
  {
    id: 'obroci',
    title: 'Tipični francuski obroci',
    points: [
      'Petit-déjeuner (doručak): kroasan, pain au chocolat, tartine (hleb sa puterom i džemom) i kafa.',
      'Formule du midi: povoljan podnevni meni — predjelo + glavno ili glavno + desert.',
      'Plat du jour: jelo dana, najsvežije i najisplativije.',
      'Klasike: steak frites, confit de canard (pačji batak), bœuf bourguignon, soupe à l’oignon (supa od luka), croque-monsieur, quiche.',
      'Planche: daska sireva i/ili suhomesnatog (charcuterie) — idealno uz vino.',
      'Desert: crème brûlée, tarte tatin, mousse au chocolat, profiteroles.'
    ]
  },
  {
    id: 'napojnica',
    title: 'Napojnica',
    points: [
      'U Francuskoj je usluga po zakonu uračunata u cenu („service compris”).',
      'Napojnica nije obavezna. Uobičajeno je zaokružiti iznos ili ostaviti 1–2 € za kafu/piće.',
      'Za veoma dobru večeru: oko 5–10% — po vašem izboru.',
      'Pri plaćanju karticom terminal ponekad pita za napojnicu — slobodno izaberite 0.'
    ]
  },
  {
    id: 'taksi',
    title: 'Kako prepoznati zvanični taksi',
    points: [
      'Zvanični pariski taksi ima svetleći znak „TAXI PARISIEN” na krovu: zeleno = slobodan, crveno = zauzet.',
      'Mora imati taksimetar i vidljivu cenovnu tablu. Plaćanje karticom je obavezno omogućeno.',
      'Za vožnje od/do aerodroma CDG i Orly važe fiksne cene (proverite aktuelne na zvaničnim tablama).',
      'NIKADA ne prihvatajte ponudu ljudi koji vam priđu na aerodromu ili stanici nudeći „taxi” — to su nelegalni prevoznici.',
      'Taksi stajališta su označena plavim znakom „Taxis”.'
    ]
  },
  {
    id: 'dzeparosi',
    title: 'Zaštita od džeparoša',
    points: [
      'Telefon nikad na stolu u kafiću na terasi, niti u zadnjem džepu.',
      'Torbu nosite ispred sebe, zatvorenu. Novčanik u unutrašnjem džepu.',
      'U metrou ne stojte tik uz vrata sa telefonom u ruci — kradu u trenutku zatvaranja vrata.',
      'Rizična mesta: linije 1 i 2, Châtelet, Sacré-Cœur, Ajfelova kula, Luvr, Trocadéro.',
      'Podelite novac i kartice: deo kod jednog, deo kod drugog.'
    ]
  },
  {
    id: 'bezbednost',
    title: 'Bezbednost na turističkim mestima',
    points: [
      'Prevara sa peticijom: neko pita „Do you speak English?” i traži potpis i „donaciju” — samo prođite.',
      'Prevara sa prstenom: neko „nađe” zlatni prsten i nudi ga vama — ne uzimajte.',
      'Narukvice od konca kod Sacré-Cœur-a: ne pružajte ruku.',
      'Igra sa tri čaše na mostovima — namešteno, uvek gubite.',
      'Uveče su Pigalle, Stalingrad i La Chapelle prometni i manje prijatni — držite se glavnih ulica.',
      'Ako se osetite nelagodno: uđite u kafić, apoteku ili radnju.'
    ]
  },
  {
    id: 'izgubljeni',
    title: 'Ako se izgubite',
    points: [
      'Ostanite mirni i potražite najbliži znak „M” (metro). Svaka stanica ima mapu kvarta i mapu metroa.',
      'Pronađite liniju 11 ili liniju 2 → Belleville → linija 11 → Jourdain.',
      'Pokažite karticu sa adresom (Više → Taksi kartica) taksisti ili prolazniku.',
      'Ako ste se razdvojili: unapred se dogovorite o mestu sastanka (npr. ulaz u stanicu Jourdain).',
      'Ako telefon ima bateriju: Apple Mape mogu raditi i bez interneta ako ste unapred preuzeli mapu Pariza.'
    ]
  },
  {
    id: 'zdravlje',
    title: 'Apoteke i zdravlje',
    points: [
      'Apoteke su označene zelenim krstom. Farmaceuti daju dobre savete za blage tegobe.',
      'Ponesite EU zdravstvenu karticu ili putno zdravstveno osiguranje.',
      'Noću i nedeljom radi dežurna apoteka („pharmacie de garde”) — informacija je obično na vratima svake apoteke.'
    ]
  }
];

export const PACKING_DEFAULTS: { id: string; label: string; group: string }[] = [
  { id: 'p-passport', label: 'Pasoši', group: 'Dokumenta' },
  { id: 'p-tickets', label: 'Avionske karte / boarding pass', group: 'Dokumenta' },
  { id: 'p-insurance', label: 'Putno zdravstveno osiguranje', group: 'Dokumenta' },
  { id: 'p-booking', label: 'Potvrda smeštaja i kontakt domaćina', group: 'Dokumenta' },
  { id: 'p-cards', label: 'Platne kartice (+ rezervna) i malo gotovine u evrima', group: 'Novac' },
  { id: 'p-charger', label: 'Punjač za telefon', group: 'Tehnika' },
  { id: 'p-powerbank', label: 'Power bank (u ručni prtljag)', group: 'Tehnika' },
  { id: 'p-adapter', label: 'Kabl za punjenje (dodatni)', group: 'Tehnika' },
  { id: 'p-shoes', label: 'Udobne cipele za hodanje', group: 'Odeća' },
  { id: 'p-jacket', label: 'Topla, vodootporna jakna', group: 'Odeća' },
  { id: 'p-layers', label: 'Džemper / slojevi (6–12 °C)', group: 'Odeća' },
  { id: 'p-scarf', label: 'Šal (i za crkve i za vetar uz Senu)', group: 'Odeća' },
  { id: 'p-umbrella', label: 'Kišobran (mali, sklopivi)', group: 'Ostalo' },
  { id: 'p-meds', label: 'Lična terapija i osnovni lekovi', group: 'Ostalo' },
  { id: 'p-bag', label: 'Mala torba koja se zatvara (zbog džeparoša)', group: 'Ostalo' },
  { id: 'p-tote', label: 'Platnena torba za pekaru i vino', group: 'Ostalo' },
  { id: 'p-offlinemap', label: 'Preuzeta offline mapa Pariza u Apple Mapama', group: 'Pre puta' },
  { id: 'p-app', label: 'Ova aplikacija dodata na početni ekran i otvorena bar jednom', group: 'Pre puta' }
];

export const OFFLINE_MATRIX = {
  offline: [
    'Plan za sva 4 dana i dan polaska',
    'Rute metroa, šema linija i saveti za metro',
    'Vodič kroz restorane, kafiće i vinske barove',
    'Francuski izrazi sa izgovorom i pretragom',
    'Stranica „Treba mi pomoć” i brojevi za hitne slučajeve',
    'Adresa smeštaja i taksi kartica',
    'Troškovi, beleške, omiljena mesta i liste — čuvaju se na telefonu',
    'Šematska mapa kvartova'
  ],
  online: [
    'Vremenska prognoza uživo',
    'Trenutno stanje metroa, štrajkovi, radovi i zatvorene stanice',
    'GPS navigacija i prava mapa (Apple Mape / Google Mape)',
    'Aktuelno radno vreme lokala i rezervacije',
    'Kupovina karata za Ajfelovu kulu i muzeje',
    'Prevođenje i izgovor zvukom'
  ]
};
