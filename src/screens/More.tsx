import { useRef, useState } from 'react';
import {
  BookOpen,
  Briefcase,
  CloudOff,
  Download,
  Heart,
  Home,
  Map,
  Maximize2,
  Settings,
  TrainFront,
  Upload,
  UtensilsCrossed,
  LifeBuoy,
  Wifi,
  WifiOff,
  ChevronDown,
  Plus,
  RotateCcw,
  Bookmark,
  CheckCircle2,
  X,
  Plane,
  Dices
} from 'lucide-react';
import NeighborhoodMap from '../components/NeighborhoodMap';
import PinMap from '../components/PinMap';
import { useActions, useStore, normalizeState, defaultState, type AppState } from '../store';
import { TRIP, LAST_CHECKED, DEFAULT_ADDRESS } from '../data/trip';
import { ROUTES } from '../data/transport';
import { INFO_SECTIONS, OFFLINE_MATRIX, PACKING_DEFAULTS, EMERGENCY_NUMBERS } from '../data/info';
import { PLACES } from '../data/places';
import { DAYS } from '../data/itinerary';
import { taxiMessage } from '../data/phrases';
import { go } from '../router';
import { CheckRow, CopyButton, NavRow, PageHeader, useToast } from '../components/ui';
import { RouteSteps } from './Transport';
import AreaMap, { DISTANCES } from '../components/AreaMap';
import { OfflineBadge, usePwa } from '../pwa';
import { copyText, todayISO } from '../lib/util';

/* ================= Meni ================= */
export default function More() {
  return (
    <div className="screen">
      <PageHeader title="Više" kicker="Sve na jednom mestu" />
      <button type="button" className="map-feature" onClick={() => go('vise/mapa')}>
        <span className="map-feature__art" aria-hidden="true">
          <svg viewBox="0 0 120 70">
            <path d="M0 52 C30 44 50 60 80 50 S110 40 120 46" stroke="#BCD5E3" strokeWidth="7" fill="none" />
            <ellipse cx="34" cy="22" rx="18" ry="10" fill="#D5E5C9" />
            <path d="M10 30 L60 26 L104 14" stroke="#704B1C" strokeWidth="2.5" fill="none" />
            <path d="M84 30 c-2-4-7-6-7-11a7 7 0 1 1 14 0c0 5-5 7-7 11z" fill="#2F5D8C" />
            <path d="M40 46 c-2-3-5-4-5-8a5 5 0 1 1 10 0c0 4-3 5-5 8z" fill="#B5602C" />
            <path d="M58 22 c-2-3-5-4-5-8a5 5 0 1 1 10 0c0 4-3 5-5 8z" fill="#6B3F8F" />
          </svg>
        </span>
        <span className="map-feature__text">
          <strong>Mapa sa pinovima</strong>
          <span>Smeštaj, restorani, vino, znamenitosti i metro</span>
        </span>
        <Map size={20} />
      </button>
      <div className="nav-list">
        <NavRow icon={<LifeBuoy size={20} />} title="Travel SOS" sub="Adresa, hitni brojevi, izgubljen telefon" to="sos" />
        <NavRow icon={<Plane size={20} />} title="Aerodrom" sub="CDG · Orly · Beauvais → smeštaj" to="vise/aerodrom" />
        <NavRow icon={<Dices size={20} />} title="Gde ćemo danas?" sub="Slučajan izbor restorana ili bara" to="vise/rulet" />
        <NavRow icon={<Home size={20} />} title="Kako do kuće?" sub="Adresa, metro i put nazad" to="kuca" />
        <NavRow icon={<Maximize2 size={20} />} title="Taksi kartica" sub="Adresa na celom ekranu za vozača" to="taksi" />
        <NavRow icon={<TrainFront size={20} />} title="Metro i prevoz" sub="Rute, šema i saveti" to="vise/prevoz" />
        <NavRow icon={<UtensilsCrossed size={20} />} title="Restorani, kafići i vino" sub={`${PLACES.length} proverenih mesta`} to="vise/restorani" />
      </div>
      <div className="nav-list">
        <NavRow icon={<BookOpen size={20} />} title="Korisne informacije" sub="Bonton, restorani, vino, bezbednost" to="vise/info" />
        <NavRow icon={<Briefcase size={20} />} title="Lista za pakovanje" sub="Označite šta je spakovano" to="vise/pakovanje" />
        <NavRow icon={<Heart size={20} />} title="Omiljeno i beleške" sub="Sačuvana mesta i dnevnik" to="vise/omiljeno" />
      </div>
      <div className="nav-list">
        <NavRow icon={<CloudOff size={20} />} title="Šta radi bez interneta" sub="Offline status i ograničenja" to="vise/offline" />
        <NavRow icon={<Settings size={20} />} title="Podešavanja i rezervna kopija" sub="Adresa, budžet, izvoz/uvoz podataka" to="vise/podesavanja" />
      </div>
      <p className="footer-note">
        Pariz Offline · lični vodič za dvoje · podaci provereni {LAST_CHECKED}
        <br />
        Bez naloga, bez praćenja, bez interneta.
      </p>
    </div>
  );
}

