// Aerodromski asistent. Sve cene i trajanja su PROCENE iz javnih izvora (provereno 4. nov. 2026).
// Nema reda vožnje uživo.

export type AirportCode = 'CDG' | 'ORY' | 'BVA';

export interface AirportStep {
  line: string; // 'walk' | 'RER B' | '14' | '11' | '1' | '2' | 'bus' | 'taxi'
  text: string;
}

export interface AirportOption {
  id: string;
  title: string;
  mode: string;
  from: string;
  to: string;
  transfers: string;
  duration: string;
  price: string;
  steps: AirportStep[];
  alternative: string;
  note?: string;
}

export interface AirportData {
  code: AirportCode;
  name: string;
  short: string;
  terminals: string;
  options: AirportOption[];
  returnTip: string;
}

export const PRICES_CHECKED = '4. novembar 2026.';

export const PRICE_NOTES = [
  'Karta „Paris Région <> Aéroports”: 14 € po osobi (zvanični RATP tarif od 1. 1. 2026). Važi za RER B do CDG i metro 14 / Orlyval do Orlyja. Obična metro karta (2,55 €) NE važi za aerodrome.',
  'Fiksne cene zvaničnog taksija (Paris intra-muros, u oba smera): CDG ↔ desna obala 56 €, Orly ↔ desna obala 45 €. Naš smeštaj (19. arondisman) je na desnoj obali.',
  'Roissybus (Opéra ↔ CDG) je ukinut 1. marta 2026 — ne oslanjajte se na stare vodiče.',
  'Cene su procene za 2026. i mogu se promeniti. Za dvoje računajte duplo (osim taksija — cena je po vozilu).'
];

