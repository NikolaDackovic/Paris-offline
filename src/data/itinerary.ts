export type ItemKind = 'setnja' | 'hrana' | 'vino' | 'kafa' | 'znamenitost' | 'metro' | 'odmor';

export interface PlanItem {
  id: string;
  time: string;
  title: string;
  text: string;
  kind: ItemKind;
  placeId?: string;
  routeId?: string;
}

export interface PlanDay {
  id: string;
  date: string;
  dayLabel: string;
  weekday: string;
  title: string;
  theme: string;
  intro: string;
  walking: string;
  items: PlanItem[];
  tips: string[];
  dinnerPlaceIds: string[];
}

export const DAYS: PlanDay[] = [
  {
    id: 'd1',
    date: '2026-11-05',
    dayLabel: 'Dan 1',
    weekday: 'četvrtak',
    title: 'Jourdain, Belleville i Buttes-Chaumont',
    theme: 'Upoznajte svoj kraj i pravi, lokalni Pariz',
    intro:
      'Lagan prvi dan bez metroa i žurbe. Sve je na pešačkoj udaljenosti od smeštaja: mali trgovi, pekare, najlepši park istočnog Pariza i pogled na ceo grad.',
    walking: 'oko 6–8 km ukupno, uz mnogo pauza (procena)',
    items: [
      {
        id: 'd1-1',
        time: '09:30',
        title: 'Doručak u komšiluku',
        text: 'Croissant i café crème u nekoj od pekara (boulangerie) na Rue de Belleville ili Rue du Jourdain. Uzmite i jednu „baguette tradition” za kasnije. Pozdravite sa „Bonjour!” čim uđete.',
        kind: 'kafa'
      },
      {
        id: 'd1-2',
        time: '10:30',
        title: 'Šetnja Jourdainom',
        text: 'Crkva Saint-Jean-Baptiste de Belleville (neogotika, odmah kod metroa), pa mala Rue du Jourdain sa kafićima, sirarom i pijačnim tezgama. Polako — ovo je vaš kraj ova četiri dana.',
        kind: 'setnja'
      },
      {
        id: 'd1-3',
        time: '11:15',
        title: 'Skriveni kvart La Mouzaïa (opciono)',
        text: 'Oko 15 min hoda severoistočno (kod metroa Danube/Botzaris): uske „villas” — popločane uličice sa malim kućama i baštama, kao selo usred Pariza. Budite tihi, ljudi tu žive.',
        kind: 'setnja'
      },
      {
        id: 'd1-4',
        time: '12:30',
        title: 'Ručak: Paloma ili L’Artisan Libanais',
        text: 'Paloma (Rue Julien-Lacroix) je poznata po povoljnom podnevnom meniju radnim danima — dođite rano ili rezervišite. Alternativa: libanski meze u L’Artisan Libanais na Rue de Belleville.',
        kind: 'hrana',
        placeId: 'paloma'
      },
      {
        id: 'd1-5',
        time: '14:00',
        title: 'Parc des Buttes-Chaumont',
        text: 'Najromantičniji park istočnog Pariza: litice, jezero, viseći most i hram Temple de la Sibylle na vrhu stene sa pogledom na Montmartre. Ponesite baguette i sedite na klupu.',
        kind: 'znamenitost'
      },
      {
        id: 'd1-6',
        time: '15:30',
        title: 'Butte Bergeyre (skriveno brdo)',
        text: 'Odmah preko puta zapadne strane parka (stepenice sa Rue Manin): mali kvart na brdu sa vinogradom i jednim od najlepših pogleda na Sacré-Cœur. Malo turista.',
        kind: 'setnja'
      },
      {
        id: 'd1-7',
        time: '16:30',
        title: 'Parc de Belleville u sumrak',
        text: 'Šetnja do vrha parka (Rue Piat): terasa sa panoramom celog Pariza i Ajfelovom kulom. Zalazak sunca je oko 17:20 — idealno vreme. Usput pogledajte grafite u Rue Dénoyez.',
        kind: 'znamenitost'
      },
      {
        id: 'd1-8',
        time: '18:00',
        title: 'Apéro: čaša vina u Belleville-u',
        text: 'La Cave de Belleville (Rue de Belleville 51) — vinoteka i bar sa daskom sireva i suhomesnatog. Ili kultni kafić Aux Folies za čašu i posmatranje ulice.',
        kind: 'vino',
        placeId: 'cave-belleville'
      },
      {
        id: 'd1-9',
        time: '19:30',
        title: 'Večera: Le Vieux Belleville',
        text: 'Stari bistro sa harmonikom i šansonama (Piaf!) tik uz Parc de Belleville. Rezervacija je preporučena. Posle večere — oko 15 min hoda do kuće.',
        kind: 'hrana',
        placeId: 'vieux-belleville'
      }
    ],
    tips: [
      'Parc des Buttes-Chaumont se zimi zatvara ranije (orijentaciono oko 20h) — proverite tablu na ulazu.',
      'Rue de Belleville je duga i strma — nizbrdo ka Belleville-u je prijatno, nazad uzbrdo možete metroom 11 (2 stanice).',
      'Ovaj dan je savršen i ako kasnite zbog dolaska — svaku stavku možete preskočiti.'
    ],
    dinnerPlaceIds: ['vieux-belleville', 'artisan-libanais', 'cave-belleville', 'flying-chouette']
  },
  {
    id: 'd2',
    date: '2026-11-06',
    dayLabel: 'Dan 2',
    weekday: 'petak',
    title: 'Montmartre',
    theme: 'Romantični i umetnički Pariz',
    intro:
      'Ruta je kružna i bez vraćanja istim ulicama: penjete se od Anvers do Sacré-Cœur, krstarite vrhom brda, spuštate se pored La Maison Rose i vetrenjača do Abbesses, pa završavate kod Moulin Rouge-a u sumrak.',
    walking: 'oko 6 km sa dosta uspona i stepenica (procena)',
    items: [
      {
        id: 'd2-1',
        time: '09:30',
        title: 'Metro do Anvers',
        text: 'Jourdain → linija 11 (smer Châtelet) → Belleville → presedanje na liniju 2 (smer Porte Dauphine) → Anvers. Vidi karticu rute.',
        kind: 'metro',
        routeId: 'montmartre'
      },
      {
        id: 'd2-2',
        time: '10:00',
        title: 'Sacré-Cœur',
        text: 'Uspon kroz Square Louise-Michel (stepenice ili uspinjača — Funiculaire de Montmartre, koristi običnu metro kartu). Ulaz u baziliku je besplatan; pogled sa stepenica je jedan od najlepših u Parizu.',
        kind: 'znamenitost'
      },
      {
        id: 'd2-3',
        time: '11:00',
        title: 'Place du Tertre',
        text: 'Trg slikara. Pogledajte, ali ne jedite ovde — skupo i turistički. Ljubazno odbijte portretiste: „Non, merci.”',
        kind: 'setnja'
      },
      {
        id: 'd2-4',
        time: '11:30',
        title: 'Rue des Saules, vinograd i Rue de l’Abreuvoir',
        text: 'Rue Norvins → Rue des Saules: vinograd Clos Montmartre i kabare Au Lapin Agile (spolja). Skrenite u Rue de l’Abreuvoir — verovatno najslikovitija ulica na brdu.',
        kind: 'setnja'
      },
      {
        id: 'd2-5',
        time: '12:00',
        title: 'La Maison Rose',
        text: 'Ružičasta kućica sa zelenim kapcima na uglu Rue de l’Abreuvoir i Rue des Saules. Fotografija je obavezna. Odatle Allée des Brouillards i Place Dalida.',
        kind: 'znamenitost'
      },
      {
        id: 'd2-6',
        time: '13:00',
        title: 'Ručak na Rue Lepic',
        text: 'Spuštajte se Rue Lepic pored vetrenjača Moulin Radet i Moulin de la Galette. Ručak u bistrou Un Zèbre à Montmartre ili sendvič iz pekare.',
        kind: 'hrana',
        placeId: 'zebre-montmartre'
      },
      {
        id: 'd2-7',
        time: '14:30',
        title: 'Abbesses i Zid „Volim te”',
        text: 'Place des Abbesses: art nouveau ulaz u metro i Le Mur des je t’aime (Square Jehan-Rictus) — „volim te” na 250 jezika, potražite i srpski. Uzmite baguette u Le Grenier à Pain (Rue des Abbesses 38).',
        kind: 'znamenitost',
        placeId: 'grenier-abbesses'
      },
      {
        id: 'd2-8',
        time: '15:30',
        title: 'Kafa: Café des Deux Moulins',
        text: 'Kafić iz filma „Amelie” (Rue Lepic 15). Odmor za noge i café crème.',
        kind: 'kafa',
        placeId: 'deux-moulins'
      },
      {
        id: 'd2-9',
        time: '16:30',
        title: 'Pigalle i Moulin Rouge (spolja)',
        text: 'Šetnja Boulevard de Clichy do Moulin Rouge-a. Najlepši je kada se upale svetla posle zalaska (≈ 17:20). Ovo je živ kraj — torbe ispred sebe.',
        kind: 'znamenitost'
      },
      {
        id: 'd2-10',
        time: '18:30',
        title: 'Večera na Montmartru ili povratak kući',
        text: 'Le Jardin d’en Face (Rue des Trois Frères) za romantičnu večeru, ili metro iz stanice Blanche (linija 2, smer Nation → Belleville → linija 11 smer Rosny–Bois-Perrier) i večera u svom kraju.',
        kind: 'hrana',
        placeId: 'jardin-den-face'
      }
    ],
    tips: [
      'Na stepenicama ispod Sacré-Cœur-a ljudi nude „besplatne” narukvice od konca — ne pružajte ruku, samo nastavite dalje.',
      'Le Grenier à Pain je prema izvorima zatvoren utorkom i sredom — u petak bi trebalo da radi.',
      'Udobne cipele! Montmartre je brdo sa kaldrmom.'
    ],
    dinnerPlaceIds: ['jardin-den-face', 'zebre-montmartre', 'vieux-belleville']
  },
  {
    id: 'd3',
    date: '2026-11-07',
    dayLabel: 'Dan 3',
    weekday: 'subota',
    title: 'Luvr i istorijski Pariz',
    theme: 'Klasični Pariz i reka Sena',
    intro:
      'Velika šetnja kroz srce Pariza: od piramide Luvra kroz Tuileries do Concorde, pa levom obalom Sene do Pont Neuf-a, Notre-Dame-a i Île Saint-Louis. Završnica uz vino u Marais-u — i direktan metro 11 do kuće.',
    walking: 'oko 8–9 km, ravno, sa puno pauza (procena)',
    items: [
      {
        id: 'd3-1',
        time: '09:30',
        title: 'Metro do Luvra',
        text: 'Jourdain → linija 11 (smer Châtelet) do kraja → Châtelet → linija 1 (smer La Défense) → Palais Royal – Musée du Louvre.',
        kind: 'metro',
        routeId: 'louvre'
      },
      {
        id: 'd3-2',
        time: '10:00',
        title: 'Kafa u vrtu Palais-Royal',
        text: 'Mirni vrt sa arkadama i prugastim stubovima (Colonnes de Buren), na 2 minuta od Luvra. Besplatno i mnogo mirnije od okoline Luvra.',
        kind: 'kafa'
      },
      {
        id: 'd3-3',
        time: '10:45',
        title: 'Piramida i dvorište Luvra',
        text: 'Cour Napoléon sa staklenom piramidom, pa Cour Carrée (unutrašnje dvorište) — u muzej ne morate ulaziti. Najbolja fotografija: sa ivice fontana oko piramide.',
        kind: 'znamenitost'
      },
      {
        id: 'd3-4',
        time: '11:30',
        title: 'Jardin des Tuileries',
        text: 'Kroz Arc du Carrousel u vrt. Zelene metalne stolice oko bazena su besplatne — sedite i odmorite.',
        kind: 'setnja'
      },
      {
        id: 'd3-5',
        time: '12:30',
        title: 'Place de la Concorde',
        text: 'Egipatski obelisk, fontane i pogled niz Champs-Élysées do Trijumfalne kapije.',
        kind: 'znamenitost'
      },
      {
        id: 'd3-6',
        time: '13:00',
        title: 'Lagan ručak',
        text: 'Sendvič iz pekare ili crêpe. Izbegavajte kafiće uz samu Rue de Rivoli kod Luvra (skupo). Napomena: L’As du Fallafel u Marais-u je subotom zatvoren.',
        kind: 'hrana'
      },
      {
        id: 'd3-7',
        time: '14:00',
        title: 'Šetnja levom obalom Sene',
        text: 'Pont de la Concorde → Quai d’Orsay (Musée d’Orsay spolja) → Quai Voltaire sa zelenim tezgama antikvara (bouquinistes) → Pont des Arts.',
        kind: 'setnja'
      },
      {
        id: 'd3-8',
        time: '15:15',
        title: 'Pont Neuf i Île de la Cité',
        text: 'Najstariji most u Parizu. Siđite stepenicama do Square du Vert-Galant (vrh ostrva), pa kroz trouglasti Place Dauphine.',
        kind: 'znamenitost'
      },
      {
        id: 'd3-9',
        time: '16:00',
        title: 'Notre-Dame',
        text: 'Katedrala je ponovo otvorena posle obnove (decembar 2024). Ulaz je besplatan, ali subotom zna da bude red — proverite dužinu reda na licu mesta.',
        kind: 'znamenitost'
      },
      {
        id: 'd3-10',
        time: '17:00',
        title: 'Île Saint-Louis i zalazak',
        text: 'Preko Pont Saint-Louis na mirno ostrvo. Sladoled Berthillon (Rue Saint-Louis-en-l’Île). Sa Pont de la Tournelle — zadnja strana Notre-Dame-a u sumrak (≈ 17:19).',
        kind: 'setnja',
        placeId: 'berthillon'
      },
      {
        id: 'd3-11',
        time: '18:00',
        title: 'Marais',
        text: 'Pont Marie → Rue Saint-Paul → Place des Vosges (najlepši trg Pariza) → Rue des Rosiers.',
        kind: 'setnja'
      },
      {
        id: 'd3-12',
        time: '19:30',
        title: 'Vino i večera u Marais-u',
        text: 'Le Barav — vinski bar sa daskama i čašom vina po pristupačnoj ceni. Ili palačinke (galettes) i jabukovača u Breizh Café (rezervišite). Kući: metro 11 iz Rambuteau ili Arts et Métiers, smer Rosny–Bois-Perrier — direktno do Jourdain.',
        kind: 'vino',
        placeId: 'barav'
      }
    ],
    tips: [
      'Subota je gužva oko Luvra i Notre-Dame-a — torbe ispred sebe, telefon nikad na stolu u kafiću.',
      'Na mostovima izbegavajte „igru sa tri čaše” i ljude sa peticijama — to je prevara.',
      'Ako se umorite: sa Île de la Cité je Hôtel de Ville (linija 11) na 8–10 minuta hoda.'
    ],
    dinnerPlaceIds: ['barav', 'breizh', 'enfants-rouges']
  },
  {
    id: 'd4',
    date: '2026-11-08',
    dayLabel: 'Dan 4',
    weekday: 'nedelja',
    title: 'Ajfelova kula i romantični Pariz',
    theme: 'Najikoničnije pariško iskustvo',
    intro:
      'Polako jutro, pa Trocadéro, Ajfelova kula i ručak na pijačnoj Rue Cler. Popodne šetnja uz Senu do Labudovog ostrva, a zalazak sunca i svetlucanje kule — sa Trocadéra.',
    walking: 'oko 6–7 km (procena)',
    items: [
      {
        id: 'd4-1',
        time: '10:00',
        title: 'Metro do Trocadéra',
        text: 'Jourdain → linija 11 (smer Châtelet) → République → linija 9 (smer Pont de Sèvres) → Trocadéro. Jedno presedanje.',
        kind: 'metro',
        routeId: 'eiffel'
      },
      {
        id: 'd4-2',
        time: '10:45',
        title: 'Trocadéro',
        text: 'Esplanada Palais de Chaillot — klasičan pogled na kulu. Ujutru je najmanje gužve za fotografije.',
        kind: 'znamenitost'
      },
      {
        id: 'd4-3',
        time: '11:15',
        title: 'Jardins du Trocadéro i Pont d’Iéna',
        text: 'Spustite se kroz vrtove pored fontana i pređite most pravo ka kuli.',
        kind: 'setnja'
      },
      {
        id: 'd4-4',
        time: '11:45',
        title: 'Ajfelova kula',
        text: 'Prostor ispod kule ima bezbednosnu kontrolu. Penjanje nije neophodno; ako želite, karte se kupuju unapred na zvaničnom sajtu (potreban internet).',
        kind: 'znamenitost'
      },
      {
        id: 'd4-5',
        time: '12:45',
        title: 'Ručak na Rue Cler',
        text: 'Pešačka pijačna ulica (10 min od kule). Nedeljom pre podne rade sirare, pekare i vinoteke; posle podne mnoge zatvaraju. Ručak u Café du Marché (Rue Cler 38).',
        kind: 'hrana',
        placeId: 'cafe-du-marche'
      },
      {
        id: 'd4-6',
        time: '14:15',
        title: 'Champ de Mars',
        text: 'Šetnja kroz park od kule ka Ecole Militaire i nazad. Pauza na travi ako vreme dozvoli.',
        kind: 'odmor'
      },
      {
        id: 'd4-7',
        time: '15:00',
        title: 'Sena i Labudovo ostrvo',
        text: 'Pont de Bir-Hakeim (most sa dva nivoa, poznat iz filmova) → Allée des Cygnes, uzana staza na ostrvu usred Sene do male Statue slobode. Mirno i lokalno.',
        kind: 'setnja'
      },
      {
        id: 'd4-8',
        time: '16:45',
        title: 'Zalazak sunca kod kule',
        text: 'Vratite se ka Trocadéru ili Pont d’Iéna za zalazak (≈ 17:17). Kada padne mrak, kula svetluca 5 minuta na svaki pun sat — prvi put verovatno oko 18:00.',
        kind: 'znamenitost'
      },
      {
        id: 'd4-9',
        time: '18:30',
        title: 'Opušteno veče: Rue Cler',
        text: 'Večera u Le Petit Cler ili Café du Marché (proverite da li radi nedeljom uveče). Kući: École Militaire → linija 8 (smer Pointe du Lac) → République → linija 11 (smer Rosny–Bois-Perrier) → Jourdain.',
        kind: 'hrana',
        placeId: 'petit-cler'
      }
    ],
    tips: [
      'Kod kule muškarci prodaju minijaturne kule i pitaju „Do you speak English?” uz peticiju — ne zaustavljajte se.',
      'Nedelja: mnoge radnje i neki restorani ne rade. Plan za večeru imajte unapred.',
      'Opcija: krstarenje Senom sa pristaništa kod kule (oko 1h). Cene proverite na licu mesta.'
    ],
    dinnerPlaceIds: ['petit-cler', 'cafe-du-marche']
  }
];

