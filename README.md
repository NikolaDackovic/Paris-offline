# Pariz Offline 🇫🇷

Lični offline vodič za 4 dana u Parizu (5–9. novembar 2026) za dvoje.
Instalira se na iPhone kao PWA (Progressive Web App) preko Safarija — bez App Store-a i bez Apple Developer naloga — i **radi potpuno bez interneta** posle prvog otvaranja.

**Sadrži:** plan po danima sa obeležavanjem, „Kako stižemo” korak po korak, mapom-smernicom i Plan B-om (kiša / umorni / duže za stolom / lagana šetnja) • Aerodrom asistent (CDG, Orly, Beauvais) • „Gde ćemo danas?” rulet restorana • Travel SOS ekran • **Mapa sa pinovima** (smeštaj, restorani, vino, znamenitosti, metro; zum i pomeranje prstima, bez interneta) • dugme „na vrh” • rute metroa od Jourdain i šemu linija • „Kako do kuće” i taksi karticu • 19 proverenih restorana, kafića i vinskih barova • 100+ francuskih izraza u velikim karticama (Opšte, Restoran, Po gradu, Hrana — šta probati, Kupovina, Hitno) sa izgovorom za naše govornike, pretragom i kopiranjem • stranicu „Treba mi pomoć” sa hitnim brojevima • praćenje troškova • liste za pakovanje i polazak • omiljena mesta i beleške • šematsku mapu kvartova • izvoz/uvoz rezervne kopije (JSON).

---

## ⚡ Najbrži put do iPhone-a (putujete sutra)

iPhone traži **HTTPS** da bi aplikacija radila offline, zato je treba objaviti na besplatnom hostingu. Najbrže, bez Gita:

1. Na laptopu, u folderu projekta: `npm install` pa `npm run build` (nastaje folder `dist`).
2. Otvorite **https://dash.cloudflare.com** → napravite besplatan nalog → *Workers & Pages* → *Create* → *Pages* → **Upload assets** (direct upload).
3. Upišite ime projekta (npr. `pariz-nasa-mapa-7k2`) i prevucite **ceo folder `dist`**. Kliknite *Deploy*.
4. Dobijate adresu oblika `https://pariz-nasa-mapa-7k2.pages.dev`.
5. Na iPhone-u je otvorite u **Safariju** i instalirajte (uputstvo ispod).

> Za root domen (kao `*.pages.dev`) nije potrebno ništa podešavati — podrazumevana putanja je `/`.

---

## 📱 Instalacija na iPhone (Safari)

1. Otvorite adresu aplikacije u **Safariju** (ne u Chrome-u — na iOS-u samo Safari pravi pravu PWA instalaciju za sve verzije iOS-a).
2. Sačekajte da se stranica učita i potvrdite adresu smeštaja (unapred je upisana adresa sa Booking-a; možete je izmeniti).
3. Dodirnite dugme **Deli** (kvadrat sa strelicom nagore) na dnu ekrana.
4. Skrolujte i izaberite **Dodaj na početni ekran** (*Add to Home Screen*). Ako je ponuđeno „Otvori kao veb-aplikaciju”, ostavite uključeno.
5. Dodirnite **Dodaj**. Pojavljuje se ikonica „Pariz” sa Ajfelovom kulom.
6. **Otvorite aplikaciju sa početnog ekrana** dok ste još na internetu i sačekajte da na vrhu piše **„Spremno za offline”** (zelena tačka).
7. Uključite **Airplane mode**, zatvorite aplikaciju (prevucite je iz liste otvorenih aplikacija) i otvorite je ponovo — mora da radi.

⚠️ Važno za iPhone:
- Aplikacija sa početnog ekrana ima **odvojenu memoriju** od Safarija. Adresu, troškove i beleške unosite u aplikaciji sa početnog ekrana (ono što ste uneli u Safari tabu se ne prenosi).
- Unesite adresu ponovo ako ste je prvo uneli u Safariju: Više → Podešavanja.
- Povremeno napravite rezervnu kopiju: Više → Podešavanja → Izvezi fajl (sačuvajte u *Fajlove*).
- Pre puta preuzmite i **offline mapu Pariza u Apple Mapama** (Mape → profilna slika → Offline mape) za pravu navigaciju bez interneta.

---

