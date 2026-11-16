export interface Phrase {
  id: string;
  fr: string;
  pron: string;
  sr: string;
  note?: string;
  top?: boolean; // prikazuje se na stranici „Treba mi pomoć”
}

export interface PhraseCategory {
  id: string;
  title: string;
  phrases: Phrase[];
}

export const PRONUNCIATION_KEY = [
  'Izgovor je napisan našim slovima i približan je — Francuzi će vas razumeti.',
  '„ö” izgovorite kao „e” sa zaokruženim usnama (kao u nemačkom „schön”).',
  'Francusko „u” pišemo kao „i” (kao u srpskoj transkripciji: Rue = Ri).',
  'Na kraju reči sa „-an, -on, -en” slovo „n” se jedva čuje — izgovara se kroz nos.',
  'Naglasak je uvek na poslednjem slogu: mer-SI, bon-ŽUR.',
  '„r” je grleno, ali obično „r” je sasvim u redu.'
];

export const PHRASES: PhraseCategory[] = [
  {
    id: 'osnovno',
    title: 'Opšte',
    phrases: [
      { id: 'b1', fr: 'Bonjour !', pron: 'bonžur', sr: 'Dobar dan / Zdravo', note: 'Uvek recite pri ulasku u radnju, kafić ili autobus — veoma važno u Francuskoj.', top: true },
      { id: 'b2', fr: 'Bonsoir !', pron: 'bonsoar', sr: 'Dobro veče', note: 'Koristi se od oko 18h.' },
      { id: 'b3', fr: 'Au revoir !', pron: 'o revoar', sr: 'Doviđenja' },
      { id: 'b4', fr: 'Bonne journée ! / Bonne soirée !', pron: 'bon žurne / bon soare', sr: 'Prijatan dan! / Prijatno veče!' },
      { id: 'b5', fr: 'Merci (beaucoup) !', pron: 'mersi (boku)', sr: 'Hvala (puno)', top: true },
      { id: 'b6', fr: 'S’il vous plaît', pron: 'sil vu ple', sr: 'Molim vas', top: true },
      { id: 'b7', fr: 'Excusez-moi', pron: 'ekskize moa', sr: 'Izvinite (da privučete pažnju)', top: true },
      { id: 'b8', fr: 'Pardon / Désolé(e)', pron: 'pardon / dezole', sr: 'Pardon / Žao mi je' },
      { id: 'b9', fr: 'Oui / Non', pron: 'ui / non', sr: 'Da / Ne' },
      { id: 'b10', fr: 'Je ne comprends pas', pron: 'že ne kompran pa', sr: 'Ne razumem', top: true },
      { id: 'b11', fr: 'Je ne parle pas bien français', pron: 'že ne parl pa bjen franse', sr: 'Ne govorim dobro francuski' },
      { id: 'b12', fr: 'Vous parlez anglais ?', pron: 'vu parle angle?', sr: 'Govorite li engleski?', top: true },
      { id: 'b13', fr: 'Vous pouvez répéter, plus lentement ?', pron: 'vu puve repete, pli lantman?', sr: 'Možete li da ponovite, sporije?' },
      { id: 'b14', fr: 'D’accord', pron: 'dakor', sr: 'U redu / Važi' },
      { id: 'b15', fr: 'Pas de problème', pron: 'pa de problem', sr: 'Nema problema' },
      { id: 'b16', fr: 'Enchanté(e)', pron: 'anšante', sr: 'Drago mi je' },
      { id: 'b17', fr: 'Nous sommes serbes', pron: 'nu som serb', sr: 'Mi smo iz Srbije' },
      { id: 'b18', fr: 'Ça va ?  — Ça va bien, merci !', pron: 'sa va? — sa va bjen, mersi', sr: 'Kako ste? — Dobro, hvala!' }
    ]
  },
  {
    id: 'restoran',
    title: 'Restoran i vino',
    phrases: [
      { id: 'r1', fr: 'Une table pour deux, s’il vous plaît', pron: 'in tabl pur dö, sil vu ple', sr: 'Sto za dvoje, molim vas' },
      { id: 'r2', fr: 'On peut s’asseoir ici ?', pron: 'on pö sasoar isi?', sr: 'Možemo li da sednemo ovde?' },
      { id: 'r3', fr: 'Nous avons réservé au nom de…', pron: 'nu zavon rezerve o nom de…', sr: 'Imamo rezervaciju na ime…' },
      { id: 'r4', fr: 'On peut voir la carte ?', pron: 'on pö voar la kart?', sr: 'Možemo li da vidimo jelovnik?' },
      { id: 'r5', fr: 'Qu’est-ce que vous nous conseillez ?', pron: 'keske vu nu konseje?', sr: 'Šta nam preporučujete?' },
      { id: 'r6', fr: 'Deux verres de vin rouge, s’il vous plaît', pron: 'dö ver de ven ruž, sil vu ple', sr: 'Dve čaše crnog vina, molim' },
      { id: 'r7', fr: 'Deux verres de vin blanc, s’il vous plaît', pron: 'dö ver de ven blan, sil vu ple', sr: 'Dve čaše belog vina, molim' },
      { id: 'r8', fr: 'Un pichet de vin rouge, s’il vous plaît', pron: 'en piše de ven ruž, sil vu ple', sr: 'Bokal crnog vina, molim', note: 'Pichet = kućno vino u bokalu (25 ili 50 cl), najpovoljnije.' },
      { id: 'r9', fr: 'Le vin de la maison', pron: 'le ven de la mezon', sr: 'Kućno vino' },
      { id: 'r10', fr: 'On peut avoir de l’eau ?', pron: 'on pö avoar de lo?', sr: 'Možemo li dobiti vodu?' },
      { id: 'r11', fr: 'Une carafe d’eau, s’il vous plaît', pron: 'in karaf do, sil vu ple', sr: 'Bokal (besplatne) vode iz česme, molim', note: 'Česmenska voda je u Parizu besplatna i bezbedna.', top: true },
      { id: 'r12', fr: 'Le plat du jour', pron: 'le pla di žur', sr: 'Jelo dana' },
      { id: 'r13', fr: 'La formule du midi', pron: 'la formil di midi', sr: 'Podnevni meni (povoljniji)' },
      { id: 'r14', fr: 'Bien cuit / À point / Saignant', pron: 'bjen kui / a poen / senjan', sr: 'Dobro pečeno / Srednje / Krvavo' },
      { id: 'r15', fr: 'Je suis allergique à…', pron: 'že sui aleržik a…', sr: 'Alergičan/na sam na…' },
      { id: 'r16', fr: 'Santé !', pron: 'sante!', sr: 'Živeli!' },
      { id: 'r17', fr: 'C’était délicieux !', pron: 'sete delisjö!', sr: 'Bilo je ukusno!' },
      { id: 'r18', fr: 'L’addition, s’il vous plaît', pron: 'ladisjon, sil vu ple', sr: 'Račun, molim', note: 'Konobar neće doneti račun dok ga ne tražite — to je ljubaznost, ne sporost.', top: true },
      { id: 'r19', fr: 'On peut payer par carte ?', pron: 'on pö peje par kart?', sr: 'Možemo li platiti karticom?' },
      { id: 'r20', fr: 'Le service est compris ?', pron: 'le servis e kompri?', sr: 'Da li je napojnica uračunata?' },
      { id: 'r21', fr: 'Deux cafés, s’il vous plaît', pron: 'dö kafe, sil vu ple', sr: 'Dva espresa, molim', note: '„Un café” je uvek espreso.' },
      { id: 'r22', fr: 'Un café crème / Un café allongé', pron: 'en kafe krem / en kafe alonže', sr: 'Kafa sa mlekom / Produženi espreso' },
      { id: 'r23', fr: 'Une baguette tradition et deux croissants', pron: 'in baget tradisjon e dö kroasan', sr: 'Jedan tradicionalni baget i dva kroasana' },
      { id: 'r24', fr: 'Sur place ou à emporter ?', pron: 'sir plas u a anporte?', sr: 'Ovde ili za poneti?' }
    ]
  },
  {
    id: 'prevoz',
    title: 'Po gradu',
    phrases: [
      { id: 't1', fr: 'Où est la station de métro ?', pron: 'u e la stasjon de metro?', sr: 'Gde je stanica metroa?', top: true },
      { id: 't2', fr: 'Comment aller à la tour Eiffel ?', pron: 'koman ale a la tur efel?', sr: 'Kako da stignem do Ajfelove kule?' },
      { id: 't3', fr: 'C’est quelle direction ?', pron: 'se kel direksjon?', sr: 'Koji je smer?' },
      { id: 't4', fr: 'C’est le bon métro pour… ?', pron: 'se le bon metro pur…?', sr: 'Da li je ovo pravi metro za…?' },
      { id: 't5', fr: 'Où est-ce que je change de ligne ?', pron: 'u eske že šanž de linj?', sr: 'Gde presedam na drugu liniju?' },
      { id: 't6', fr: 'Où est la sortie ?', pron: 'u e la sorti?', sr: 'Gde je izlaz?' },
      { id: 't7', fr: 'Je suis perdu / perdue', pron: 'že sui perdi', sr: 'Izgubio/la sam se', top: true },
      { id: 't8', fr: 'Vous pouvez m’aider, s’il vous plaît ?', pron: 'vu puve mede, sil vu ple?', sr: 'Možete li mi pomoći, molim vas?', top: true },
      { id: 't9', fr: 'C’est loin ? On peut y aller à pied ?', pron: 'se loen? on pö i ale a pje?', sr: 'Da li je daleko? Može li peške?' },
      { id: 't10', fr: 'À gauche / À droite / Tout droit', pron: 'a goš / a droat / tu droa', sr: 'Levo / Desno / Pravo' },
      { id: 't11', fr: 'Je voudrais aller à cette adresse', pron: 'že vudre ale a set adres', sr: 'Želeo/la bih da idem na ovu adresu', top: true },
      { id: 't12', fr: 'Un taxi, s’il vous plaît', pron: 'en taksi, sil vu ple', sr: 'Taksi, molim' },
      { id: 't13', fr: 'Combien ça coûte jusqu’à… ?', pron: 'kombjen sa kut žiska…?', sr: 'Koliko košta do…?' },
      { id: 't14', fr: 'Où sont les toilettes ?', pron: 'u son le toalet?', sr: 'Gde je toalet?', top: true },
      { id: 't15', fr: 'Quelle heure est-il ?', pron: 'kel ör e til?', sr: 'Koliko je sati?' },
      { id: 't16', fr: 'Où est la boulangerie la plus proche ?', pron: 'u e la bulanžri la pli proš?', sr: 'Gde je najbliža pekara?' },
      { id: 't17', fr: 'C’est ouvert ? Vous fermez à quelle heure ?', pron: 'se tuver? vu ferme a kel ör?', sr: 'Da li je otvoreno? Do kada radite?' },
      { id: 't18', fr: 'Deux tickets de métro, s’il vous plaît', pron: 'dö tike de metro, sil vu ple', sr: 'Dve karte za metro, molim' },
      { id: 't19', fr: 'Vous pouvez nous prendre en photo ?', pron: 'vu puve nu prandr an foto?', sr: 'Možete li da nas slikate?' },
      { id: 't20', fr: 'C’est par ici ?', pron: 'se par isi?', sr: 'Da li je ovuda?' },
      { id: 't21', fr: 'Nous habitons près du métro Jourdain', pron: 'nu zabiton pre di metro žurden', sr: 'Stanujemo blizu metroa Jourdain' },
      { id: 't22', fr: 'Il y a un distributeur près d’ici ?', pron: 'il ja en distribitör pre disi?', sr: 'Ima li bankomat u blizini?' }
    ]
  },
  {
    id: 'hrana',
    title: 'Hrana — šta probati',
    phrases: [
      { id: 'h1', fr: 'Un croissant', pron: 'en kroasan', sr: 'Kroasan — lisnato pecivo sa puterom', note: 'Najbolji je ujutru, topao, iz prave pekare (boulangerie).' },
      { id: 'h2', fr: 'Un pain au chocolat', pron: 'en pen o šokola', sr: 'Lisnato pecivo sa čokoladom' },
      { id: 'h3', fr: 'Une baguette tradition', pron: 'in baget tradisjon', sr: 'Tradicionalni baget — hrskav, mekan iznutra' },
      { id: 'h4', fr: 'Un jambon-beurre', pron: 'en žambon bör', sr: 'Baget sa šunkom i puterom — klasičan pariski sendvič', note: 'Jeftin i odličan ručak u hodu.' },
      { id: 'h5', fr: 'Un croque-monsieur / croque-madame', pron: 'en krok mesjö / krok madam', sr: 'Topli sendvič sa šunkom, sirom i bešamelom (madame — sa jajetom)' },
      { id: 'h6', fr: 'Une soupe à l’oignon', pron: 'in sup a lonjon', sr: 'Čorba od luka sa hlebom i zapečenim sirom', note: 'Savršena za hladno novembarsko veče.' },
      { id: 'h7', fr: 'Un steak frites', pron: 'en stek frit', sr: 'Biftek sa pomfritom' },
      { id: 'h8', fr: 'Un confit de canard', pron: 'en konfi de kanar', sr: 'Pačji batak pečen u sopstvenoj masti, hrskav', note: 'Jedno od najboljih jela u bistroima.' },
      { id: 'h9', fr: 'Un magret de canard', pron: 'en magre de kanar', sr: 'Pačja prsa, obično ružičasta u sredini' },
      { id: 'h10', fr: 'Un bœuf bourguignon', pron: 'en böf burginjon', sr: 'Junetina dugo kuvana u crnom vinu' },
      { id: 'h11', fr: 'Des escargots', pron: 'de zeskargo', sr: 'Puževi u puteru sa belim lukom i peršunom', note: 'Probajte bar jednom — ukus je uglavnom puter i beli luk.' },
      { id: 'h12', fr: 'Des moules-frites', pron: 'de mul frit', sr: 'Dagnje sa pomfritom' },
      { id: 'h13', fr: 'Une quiche lorraine', pron: 'in kiš loren', sr: 'Slana pita sa jajima, pavlakom i slaninom' },
      { id: 'h14', fr: 'Une galette complète', pron: 'in galet komplet', sr: 'Heljdina palačinka sa šunkom, sirom i jajetom', note: 'Uz nju: „une bolée de cidre” (in bole de sidr) — šolja jabukovače.' },
      { id: 'h15', fr: 'Une crêpe au sucre', pron: 'in krep o sikr', sr: 'Slatka palačinka sa šećerom (i puterom)' },
      { id: 'h16', fr: 'Une planche mixte', pron: 'in planš mikst', sr: 'Daska sireva i suhomesnatog — idealna uz vino' },
      { id: 'h17', fr: 'Comté, camembert, brie, roquefort', pron: 'konte, kamamber, bri, rokfor', sr: 'Francuski sirevi — od blagog (comté) do jakog (roquefort)' },
      { id: 'h18', fr: 'Un tartare de bœuf', pron: 'en tartar de böf', sr: 'Sirova seckana junetina sa začinima', note: 'Pažnja: meso je sirovo.' },
      { id: 'h19', fr: 'Une crème brûlée', pron: 'in krem brile', sr: 'Krem od vanile sa karamelizovanom korom' },
      { id: 'h20', fr: 'Une tarte Tatin', pron: 'in tart taten', sr: 'Obrnuta pita od karamelizovanih jabuka' },
      { id: 'h21', fr: 'Une mousse au chocolat', pron: 'in mus o šokola', sr: 'Čokoladni mus' },
      { id: 'h22', fr: 'Un éclair au café', pron: 'en ekler o kafe', sr: 'Ekler sa filom od kafe' },
      { id: 'h23', fr: 'Des macarons', pron: 'de makaron', sr: 'Šareni kolačići od badema sa filom' },
      { id: 'h24', fr: 'Un chocolat chaud', pron: 'en šokola šo', sr: 'Topla čokolada' },
      { id: 'h25', fr: 'Un vin chaud', pron: 'en ven šo', sr: 'Kuvano vino (zimi)' },
      { id: 'h26', fr: 'Un kir', pron: 'en kir', sr: 'Aperitiv: belo vino sa likerom od crne ribizle' }
    ]
  },
  {
    id: 'kupovina',
    title: 'Kupovina (samo kad mora)',
    phrases: [
      { id: 's1', fr: 'C’est combien ?', pron: 'se kombjen?', sr: 'Koliko košta?' },
      { id: 's2', fr: 'Je n’ai pas besoin de sac', pron: 'že ne pa bezoen de sak', sr: 'Ne treba mi kesa' },
      { id: 's3', fr: 'Non, merci', pron: 'non, mersi', sr: 'Ne, hvala', note: 'Savršeno i za uporne prodavce na ulici.' },
      { id: 's4', fr: 'Je regarde seulement', pron: 'že regard sölman', sr: 'Samo gledam' },
      { id: 's5', fr: 'Je peux payer par carte ?', pron: 'že pö peje par kart?', sr: 'Mogu li da platim karticom?' }
    ]
  },
  {
    id: 'hitno',
    title: 'Hitni slučajevi',
    phrases: [
      { id: 'e1', fr: 'Au secours !', pron: 'o sekur!', sr: 'Upomoć!', top: true },
      { id: 'e2', fr: 'Appelez la police, s’il vous plaît !', pron: 'aple la polis, sil vu ple!', sr: 'Pozovite policiju, molim vas!', top: true },
      { id: 'e3', fr: 'Appelez une ambulance, s’il vous plaît !', pron: 'aple in ambilans, sil vu ple!', sr: 'Pozovite hitnu pomoć, molim vas!', top: true },
      { id: 'e4', fr: 'J’ai besoin d’aide', pron: 'že bezoen ded', sr: 'Treba mi pomoć', top: true },
      { id: 'e5', fr: 'C’est une urgence', pron: 'se tin iržans', sr: 'Hitno je' },
      { id: 'e6', fr: 'J’ai perdu mon téléphone', pron: 'že perdi mon telefon', sr: 'Izgubio/la sam telefon' },
      { id: 'e7', fr: 'J’ai perdu mon portefeuille', pron: 'že perdi mon portföj', sr: 'Izgubio/la sam novčanik' },
      { id: 'e8', fr: 'On m’a volé mon sac', pron: 'on ma vole mon sak', sr: 'Ukrali su mi torbu' },
      { id: 'e9', fr: 'Je ne sais pas où je loge', pron: 'že ne se pa u že lož', sr: 'Ne znam gde sam smešten/a' },
      { id: 'e10', fr: 'J’ai besoin d’un médecin', pron: 'že bezoen den medsen', sr: 'Treba mi lekar', top: true },
      { id: 'e11', fr: 'Où est la pharmacie la plus proche ?', pron: 'u e la farmasi la pli proš?', sr: 'Gde je najbliža apoteka?' },
      { id: 'e12', fr: 'Où est l’hôpital ?', pron: 'u e lopital?', sr: 'Gde je bolnica?' },
      { id: 'e13', fr: 'Je suis malade', pron: 'že sui malad', sr: 'Bolestan/na sam' }
    ]
  }
];

export const ALL_PHRASES: (Phrase & { category: string })[] = PHRASES.flatMap((c) =>
  c.phrases.map((p) => ({ ...p, category: c.title }))
);

export const emergencyMessage = (address: string) =>
  `Bonjour, j’ai besoin d’aide, s’il vous plaît. Nous sommes deux touristes serbes et nous ne parlons pas bien français. ` +
  (address ? `Notre adresse à Paris est : ${address}. ` : '') +
  `Pouvez-vous nous aider ou appeler le 112 ? Merci beaucoup.`;

export const emergencyMessageSr =
  'Dobar dan, treba mi pomoć. Nas dvoje smo turisti iz Srbije i ne govorimo dobro francuski. Naša adresa u Parizu je: … Možete li da nam pomognete ili da pozovete 112? Hvala puno.';

export const taxiMessage = 'Bonjour ! Je voudrais aller à cette adresse, s’il vous plaît.';