export const DEPARTURE_DATE = '2026-11-09';

export const DEPARTURE_CHECKS: { id: string; label: string }[] = [
  { id: 'dep-checkout', label: 'Proveriti vreme odjave (check-out) i dogovor sa domaćinom za ključeve' },
  { id: 'dep-rooms', label: 'Proći kroz sve sobe, fioke, kupatilo i punjače u utičnicama' },
  { id: 'dep-passport', label: 'Pasoši i lična dokumenta' },
  { id: 'dep-tickets', label: 'Avionske karte / boarding pass (sačuvan i offline)' },
  { id: 'dep-luggage', label: 'Prtljag spakovan; tečnosti do 100 ml u providnoj kesi' },
  { id: 'dep-wine', label: 'Vino i hrana iz Pariza — u predatom prtljagu, dobro umotano' },
  { id: 'dep-phone', label: 'Telefon napunjen, punjači i power bank (power bank ide u ručni prtljag)' },
  { id: 'dep-cash', label: 'Navigo Easy kartica / metro karte za put do aerodroma' },
  { id: 'dep-transport', label: 'Isplaniran put do aerodroma (vreme polaska + rezerva)' },
  { id: 'dep-trash', label: 'Smeće izneto, stan ostavljen uredno' },
  { id: 'dep-backup', label: 'Izvezena rezervna kopija podataka iz aplikacije (Više → Podešavanja)' }
];