/* ================= Kako do kuće ================= */
export function HomeGuide() {
  const { state } = useStore();
  const addr = state.settings.address;
  const fromCenter = ROUTES.find((r) => r.id === 'notre-dame')!;
  return (
    <div className="screen">
      <PageHeader title="Kako do kuće?" kicker="Rentrer à la maison" backTo="vise" />
      <section className="card home-big">
        <div className="card__eyebrow">Naš smeštaj</div>
        <div className="home-big__addr">{addr || 'Adresa još nije uneta'}</div>
        {state.settings.addressNote && <div className="home-big__note">{state.settings.addressNote}</div>}
        <div className="home-big__metro">
          <span className="line-badge line-badge--lg" style={{ background: '#704B1C', color: '#fff' }}>
            11
          </span>
          <span>
            <strong>Metro {TRIP.homeMetro}</strong>
            <span className="small muted"> · {TRIP.homeArea}</span>
          </span>
        </div>
        <p className="small">{TRIP.homeMetroNote}</p>
        <div className="row-actions">
          {addr ? (
            <CopyButton text={addr} label="Kopiraj adresu" />
          ) : (
            <button type="button" className="btn btn--primary" onClick={() => go('vise/podesavanja')}>
              Unesi adresu
            </button>
          )}
          <button type="button" className="btn btn--ghost" onClick={() => go('taksi')}>
            <Maximize2 size={16} /> Taksi kartica
          </button>
        </div>
      </section>

      <section className="card">
        <h2 className="section-title">Skica kraja</h2>
        <NeighborhoodMap />
      </section>

      <section className="card">
        <h2 className="section-title">Zlatno pravilo</h2>
        <p className="card__text big-rule">
          Nađite <strong>liniju 11</strong> (braon) i uđite u smer <strong>Rosny–Bois-Perrier</strong>. Izađite na <strong>Jourdain</strong>.
        </p>
        <p className="small muted">Na starijim tablama smer može pisati i „Mairie des Lilas”. Ako ste na liniji 2: presedite u Belleville.</p>
      </section>

      <section className="card">
        <h2 className="section-title">Odakle god da ste</h2>
        <div className="info-block">
          <div className="info-block__title">Iz centra (Châtelet, Hôtel de Ville, Marais)</div>
          <p className="info-block__text">Linija 11 direktno, smer Rosny–Bois-Perrier. Bez presedanja.</p>
        </div>
        <div className="info-block">
          <div className="info-block__title">Sa Montmartra (Anvers, Pigalle, Blanche)</div>
          <p className="info-block__text">Linija 2, smer Nation → Belleville → linija 11, smer Rosny–Bois-Perrier → Jourdain.</p>
        </div>
        <div className="info-block">
          <div className="info-block__title">Od Ajfelove kule (École Militaire)</div>
          <p className="info-block__text">Linija 8, smer Pointe du Lac → République → linija 11, smer Rosny–Bois-Perrier.</p>
        </div>
        <div className="info-block">
          <div className="info-block__title">Iz Trocadéra</div>
          <p className="info-block__text">Linija 9, smer Mairie de Montreuil → République → linija 11.</p>
        </div>
        <div className="info-block">
          <div className="info-block__title">Iz Luvra</div>
          <p className="info-block__text">Linija 1, smer Château de Vincennes → Châtelet → linija 11.</p>
        </div>
      </section>

      <section className="card">
        <h2 className="section-title">Primer: iz centra</h2>
        <RouteSteps r={{ ...fromCenter, steps: [{ line: '11', direction: 'Rosny–Bois-Perrier', from: 'Hôtel de Ville', to: 'Jourdain', stops: 7 }] }} />
      </section>

      <section className="card">
        <h2 className="section-title">Kasno noću</h2>
        <p className="card__text">
          Metro obično radi do oko 1h (petkom i subotom duže). Posle toga: zvanični taksi (znak „TAXI PARISIEN”) — pokažite taksi karticu. Noćni autobusi „Noctilien” postoje, ali su
          komplikovaniji.
        </p>
      </section>
    </div>
  );
}