export const AIRPORTS: AirportData[] = [
  {
    code: 'CDG',
    name: 'Charles de Gaulle (Roissy)',
    short: 'CDG',
    terminals: 'RER B ima dve stanice: „Aéroport CDG 1” (terminali 1 i 3) i „Aéroport CDG 2 – TGV” (terminal 2). Između terminala vozi besplatan voz CDGVAL.',
    options: [
      {
        id: 'cdg-rer',
        title: 'RER B + metro 11',
        mode: 'Voz RER B, pa metro',
        from: 'Aéroport CDG 1 ili CDG 2',
        to: 'Jourdain (linija 11)',
        transfers: '1 presedanje: Châtelet – Les Halles (RER B → metro 11)',
        duration: 'oko 65–80 min (procena)',
        price: '14 € po osobi — aerodromska karta (procena: pokriva i presedanje u metrou; proverite pri kupovini)',
        steps: [
          { line: 'RER B', text: 'Pratite znak „Trains / RER B — Paris”. Kupite kartu „Paris Région <> Aéroports” na automatu. Voz ka Parizu (smer Paris / Massy / Saint-Rémy-lès-Chevreuse).' },
          { line: 'RER B', text: 'Vozite se do Châtelet – Les Halles (oko 35–40 min).' },
          { line: 'walk', text: 'Presedanje: pratite znak „Correspondance — ligne 11”. Hodnik je dugačak (5–10 min sa koferima).' },
          { line: '11', text: 'Linija 11 (braon), smer Rosny–Bois-Perrier, 8 stanica do Jourdain.' },
          { line: 'walk', text: 'Izlaz „Rue Lassus” ili kod crkve — smeštaj je na par minuta.' }
        ],
        alternative: 'Ako RER B ne vozi ili vozi retko: zvanični taksi sa stajališta „Taxis” (fiksno 56 € do desne obale). Ili presedanje već na Gare du Nord: peške do metroa La Chapelle → linija 2 smer Nation → Belleville → linija 11 → Jourdain.'
      },
      {
        id: 'cdg-taxi',
        title: 'Zvanični taksi',
        mode: 'Taksi (fiksna cena)',
        from: 'Stajalište „Taxis” ispred terminala',
        to: 'Vrata smeštaja',
        transfers: 'Bez presedanja',
        duration: 'oko 40–70 min, zavisi od gužve (procena)',
        price: '56 € fiksno po vozilu (desna obala)',
        steps: [
          { line: 'taxi', text: 'Pratite znak „Taxis”. Uzmite taksi SAMO sa zvaničnog reda (krovni znak „TAXI PARISIEN”).' },
          { line: 'taxi', text: 'Pokažite taksi karticu iz aplikacije (Više → Taksi kartica) i recite: „Forfait rive droite, s’il vous plaît.”' }
        ],
        alternative: 'Ako je red za taksi predug: RER B (gore).',
        note: 'Ne prihvatajte ponude ljudi koji vam priđu u terminalu nudeći „taxi”.'
      }
    ],
    returnTip: 'Za povratni let krenite od kuće najmanje 3 sata pre poletanja (put ~1h15 + rezerva za RER B + bezbednosna kontrola).'
  },
  {
    code: 'ORY',
    name: 'Orly',
    short: 'ORY',
    terminals: 'Terminali Orly 1–4 su povezani. Metro 14 staje na stanici „Aéroport d’Orly” između terminala.',
    options: [
      {
        id: 'ory-m14',
        title: 'Metro 14 + metro 11',
        mode: 'Metro',
        from: 'Aéroport d’Orly (linija 14)',
        to: 'Jourdain (linija 11)',
        transfers: '1 presedanje: Châtelet (14 → 11)',
        duration: 'oko 55–70 min (procena)',
        price: '14 € po osobi — aerodromska karta (procena: pokriva i presedanje; proverite pri kupovini)',
        steps: [
          { line: '14', text: 'Pratite znak „Métro 14”. Linija 14 (ljubičasta), smer Saint-Denis Pleyel. Do Châtelet oko 25–30 min.' },
          { line: 'walk', text: 'U Châtelet pratite „Correspondance — ligne 11”.' },
          { line: '11', text: 'Linija 11 (braon), smer Rosny–Bois-Perrier, 8 stanica do Jourdain.' },
          { line: 'walk', text: 'Izlaz kod crkve / Rue Lassus — par minuta do smeštaja.' }
        ],
        alternative: 'Ako metro 14 ne radi: zvanični taksi (fiksno 45 € do desne obale) ili Orlyval + RER B (proverite stanje na licu mesta).'
      },
      {
        id: 'ory-taxi',
        title: 'Zvanični taksi',
        mode: 'Taksi (fiksna cena)',
        from: 'Stajalište „Taxis”',
        to: 'Vrata smeštaja',
        transfers: 'Bez presedanja',
        duration: 'oko 40–60 min (procena)',
        price: '45 € fiksno po vozilu (desna obala)',
        steps: [{ line: 'taxi', text: 'Samo sa zvaničnog stajališta. Pokažite taksi karticu: „Forfait rive droite, s’il vous plaît.”' }],
        alternative: 'Metro 14 (gore) — brz i pouzdan.'
      }
    ],
    returnTip: 'Krenite od kuće najmanje 2h45–3h pre poletanja.'
  },
  {
    code: 'BVA',
    name: 'Beauvais-Tillé',
    short: 'BVA',
    terminals: 'Mali aerodrom ~85 km od Pariza. Autobus (Aérobus) staje ispred terminala.',
    options: [
      {
        id: 'bva-bus',
        title: 'Aérobus + metro 1 + metro 11',
        mode: 'Autobus, pa metro',
        from: 'Aerodrom Beauvais',
        to: 'Jourdain (linija 11)',
        transfers: '2 presedanja: Porte Maillot (bus → metro 1), Châtelet (1 → 11)',
        duration: 'oko 2h – 2h30 ukupno (autobus oko 1h15–1h30, procena)',
        price: 'Autobus oko 17,90 € online / 18 € na licu mesta po osobi + metro karta 2,55 € (procena 2026)',
        steps: [
          { line: 'bus', text: 'Aérobus do Paris – Porte Maillot. Karta online ili na šalteru. Vreme polaska zavisi od letova.' },
          { line: '1', text: 'Metro 1 (žuta) sa Porte Maillot, smer Château de Vincennes, 10 stanica do Châtelet.' },
          { line: 'walk', text: 'U Châtelet pratite „Correspondance — ligne 11”.' },
          { line: '11', text: 'Linija 11, smer Rosny–Bois-Perrier, 8 stanica do Jourdain.' }
        ],
        alternative: 'Taksi iz Beauvais-a nema fiksnu cenu i veoma je skup. Ako autobus kasni, sačekajte sledeći (prate dolaske letova). Neki izvori pominju i stajalište u La Villette — proverite na sajtu aerodroma pre puta.'
      }
    ],
    returnTip: 'Autobus za Beauvais polazi sa Porte Maillot nekoliko sati pre leta — proverite raspored prevoznika dok imate internet i računajte još ~45 min od kuće do Porte Maillot.'
  }
];

// Obaveštenje koje je korisnik prosledio (prema RATP-u). NIJE informacija uživo.
export const NOV5_NOTICE = {
  date: '2026-11-05',
  title: 'Obaveštenje za četvrtak, 5. novembar 2026.',
  source: 'Prema RATP obaveštenju ažuriranom 4. novembra 2026. u 20:00',
  checked: '4. novembar 2026, 20:00',
  points: [
    'Očekuje se redovan metro, sa izuzetkom određenih zatvorenih stanica zbog demonstracija.',
    'RER B na severnoj deonici između Gare du Nord i aerodroma CDG: očekivano jedan voz od dva.',
    'Postoje najave mogućih poremećaja avionskog saobraćaja.'
  ],
  disclaimer: 'Ovo NIJE informacija uživo i može se promeniti. Dok imate internet, proverite aplikaciju Bonjour RATP, sajt ratp.fr i status svog leta.'
};