## 🔒 Privatnost i adresa smeštaja

- Na vaš zahtev, adresa sa Booking-a (`5 Rue Lassus, 19th arr., Paris, 75019, France`) je **ugrađena kao podrazumevana** u `src/data/trip.ts`. To znači da je deo objavljenog sajta i koda. Izmena u aplikaciji (Više → Podešavanja) čuva se samo na telefonu. Ako ne želite da adresa bude javna, obrišite je iz `DEFAULT_ADDRESS` pre objavljivanja.
- Bez backend-a, naloga, analitike, praćenja, API ključeva, spoljnih fontova i slika. Aplikacija **ne šalje nikakve podatke**.
- ⚠️ **Objavljena veb-aplikacija je dostupna svakome ko zna njen URL**, čak i ako je izvorni repozitorijum privatan (GitHub Pages i Cloudflare Pages su javni hosting). Zato birajte ime koje se teško pogađa i ne delite link javno. Troškovi, beleške, brojevi telefona i letovi nisu deo objavljenog sajta — čuvaju se samo na telefonu.

---

## 💻 Razvoj na laptopu

Potrebno: [Node.js](https://nodejs.org) 18+ (testirano na 22).

**Windows (PowerShell):**
```powershell
cd "C:\Users\38169\OneDrive\Radna povrsina\Pariz app"
npm install
npm run dev          # razvoj: http://localhost:5173
npm run build        # produkcioni build u folder dist
npm run preview      # pregled build-a: http://localhost:4173 (ovde radi service worker)
```

**macOS (Terminal):**
```bash
cd ~/putanja/do/Pariz\ app
npm install
npm run dev
npm run build
npm run preview
```

Napomena: u `npm run dev` režimu service worker je namerno isključen. Offline rad testirajte sa `npm run build` + `npm run preview`.

Ikonice se generišu iz koda: `npm run icons` (koristi `sharp`, već u devDependencies).

### Automatski testovi

`node scripts/responsive-test.mjs` — svih 27 ekrana na 7 veličina (320 px, iPhone 13 mini, iPhone 15, Pro Max, položen telefon, tablet, laptop) u Chromium-u i WebKit-u; proverava da ništa ne izlazi van ekrana.

#### Offline test (offline, čuvanje podataka, mrežni zahtevi)

```powershell
npx playwright install chromium webkit   # samo prvi put
npm run build
npm run test:offline
```

Test otvara aplikaciju u veličini iPhone 13 mini (375×812), čeka service worker, dodaje trošak, obeležava listu, prelazi u offline režim, ponovo učitava, prolazi kroz **svih 36 ekrana**, testira aerodromski asistent, Plan B u sva 4 dana, rulet sa filterima, SOS ekran i čuvanje svih unosa bez interneta + mapu sa pinovima i dugme „na vrh” (131 provera), testira pretragu fraza i proverava da **nema nijednog spoljnog mrežnog zahteva**. Pokreće se u Chromium-u (emulacija offline režima) i WebKit-u (Safari engine — server se stvarno gasi, pa service worker mora sam da posluži sve). Snimci ekrana se čuvaju u `screenshots/`.

---

## 🌍 Besplatno objavljivanje

### Opcija A — Cloudflare Pages (preporuka, najbrže)
Direct upload (bez Gita) — vidi „Najbrži put” gore. Za izmene: ponovo `npm run build` i u Cloudflare → projekat → *Create deployment* → prevucite `dist`.

Ili preko Gita: poveži repozitorijum, *Build command*: `npm run build`, *Build output directory*: `dist`, env promenljiva `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`.

### Opcija B — GitHub Pages (podputanja `/ime-repozitorijuma/`)
Workflow `.github/workflows/deploy-pages.yml` automatski postavlja `BASE_PATH=/<ime-repozitorijuma>/`. Za njegovo slanje na GitHub potreban je token sa `workflow` dozvolom. Bez te dozvole, izvorni kod može biti objavljen, ali GitHub Pages automatsko objavljivanje neće biti aktivirano.

```powershell
git init
git add .
git commit -m "Pariz Offline"
git branch -M main
git remote add origin https://github.com/KORISNIK/IME-REPOA.git
git push -u origin main
```
Zatim na GitHub-u: **Settings → Pages → Source: GitHub Actions**. Posle 1–2 minuta aplikacija je na `https://KORISNIK.github.io/IME-REPOA/`.

Ručni build za podputanju:
- PowerShell: `$env:BASE_PATH="/IME-REPOA/"; npm run build`
- macOS/Linux: `BASE_PATH=/IME-REPOA/ npm run build`

> Besplatni GitHub Pages za **privatne** repozitorijume zahteva plaćeni plan; sa javnim repozitorijumom kod je javan — uključujući podrazumevanu adresu smeštaja. Cloudflare Pages radi i sa privatnim repozitorijumom besplatno.

### Ažuriranje aplikacije na telefonu
Kada objavite novu verziju i otvorite aplikaciju dok ste na internetu, pojaviće se traka „Dostupna je nova verzija — Osveži”. Podaci na telefonu ostaju sačuvani.

---

## ✅ Završna offline provera (uradite pre polaska)

- [ ] Aplikacija otvorena u Safariju preko **https://** adrese
- [ ] Dodata na početni ekran i otvorena **sa ikonice**
- [ ] Na vrhu piše **„Spremno za offline”**
- [ ] Uneta adresa smeštaja (Više → Podešavanja) i proverena taksi kartica
- [ ] Uključen **Airplane mode**, aplikacija zatvorena i ponovo otvorena
- [ ] Prođeno kroz: Danas, Plan (svi dani + Polazak), Francuski, Treba mi pomoć, Troškovi, Više → Metro, rute, Restorani, Mapa, Info, Pakovanje, Omiljeno, Podešavanja
- [ ] Dodat probni trošak → zatvorena i ponovo otvorena aplikacija → trošak je i dalje tu (pa ga obrišite)
- [ ] Pretraga fraza radi (npr. „racun”, „voda”, „izlaz”)
- [ ] Dugme „Kopiraj” radi
- [ ] Napravljena rezervna kopija (Izvezi fajl)
- [ ] Isto ponovljeno na drugom telefonu (svako može imati svoju instalaciju; troškovi se ne sinhronizuju između telefona — možete prebaciti izvozom/uvozom)

---

## 📚 Izvori i napomene o podacima

- **Metro rute** sastavljene prema zvaničnim trasama RATP linija; linija 11 od 13. juna 2024. ide do **Rosny–Bois-Perrier** (izvori: RATP, Île-de-France Mobilités). Vremena putovanja su procene. Karta za metro 2,55 €, aerodromska karta „Paris Région <> Aéroports” 14 € (RATP tarif 2026). Taksi fiksno: CDG ↔ desna obala 56 €, Orly ↔ desna obala 45 € (service-public.fr). Roissybus je ukinut 1. 3. 2026. Aérobus Beauvais ~17,90–18 €.
- **Obaveštenje za 5. novembar** (RATP, ažurirano 4. 11. 2026. u 20:00) prikazano je kako je dato — nije informacija uživo.
- **Hitni brojevi:** 112, 15 (SAMU), 17 (policija), 18 (vatrogasci), 114 (SMS) — zvanični francuski brojevi.
- **Ambasada Srbije:** 5 Rue Léonard de Vinci, 75116 Paris, +33 1 40 72 24 24 i +33 1 40 72 24 17.
- **Metro Jourdain** ima tri ulaza: Rue Lassus, Rue de Belleville i Rue du Jourdain, kod crkve Saint-Jean-Baptiste de Belleville.
- **Restorani** provereni 4. novembra 2026. u više nezavisnih izvora (Time Out, Paris je t’aime, Le Fooding, Frommer’s, Paris by Mouth, zvanični sajtovi). Adrese su potvrđene; **radno vreme se ne prikazuje kao potvrđeno** jer se izvori razlikuju; cene su označene kao procene. Flying Chouette ima najmanje dostupnih podataka i tako je i označen.
- Vremena izlaska/zalaska sunca su približna.

## 🗂 Struktura

```
src/
  data/        plan, rute, restorani, fraze, info (sav sadržaj — lako se menja)
  screens/     ekrani (Danas, Plan, Francuski, Pomoć, Troškovi, Više…)
  components/  UI, šema metroa, mapa, ilustracije
  store.tsx    lokalno čuvanje (localStorage) + izvoz/uvoz
  pwa.tsx      service worker i offline status
scripts/       generisanje ikonica i offline test
```