/* ================= Taksi kartica (pun ekran) ================= */
export function TaxiCard() {
  const { state } = useStore();
  const addr = state.settings.address;
  return (
    <div className="taxi">
      <button type="button" className="taxi__close" onClick={() => (window.history.length > 1 ? window.history.back() : go('danas'))} aria-label="Zatvori">
        <X size={26} />
      </button>
      <div className="taxi__inner">
        <div className="taxi__hello" lang="fr">
          {taxiMessage}
        </div>
        <div className="taxi__addr">{addr || 'Adresa nije uneta — unesite je u Podešavanjima'}</div>
        {state.settings.addressNote && <div className="taxi__note">{state.settings.addressNote}</div>}
        <div className="taxi__metro" lang="fr">
          Métro {TRIP.homeMetro} (ligne 11) · Paris 19<sup>e</sup>
        </div>
        <div className="taxi__merci" lang="fr">
          Merci beaucoup !
        </div>
      </div>
      {addr && (
        <div className="taxi__actions">
          <CopyButton text={addr} label="Kopiraj adresu" />
        </div>
      )}
    </div>
  );
}

/* ================= Mapa ================= */
export function MapScreen() {
  return (
    <div className="screen">
      <PageHeader title="Mapa" kicker="Smernica oko smeštaja" backTo="vise" />
      <PinMap />
      <h2 className="section-title">Šema celog grada</h2>
      <div className="warning">
        <strong>Ilustracija, ne navigacija.</strong> Ova šema pokazuje odnose između kvartova. Ne prikazuje ulice, vašu lokaciju niti GPS. Za navigaciju koristite Apple Mape
        (unapred preuzmite offline mapu Pariza).
      </div>
      <section className="card">
        <AreaMap />
      </section>
      <section className="card">
        <h2 className="section-title">Udaljenosti od smeštaja (vazdušnom linijom, približno)</h2>
        {DISTANCES.map((d) => (
          <div key={d.to} className="dist-row">
            <span className="dist-row__to">{d.to}</span>
            <span className="dist-row__km">{d.km}</span>
            <span className="dist-row__how">{d.time}</span>
          </div>
        ))}
      </section>
    </div>
  );
}

