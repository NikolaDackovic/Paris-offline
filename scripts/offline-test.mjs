// Automatski test: produkcioni build, service worker, offline rad, čuvanje podataka,
// pretraga fraza i provera da nema spoljnih mrežnih zahteva.
// Pokretanje: npm run build && npm run test:offline   (opciono: BROWSERS=chromium,webkit)
import { spawn, execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { chromium, webkit } from 'playwright';

const PORT = 4173;
const BASE = `http://localhost:${PORT}/`;
const browsers = (process.env.BROWSERS || 'chromium,webkit').split(',');
const SHOTS = 'screenshots';
mkdirSync(SHOTS, { recursive: true });

const results = [];
const check = (name, ok, extra = '') => {
  results.push({ name, ok, extra });
  console.log(`${ok ? '  ✓' : '  ✗'} ${name}${extra ? ' — ' + extra : ''}`);
};

function startServer() {
  const proc = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: process.platform === 'win32'
  });
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('Server se nije pokrenuo')), 30000);
    proc.stdout.on('data', (d) => {
      if (String(d).includes(String(PORT))) {
        clearTimeout(t);
        resolve(proc);
      }
    });
    proc.stderr.on('data', (d) => process.stderr.write(d));
  });
}

const ROUTES = [
  ['danas', 'Pariz'],
  ['plan/d1', 'Buttes-Chaumont'],
  ['plan/d2', 'Montmartre'],
  ['plan/d3', 'Luvr'],
  ['plan/d4', 'Ajfelova kula'],
  ['plan/polazak', 'Dan polaska'],
  ['francuski', 'Francuski'],
  ['pomoc', 'Treba mi pomoć'],
  ['troskovi', 'Troškovi'],
  ['vise', 'Više'],
  ['kuca', 'Kako do kuće'],
  ['vise/prevoz', 'Metro i prevoz'],
  ['vise/prevoz/montmartre', 'Anvers'],
  ['vise/prevoz/louvre', 'Palais Royal'],
  ['vise/prevoz/eiffel', 'Trocadéro'],
  ['vise/prevoz/notre-dame', 'Hôtel de Ville'],
  ['vise/prevoz/belleville', 'Belleville'],
  ['vise/prevoz/canal', 'Jaurès'],
  ['vise/restorani', 'Gde jesti i piti'],
  ['vise/restorani/paloma', 'Rue Julien-Lacroix'],
  ['vise/restorani/vieux-belleville', 'Envierges'],
  ['vise/mapa', 'Smernica oko smeštaja'],
  ['vise/info', 'Korisne informacije'],
  ['vise/pakovanje', 'Lista za pakovanje'],
  ['vise/omiljeno', 'Omiljeno i beleške'],
  ['vise/podesavanja', 'Podešavanja'],
  ['vise/offline', 'Bez interneta'],
  ['taksi', 'Je voudrais aller'],
  // Nadogradnja
  ['sos', 'Travel SOS'],
  ['vise/aerodrom', 'Naši letovi'],
  ['vise/rulet', 'Food roulette'],
  ['francuski/osnovno', 'Bonjour'],
  ['francuski/restoran', 'L’addition'],
  ['francuski/prevoz', 'Où sont les toilettes'],
  ['francuski/hrana', 'Un confit de canard'],
  ['francuski/hitno', 'Au secours']
];

// WebKit na Windowsu ne podnosi page.reload() offline; navigacija na isti URL je ekvivalentna
const hardReload = async (page) => {
  const u = page.url();
  await page.goto('about:blank');
  await page.goto(u, { waitUntil: 'load' });
};