export const AIRPORT_INFO = [
  {
    name: 'Charles de Gaulle (CDG)',
    text: 'RER B iz Gare du Nord (smer Aéroport Charles de Gaulle). Od Jourdain: linija 11 → Belleville → linija 2 (smer Porte Dauphine) → La Chapelle, pa podzemnim prolazom do Gare du Nord. Ili jednostavnije: linija 11 do Châtelet pa RER B direktno. Ukupno oko 1h–1h20 (procena). Roissybus je ukinut u martu 2026.'
  },
  {
    name: 'Orly (ORY)',
    text: 'Metro linija 14 vozi direktno do aerodroma Orly (od 2024). Od Jourdain: linija 11 do Châtelet → linija 14 (smer Aéroport d’Orly). Ukupno oko 50–60 min (procena).'
  },
  {
    name: 'Beauvais (BVA)',
    text: 'Autobus (shuttle) sa Porte Maillot, vožnja oko 1h15 bez gužve. Polazak planirajte veoma rano i kupite kartu unapred.'
  },
  {
    name: 'Karta za aerodrom',
    text: 'Za CDG i Orly važi aerodromska karta „Paris Région <> Aéroports” — 14 € po osobi (tarif 2026). Obična metro karta (2,55 €) nije dovoljna. Detalji: Više → Aerodrom.'
  }
];