/* ================= Info ================= */
export function InfoScreen() {
  const [open, setOpen] = useState<string | null>(INFO_SECTIONS[0].id);
  return (
    <div className="screen">
      <PageHeader title="Korisne informacije" kicker="Savoir-vivre" backTo="vise" />
      <div className="accordion">
        {INFO_SECTIONS.map((s) => (
          <div key={s.id} className={'acc' + (open === s.id ? ' is-open' : '')}>
            <button type="button" className="acc__head" onClick={() => setOpen(open === s.id ? null : s.id)} aria-expanded={open === s.id}>
              <span>{s.title}</span>
              <ChevronDown size={18} />
            </button>
            {open === s.id && (
              <ul className="bullets acc__body">
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <div className={'acc' + (open === 'sos' ? ' is-open' : '')}>
          <button type="button" className="acc__head" onClick={() => setOpen(open === 'sos' ? null : 'sos')} aria-expanded={open === 'sos'}>
            <span>Brojevi za hitne slučajeve</span>
            <ChevronDown size={18} />
          </button>
          {open === 'sos' && (
            <ul className="bullets acc__body">
              {EMERGENCY_NUMBERS.map((n) => (
                <li key={n.num}>
                  <a href={'tel:' + n.num}>
                    <strong>{n.num}</strong>
                  </a>{' '}
                  — {n.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button type="button" className="btn btn--ghost btn--block" onClick={() => go('vise/prevoz')}>
        <TrainFront size={16} /> Metro rečnik i saveti
      </button>
    </div>
  );
}

/* ================= Pakovanje ================= */
export function Packing() {
  const { state } = useStore();
  const { toggleDone, addPacking, removePacking, restorePacking } = useActions();
  const [text, setText] = useState('');
  const items = [
    ...PACKING_DEFAULTS.filter((p) => !state.hiddenPacking[p.id]),
    ...state.customPacking.map((c) => ({ ...c, group: 'Naše stavke' }))
  ];
  const groups = [...new Set(items.map((i) => i.group))];
  const done = items.filter((i) => state.done[i.id]).length;
  const hiddenCount = Object.keys(state.hiddenPacking).length;

  return (
    <div className="screen">
      <PageHeader title="Lista za pakovanje" kicker={`${done} od ${items.length} spakovano`} backTo="vise" />
      <div className="progress-line progress-line--lg">
        <span style={{ width: `${items.length ? (done / items.length) * 100 : 0}%` }} />
      </div>
      <form
        className="add-row"
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim()) {
            addPacking(text.trim());
            setText('');
          }
        }}
      >
        <input className="input" placeholder="Dodaj stavku (npr. adapter, naočare…)" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit" className="btn btn--primary" aria-label="Dodaj">
          <Plus size={18} />
        </button>
      </form>
      {groups.map((g) => (
        <section key={g} className="card">
          <h3 className="section-title">{g}</h3>
          {items
            .filter((i) => i.group === g)
            .map((i) => (
              <CheckRow key={i.id} checked={!!state.done[i.id]} onChange={() => toggleDone(i.id)} onRemove={() => removePacking(i.id)}>
                {i.label}
              </CheckRow>
            ))}
        </section>
      ))}
      {hiddenCount > 0 && (
        <button type="button" className="btn btn--ghost btn--block" onClick={restorePacking}>
          <RotateCcw size={16} /> Vrati uklonjene podrazumevane stavke ({hiddenCount})
        </button>
      )}
    </div>
  );
}

/* ================= Omiljeno i beleške ================= */
export function Favorites() {
  const { state } = useStore();
  const { setNotes } = useActions();
  const withStatus = PLACES.map((p) => ({ p, s: state.places[p.id] || {} }));
  const fav = withStatus.filter((x) => x.s.fav);
  const want = withStatus.filter((x) => x.s.want && !x.s.visited);
  const visited = withStatus.filter((x) => x.s.visited);
  const planDone = DAYS.reduce((a, d) => a + d.items.filter((i) => state.done[i.id]).length, 0);
  const planTotal = DAYS.reduce((a, d) => a + d.items.length, 0);

  const List = ({ title, icon, list }: { title: string; icon: JSX.Element; list: typeof fav }) => (
    <section className="card">
      <h3 className="section-title">
        {icon} {title} <span className="muted small">· {list.length}</span>
      </h3>
      {list.length === 0 && <p className="small muted">Prazno.</p>}
      {list.map(({ p, s }) => (
        <button type="button" key={p.id} className="mini-place" onClick={() => go('vise/restorani/' + p.id)}>
          <span>
            <span className="mini-place__name">{p.name}</span>
            <span className="mini-place__sub">{s.note ? '📝 ' + s.note : p.area}</span>
          </span>
        </button>
      ))}
    </section>
  );

  return (
    <div className="screen">
      <PageHeader title="Omiljeno i beleške" kicker="Naš Pariz" backTo="vise" />
      <section className="card stat-strip">
        <div>
          <span className="stat__value">{planDone}</span>
          <span className="stat__label">od {planTotal} stavki plana</span>
        </div>
        <div>
          <span className="stat__value">{visited.length}</span>
          <span className="stat__label">posećenih mesta</span>
        </div>
        <div>
          <span className="stat__value">{Object.values(state.favPhrases).filter(Boolean).length}</span>
          <span className="stat__label">omiljenih fraza</span>
        </div>
      </section>
      <List title="Omiljena mesta" icon={<Heart size={16} />} list={fav} />
      <List title="Želimo da odemo" icon={<Bookmark size={16} />} list={want} />
      <List title="Posetili smo" icon={<CheckCircle2 size={16} />} list={visited} />
      <section className="card">
        <h3 className="section-title">Naš dnevnik i beleške</h3>
        <textarea
          className="textarea"
          rows={8}
          placeholder="Utisci, imena vina koja su nam se dopala, mesta koja nam je neko preporučio…"
          value={state.notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <p className="small muted">Beleške za svaki dan su u Plan → izabrani dan.</p>
      </section>
    </div>
  );
}

/* ================= Offline info ================= */
export function OfflineScreen() {
  const { online, offlineReady, swSupported, standalone } = usePwa();
  return (
    <div className="screen">
      <PageHeader title="Bez interneta" kicker="Hors ligne" backTo="vise" />
      <section className="card offline-status">
        <OfflineBadge />
        <ul className="status-list">
          <li>
            {online ? <Wifi size={16} /> : <WifiOff size={16} />} Internet: <strong>{online ? 'dostupan' : 'nije dostupan'}</strong>
          </li>
          <li>
            <CloudOff size={16} /> Offline keš: <strong>{offlineReady ? 'spreman — sve je sačuvano na telefonu' : swSupported ? 'još se priprema (otvorite aplikaciju jednom dok ste na internetu)' : 'ovaj pregledač ne podržava offline rad'}</strong>
          </li>
          <li>
            <Home size={16} /> Pokrenuto sa početnog ekrana: <strong>{standalone ? 'da' : 'ne (otvoreno u pregledaču)'}</strong>
          </li>
        </ul>
      </section>
      <section className="card">
        <h3 className="section-title">✓ Radi potpuno offline</h3>
        <ul className="bullets bullets--ok">
          {OFFLINE_MATRIX.offline.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h3 className="section-title">✕ Zahteva internet (nije deo aplikacije)</h3>
        <ul className="bullets bullets--no">
          {OFFLINE_MATRIX.online.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h3 className="section-title">Saveti</h3>
        <ul className="bullets">
          <li>Pre puta otvorite aplikaciju sa početnog ekrana bar jednom dok imate internet i proverite da piše „Spremno za offline”.</li>
          <li>Podaci (troškovi, beleške, liste) čuvaju se samo na ovom telefonu. Povremeno napravite rezervnu kopiju u Podešavanjima.</li>
          <li>Na iPhone-u aplikacija sa početnog ekrana ima odvojenu memoriju od Safarija — unosite podatke uvek u aplikaciji sa početnog ekrana.</li>
          <li>Pre puta preuzmite offline mapu Pariza u Apple Mapama (Mape → profil → Offline mape).</li>
        </ul>
      </section>
    </div>
  );
}

/* ================= Podešavanja ================= */
export function SettingsScreen() {
  const { state, replaceAll, saveError } = useStore();
  const { setSettings } = useActions();
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [addr, setAddr] = useState(state.settings.address);
  const [note, setNote] = useState(state.settings.addressNote);
  const [phone, setPhone] = useState(state.settings.hostPhone);
  const [paste, setPaste] = useState('');
  const [showPaste, setShowPaste] = useState(false);

  const exportJson = () => JSON.stringify({ app: 'pariz-offline', exportedAt: new Date().toISOString(), data: state }, null, 2);

  const doDownload = () => {
    try {
      const blob = new Blob([exportJson()], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pariz-backup-${todayISO()}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 2000);
      toast('Rezervna kopija je napravljena');
    } catch {
      toast('Preuzimanje nije uspelo — koristite „Kopiraj kao tekst”');
    }
  };

  const importText = (text: string) => {
    try {
      const parsed = JSON.parse(text);
      const data: unknown = parsed && parsed.app === 'pariz-offline' ? parsed.data : parsed;
      const next: AppState = normalizeState(data);
      if (!window.confirm('Uvoz će zameniti sve trenutne podatke u aplikaciji. Nastaviti?')) return;
      replaceAll({ ...next, settings: { ...next.settings, onboarded: true } });
      setAddr(next.settings.address);
      setNote(next.settings.addressNote);
      setPhone(next.settings.hostPhone);
      toast('Podaci su uvezeni ✓');
      setPaste('');
      setShowPaste(false);
    } catch {
      toast('Neispravan fajl ili tekst');
    }
  };

  return (
    <div className="screen">
      <PageHeader title="Podešavanja" kicker="Réglages" backTo="vise" />
      {saveError && <div className="warning">Upozorenje: podaci trenutno ne mogu da se sačuvaju (memorija pregledača je puna ili blokirana).</div>}

      <section className="card">
        <h3 className="section-title">Adresa smeštaja</h3>
        <p className="small muted">Podrazumevano je adresa sa Booking-a. Izmena se čuva samo na ovom telefonu.</p>
        <label className="field">
          <span className="field__label">Adresa</span>
          <input className="input" value={addr} placeholder="Broj, ulica, poštanski broj, Paris" onChange={(e) => setAddr(e.target.value)} autoComplete="street-address" />
        </label>
        <label className="field">
          <span className="field__label">Dodatno (sprat, kod ulaza, interfon…)</span>
          <input className="input" value={note} placeholder="npr. Kod: 1234A, 3. sprat levo" onChange={(e) => setNote(e.target.value)} />
        </label>
        <label className="field">
          <span className="field__label">Telefon domaćina (opciono)</span>
          <input className="input" type="tel" value={phone} placeholder="+33 …" onChange={(e) => setPhone(e.target.value)} />
        </label>
        <button
          type="button"
          className="btn btn--primary btn--block"
          onClick={() => {
            setSettings({ address: addr.trim(), addressNote: note.trim(), hostPhone: phone.trim(), onboarded: true });
            toast('Sačuvano ✓');
          }}
        >
          Sačuvaj
        </button>
      </section>

      <section className="card">
        <h3 className="section-title">Rezervna kopija (JSON)</h3>
        <p className="small muted">Izvezite troškove, beleške, liste i podešavanja u fajl, pa ga sačuvajte u Fajlove ili pošaljite sebi.</p>
        <div className="row-actions row-actions--wrap">
          <button type="button" className="btn btn--primary" onClick={doDownload}>
            <Download size={16} /> Izvezi fajl
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={async () => {
              const ok = await copyText(exportJson());
              toast(ok ? 'Kopirano kao tekst ✓' : 'Kopiranje nije uspelo');
            }}
          >
            Kopiraj kao tekst
          </button>
        </div>
        <div className="row-actions row-actions--wrap">
          <button type="button" className="btn btn--ghost" onClick={() => fileRef.current?.click()}>
            <Upload size={16} /> Uvezi fajl
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => setShowPaste(!showPaste)}>
            Uvezi iz teksta
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json,text/plain"
          hidden
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (f) importText(await f.text());
            e.target.value = '';
          }}
        />
        {showPaste && (
          <div className="fade-in">
            <textarea className="textarea" rows={5} placeholder="Nalepite ovde JSON rezervne kopije" value={paste} onChange={(e) => setPaste(e.target.value)} />
            <button type="button" className="btn btn--primary btn--block" onClick={() => importText(paste)} disabled={!paste.trim()}>
              Uvezi
            </button>
          </div>
        )}
      </section>

      <section className="card">
        <h3 className="section-title">Brisanje</h3>
        <button
          type="button"
          className="btn btn--danger btn--block"
          onClick={() => {
            if (window.confirm('Obrisati SVE podatke (troškove, beleške, liste, adresu)? Ovo se ne može poništiti.')) {
              replaceAll(defaultState());
              toast('Svi podaci su obrisani');
              go('danas');
            }
          }}
        >
          Obriši sve podatke
        </button>
      </section>
    </div>
  );
}

/* ================= Prvo pokretanje ================= */
export function Onboarding() {
  const { setSettings } = useActions();
  const [addr, setAddr] = useState(DEFAULT_ADDRESS);
  const [note, setNote] = useState('');
  return (
    <div className="onboarding">
      <div className="onboarding__inner">
        <div className="kicker">Bienvenue</div>
        <h1 className="hero__title">Pariz</h1>
        <p className="hero__sub">4 dana u Parizu · 5–9. novembar 2026</p>
        <p className="onboarding__text">
          Proverite adresu smeštaja (sa Booking-a). Ako je drugačija, ispravite je ovde ili kasnije u Podešavanjima. Koristi se za taksi karticu, „Kako do kuće” i SOS.
        </p>
        <label className="field">
          <span className="field__label">Adresa smeštaja</span>
          <input className="input input--lg" value={addr} placeholder="Broj, ulica, 75019 Paris" onChange={(e) => setAddr(e.target.value)} autoComplete="street-address" />
        </label>
        <label className="field">
          <span className="field__label">Dodatno (opciono)</span>
          <input className="input" value={note} placeholder="Sprat, kod ulaza, interfon…" onChange={(e) => setNote(e.target.value)} />
        </label>
        <button type="button" className="btn btn--primary btn--block btn--lg" onClick={() => setSettings({ address: addr.trim(), addressNote: note.trim(), onboarded: true })} disabled={!addr.trim()}>
          Sačuvaj i počni
        </button>
        <button type="button" className="btn btn--link" onClick={() => setSettings({ onboarded: true })}>
          Preskoči za sada
        </button>
        <p className="small muted onboarding__foot">Kraj: {TRIP.homeArea} · metro {TRIP.homeMetro} (linija 11)</p>
      </div>
    </div>
  );
}