async function run(name, type, mode) {
  console.log(`\n=== ${name} ===`);
  const browser = await type.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone 13 mini
    deviceScaleFactor: name === 'chromium' ? 2 : 1,
    isMobile: name === 'chromium',
    hasTouch: true,
    serviceWorkers: 'allow',
    locale: 'sr-Latn-RS'
  });
  const external = [];
  context.on('request', (req) => {
    const u = req.url();
    if (!u.startsWith(BASE) && !u.startsWith('data:') && !u.startsWith('blob:')) external.push(u);
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));

  // 1) Prvo otvaranje online
  await page.goto(BASE, { waitUntil: 'load' });
  await page.getByText('Sačuvaj i počni').waitFor();
  check('Prvo pokretanje traži adresu', true);
  const prefilled = await page.inputValue('input[autocomplete="street-address"]');
  check('Adresa unapred popunjena (Booking)', prefilled.includes('5 Rue Lassus'), prefilled);
  await page.fill('input[autocomplete="street-address"]', 'Test adresa 1, 75019 Paris');
  await page.getByText('Sačuvaj i počni').click();
  await page.getByText('4 dana u Parizu').first().waitFor();

  // 2) Service worker
  const swOk = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return 'nema podrške';
    const reg = await navigator.serviceWorker.ready;
    return reg.active ? 'aktivan' : 'nije aktivan';
  });
  check('Service worker aktivan', swOk === 'aktivan', swOk);
  // Reload da SW preuzme kontrolu nad stranicom
  await page.reload({ waitUntil: 'load' });
  const controlled = await page.evaluate(() => !!navigator.serviceWorker.controller);
  check('Service worker kontroliše stranicu', controlled);
  const cached = await page.evaluate(async () => {
    const keys = await caches.keys();
    let n = 0;
    for (const k of keys) n += (await (await caches.open(k)).keys()).length;
    return n;
  });
  check('Precache sadrži fajlove', cached >= 10, `${cached} fajlova`);
  await page.getByText('Spremno za offline').first().waitFor({ timeout: 10000 }).then(
    () => check('Prikazuje „Spremno za offline”', true),
    () => check('Prikazuje „Spremno za offline”', false)
  );
  await page.screenshot({ path: `${SHOTS}/${name}-01-danas.png`, fullPage: true });

  // 3) Troškovi — dodavanje
  await page.goto(BASE + '#/troskovi');
  await page.getByText('Dodaj trošak').click();
  await page.fill('.amount-field__input', '12,50');
  await page.getByRole('radio', { name: /Vino/ }).click();
  await page.fill('input[placeholder="npr. Paloma, ručak"]', 'Test vino');
  await page.getByText('Sačuvaj trošak').click();
  await page.getByText('Test vino').waitFor();
  check('Dodavanje troška', true);

  // 4) Pakovanje — checkbox
  await page.goto(BASE + '#/vise/pakovanje');
  await page.getByText('Pasoši').click();

  // 4b) Aerodrom i SOS unosi (čuvanje)
  await page.goto(BASE + '#/vise/aerodrom');
  await page.getByRole('radio', { name: /ORY/ }).click();
  await page.fill('input[placeholder="npr. JU 360"]', 'JU 360');
  await page.fill('input[placeholder="npr. 2E"]', '1');
  await page.locator('input[type="time"]').first().fill('10:45');
  await page.goto(BASE + '#/sos');
  await page.getByText('IZGUBILI SMO TELEFON').click();
  await page.fill('input[placeholder="+381 …"] >> nth=0', '+381 60 000 0000');
  await page.goto(BASE + '#/vise/pakovanje');
  await page.getByText('Pasoši').waitFor();

  // 5) PREBACIVANJE NA OFFLINE
  // chromium: emulacija offline režima; webkit: server se stvarno gasi (Playwright WebKit na Windowsu
  // ne podržava setOffline sa service worker-om) — tada SW mora sam da posluži sve.
  if (mode === 'emulate') await context.setOffline(true);
  else await stopServer();
  await hardReload(page);
  check('Učitavanje bez interneta (reload)', await page.getByText('Lista za pakovanje').first().isVisible());
  const packChecked = await page.locator('.check-row.is-checked', { hasText: 'Pasoši' }).count();
  check('Checklista sačuvana posle reload-a (offline)', packChecked === 1);

  await page.goto(BASE + '#/troskovi', { waitUntil: 'load' });
  await hardReload(page);
  check('Trošak sačuvan posle reload-a (offline)', await page.getByText('Test vino').isVisible());

  // 6) Svi ekrani offline
  let allOk = true;
  for (const [route, text] of ROUTES) {
    await page.goto(BASE + '#/' + route, { waitUntil: 'load' });
    try {
      await page.getByText(text).first().waitFor({ timeout: 5000 });
    } catch {
      allOk = false;
      check(`Ekran #/${route}`, false, `nema teksta „${text}”`);
    }
    const blank = await page.evaluate(() => (document.getElementById('root')?.innerText || '').trim().length < 20);
    if (blank) {
      allOk = false;
      check(`Ekran #/${route} nije prazan`, false);
    }
    if (name === 'chromium') await page.screenshot({ path: `${SHOTS}/${name}-${route.replace(/\//g, '_')}.png`, fullPage: true });
  }
  check(`Svih ${ROUTES.length} ekrana radi offline`, allOk);

  // 7) Hard reload offline na dubokom linku (nova stranica)
  const p2 = await context.newPage();
  await p2.goto(BASE + '#/vise/prevoz/eiffel', { waitUntil: 'load' });
  check('Nova kartica offline (duboki link)', await p2.getByText('Pont de Sèvres').first().isVisible());
  // Taksi kartica prikazuje adresu
  await p2.goto(BASE + '#/taksi');
  check(
    'Taksi kartica prikazuje sačuvanu adresu',
    await p2
      .getByText('Test adresa 1, 75019 Paris')
      .waitFor({ timeout: 5000 })
      .then(() => true, () => false)
  );
  await p2.close();

  // 8) Pretraga fraza
  await page.goto(BASE + '#/francuski');
  await page.fill('.search__input', 'racun');
  const found = await page.getByText('L’addition, s’il vous plaît').first().isVisible();
  check('Pretraga fraza bez dijakritika („racun”)', found);
  await page.fill('.search__input', 'carafe');
  check('Pretraga fraza na francuskom („carafe”)', await page.getByText('Une carafe d’eau').first().isVisible());
  await page.fill('.search__input', 'xyzxyz');
  check('Pretraga bez rezultata prikazuje poruku', await page.getByText('Nema rezultata').isVisible());

  // 9) Izmena troška
  await page.goto(BASE + '#/troskovi');
  await page.getByLabel('Izmeni').first().click();
  await page.fill('.amount-field__input', '20');
  await page.getByText('Sačuvaj izmene').click();
  check('Izmena troška', await page.locator('.exp-row__amt', { hasText: '20,00 €' }).isVisible());

  // ===== NOVE FUNKCIJE (offline) =====
  const ok = (loc) => loc.first().waitFor({ timeout: 5000 }).then(() => true, () => false);

  // Aerodrom: sačuvani unosi + opcije + obaveštenje
  await page.goto(BASE + '#/vise/aerodrom');
  check('Aerodrom: izbor ORY sačuvan offline', (await page.getByRole('radio', { name: /ORY/ }).getAttribute('aria-checked')) === 'true');
  check('Aerodrom: broj leta sačuvan offline', (await page.inputValue('input[placeholder="npr. JU 360"]')) === 'JU 360');
  check('Aerodrom: vreme sletanja sačuvano', (await page.locator('input[type="time"]').first().inputValue()) === '10:45');
  check('Aerodrom: opcija metro 14 + cena označena kao procena', await ok(page.getByText('Metro 14 + metro 11')) && await ok(page.getByText(/14 € po osobi/)));
  check('Aerodrom: alternativa kod poremećaja', await ok(page.getByText('Ako je prevoz poremećen:')));
  check('Aerodrom: obaveštenje za 5. nov. sa vremenom provere', await ok(page.getByText('jedan voz od dva')) && await ok(page.getByText('4. novembar 2026, 20:00')));
  await page.getByRole('radio', { name: /BVA/ }).click();
  check('Aerodrom: Beauvais opcija', await ok(page.getByText('Aérobus + metro 1 + metro 11')));
  await page.getByRole('radio', { name: /CDG/ }).click();
  check('Aerodrom: CDG RER B opcija', await ok(page.getByText('RER B + metro 11')));

  // Plan B + kako stižemo + mapa
  await page.goto(BASE + '#/plan/d2');
  await page.getByRole('button', { name: /Pada kiša/ }).click();
  check('Plan B: kiša (dan 2)', await ok(page.getByText('Montmartre na suvom')));
  await page.getByRole('button', { name: /Umorni smo/ }).click();
  check('Plan B: umorni (dan 2)', await ok(page.getByText('Kratka verzija (2–3 km)')));
  let allPlanB = true;
  for (const d of ['d1', 'd2', 'd3', 'd4']) {
    await page.goto(BASE + '#/plan/' + d);
    for (const lbl of ['Pada kiša', 'Umorni smo', 'Duže za stolom', 'Samo lagana šetnja']) {
      if (!(await ok(page.getByRole('button', { name: new RegExp(lbl) })))) allPlanB = false;
    }
  }
  check('Plan B: sve 4 opcije u sva 4 dana', allPlanB);
  await page.goto(BASE + '#/plan/d3');
  check('Kako stižemo: koraci (dan 3)', await ok(page.getByText('Vozite se do kraja: 8 stanica do Châtelet. Svi izlaze.')));
  await page.getByRole('button', { name: 'Nazad kući' }).click();
  check('Kako stižemo: povratak', await ok(page.getByText(/6 stanica iz Rambuteau/)));
  await page.getByText('Mapa — smernica').click();
  check('Mapa-smernica se prikazuje', await ok(page.locator('.howto__map svg')));
  await page.goto(BASE + '#/plan/d1');
  await page.getByText('Mapa — smernica').click();
  check('Skica kraja (dan 1)', await ok(page.locator('.hood-map svg')));

  // Rulet
  await page.goto(BASE + '#/vise/rulet');
  await page.getByRole('button', { name: 'Do 15 €' }).click();
  const cheap = ['La Cave de Belleville', 'Aux Folies', 'Rosa Bonheur (Buttes-Chaumont)', 'Café des Deux Moulins', 'L’As du Fallafel', 'Marché des Enfants Rouges'];
  let rouletteOk = true;
  for (let i = 0; i < 5; i++) {
    await page.locator('.roulette-btn').click();
    await page.locator('.roulette-result').waitFor({ timeout: 5000 });
    const name = (await page.locator('.roulette-result__name').innerText()).trim();
    if (!cheap.includes(name)) {
      rouletteOk = false;
      console.log('    neočekivan izbor:', name);
    }
  }
  check('Rulet: filter „Do 15 €” bira samo jeftina mesta (5 okretanja)', rouletteOk);
  check('Rulet: prikazuje adresu i razlog', await ok(page.locator('.roulette-result .pd-addr')) && await ok(page.getByText('Zašto:')));
  await page.getByRole('button', { name: 'Romantična večera' }).click();
  check('Rulet: nemoguća kombinacija prikazuje poruku', await ok(page.getByText('Nijedno mesto ne odgovara')));

  // SOS
  await page.goto(BASE + '#/sos');
  check('SOS: velika adresa', await ok(page.getByText('TEST ADRESA 1, 75019 PARIS')));
  check('SOS: brojevi 112/15/17/18/114', (await page.locator('.sos-num').count()) === 5);
  check('SOS: 114 objašnjenje', await ok(page.getByText(/oštećenjem sluha ili govora/)));
  check('SOS: ambasada 75116 i oba broja', await ok(page.getByText('5 Rue Léonard de Vinci, 75116 Paris')) && await ok(page.getByText('+33 1 40 72 24 17')));
  await page.getByText('IZGUBILI SMO TELEFON').click();
  check('SOS: telefon partnera sačuvan offline', (await page.inputValue('input[placeholder="+381 …"] >> nth=0')) === '+381 60 000 0000');
  check('SOS: Find My koraci', await ok(page.getByText(/Find My/)));
  await page.getByText('IZGUBILI SMO SE').click();
  check('SOS: kartica „Izgubili smo se”', await ok(page.getByText('Nous voulons aller à cette adresse.')));
  await page.getByText('POMOĆ', { exact: true }).click();
  check('SOS: kartica „Pomoć” sa frazama', await ok(page.locator('.sos-card--help .phrase')));
  await page.goto(BASE + '#/danas');
  await page.locator('.quick--sos').click();
  check('SOS se otvara jednim dodirom sa naslovne', await ok(page.getByText('Travel SOS')));

  // Francuski: teme i hrana
  await page.goto(BASE + '#/francuski');
  await page.locator('.topic').nth(5).waitFor({ timeout: 5000 }).catch(() => undefined);
  check('Francuski: 6 velikih kartica tema', (await page.locator('.topic').count()) === 6);
  await page.locator('.topic', { hasText: 'Hrana' }).click();
  check('Francuski: hrana sa izgovorom', await ok(page.getByText('en konfi de kanar')));
  await page.goto(BASE + '#/francuski');
  await page.fill('.search__input', 'toalet');
  check('Pretraga: „toalet”', await ok(page.getByText('Où sont les toilettes ?')));

  // ===== MAPA SA PINOVIMA (offline) =====
  await page.goto(BASE + '#/vise/mapa');
  await page.locator('.pinmap__svg').waitFor();
  const pinCount = await page.locator('[data-pin]').count();
  check('Mapa: pinovi prikazani (smeštaj + restorani + znamenitosti)', pinCount >= 40, `${pinCount} pinova`);
  await page.locator('[data-pin="home"] path').click();
  check('Mapa: dodir na pin smeštaja', await ok(page.locator('.pinmap__name', { hasText: 'Naš smeštaj' })));
  // Ceo Pariz da bi Paloma bila vidljiva bez preklapanja nije potreban — kraj je podrazumevan
  await page.locator('[data-pin="p-vieux-belleville"] path').click();
  check('Mapa: pin restorana → ime, adresa, udaljenost', await ok(page.locator('.pinmap__name', { hasText: 'Le Vieux Belleville' })) && await ok(page.getByText(/Od smeštaja ≈ .* km/)));
  check('Mapa: dugme Detalji vodi na restoran', await ok(page.locator('.pinmap__info').getByText('Detalji')));
  const vb0 = await page.locator('.pinmap__svg').getAttribute('viewBox');
  await page.getByLabel('Uvećaj').click();
  const vb1 = await page.locator('.pinmap__svg').getAttribute('viewBox');
  check('Mapa: zum +', vb0 !== vb1 && Number(vb1.split(' ')[2]) < Number(vb0.split(' ')[2]));
  const box = await page.locator('.pinmap__svg').boundingBox();
  await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.8);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.6, { steps: 6 });
  await page.mouse.up();
  const vb2 = await page.locator('.pinmap__svg').getAttribute('viewBox');
  check('Mapa: pomeranje prevlačenjem', vb2 !== vb1);
  await page.getByRole('button', { name: 'Ceo Pariz' }).click();
  check('Mapa: „Ceo Pariz” prikazuje Ajfelovu kulu', await ok(page.locator('[data-pin="s-eiffel"]')));
  const before = await page.locator('[data-pin]').count();
  await page.locator('.chip--pin', { hasText: 'Hrana' }).click();
  const after = await page.locator('[data-pin]').count();
  check('Mapa: filter „Hrana” sakriva pinove hrane', after < before, `${before} → ${after}`);
  check('Mapa: oznaka „nije GPS”', await ok(page.getByText('Skica · nije GPS')));
  await page.goto(BASE + '#/plan/d2');
  await page.getByText('Mapa — smernica').click();
  check('Mapa dana 2: Sacré-Cœur i Moulin Rouge pinovi', await ok(page.locator('.howto__map [data-pin="s-sacre-coeur"]')) && await ok(page.locator('.howto__map [data-pin="s-moulin-rouge"]')));
  check('Mapa dana 2: bez pinova drugih dana', (await page.locator('.howto__map [data-pin="s-eiffel"]').count()) === 0);
  await page.locator('.howto__map').getByLabel('Uvećaj').click();
  const dz = await page.locator('.howto__map .pinmap__svg').getAttribute('viewBox');
  await page.getByRole('button', { name: 'Nazad kući' }).click();
  check('Mapa dana zadržava zum posle „Nazad kući” (regresija)', (await page.locator('.howto__map .pinmap__svg').getAttribute('viewBox')) === dz);
  await page.goto(BASE + '#/vise');
  await page.locator('.map-feature').click();
  check('Više → kartica „Mapa sa pinovima”', await ok(page.locator('.pinmap__svg')));

  // ===== DUGME „NA VRH” =====
  await page.goto(BASE + '#/plan/d3');
  check('Na vrhu stranice dugme je skriveno', !(await page.locator('.scroll-top.is-visible').count()));
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.locator('.scroll-top.is-visible').waitFor({ timeout: 3000 }).catch(() => undefined);
  check('Posle skrolovanja pojavljuje se dugme „na vrh”', (await page.locator('.scroll-top.is-visible').count()) === 1);
  await page.locator('.scroll-top').click();
  await page.waitForFunction(() => window.scrollY < 5, null, { timeout: 4000 }).catch(() => undefined);
  check('Dugme „na vrh” vraća na vrh', (await page.evaluate(() => window.scrollY)) < 5);

  // 10) Offline status
  if (mode === 'emulate') {
    await page.goto(BASE + '#/danas');
    check('Oznaka „Bez interneta · sve radi”', await page.getByText('Bez interneta · sve radi').first().isVisible());
  }

  check('Nema JavaScript grešaka', errors.length === 0, errors.slice(0, 3).join(' | '));
  check('Nema spoljnih mrežnih zahteva', external.length === 0, external.slice(0, 5).join(', '));

  await browser.close();
}

let server = null;
async function stopServer() {
  if (!server) return;
  if (process.platform === 'win32') {
    try {
      execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: 'ignore' });
    } catch {
      /* već ugašen */
    }
  } else server.kill();
  server = null;
  await new Promise((r) => setTimeout(r, 800));
}

try {
  if (browsers.includes('chromium')) {
    server = await startServer();
    await run('chromium', chromium, 'emulate');
    await stopServer();
  }
  if (browsers.includes('webkit')) {
    server = await startServer();
    try {
      await run('webkit', webkit, 'server-down');
    } catch (e) {
      check('WebKit test', false, String(e).split('\n')[0]);
    }
    await stopServer();
  }
} finally {
  await stopServer();
}

const failed = results.filter((r) => !r.ok);
console.log(`\nRezultat: ${results.length - failed.length}/${results.length} provera prošlo.`);
process.exit(failed.length ? 1 : 0);
