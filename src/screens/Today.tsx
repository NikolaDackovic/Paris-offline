import { CloudOff, Euro, Home, Languages, LifeBuoy, MapPinned, Sunset, TrainFront, UtensilsCrossed, ChevronRight, Map as MapIcon } from 'lucide-react';
import { useStore } from '../store';
import { getPhase } from '../lib/tripday';
import { DAYS } from '../data/itinerary';
import { NOVEMBER_CLIMATE, SUN_TIMES, TRIP } from '../data/trip';
import { ALL_PHRASES } from '../data/phrases';
import { eur, formatDate, todayISO } from '../lib/util';
import { go } from '../router';
import { OfflineBadge } from '../pwa';
import { SkylineArt, Flourish } from '../components/Illustrations';
import { CopyButton } from '../components/ui';
import { RouletteButton } from './Roulette';
import { Nov5Notice } from './Airport';
import { NOV5_NOTICE } from '../data/airport';
import { Plane } from 'lucide-react';

export default function Today() {
  const { state } = useStore();
  const today = todayISO();
  const phase = getPhase(today);

  const day = phase.kind === 'day' ? phase.day : phase.kind === 'before' ? phase.day : null;
  const nextItem = day?.items.find((i) => !state.done[i.id]);
  const doneCount = day ? day.items.filter((i) => state.done[i.id]).length : 0;

  const spentToday = state.expenses.filter((e) => e.date === today).reduce((a, e) => a + e.amount, 0);
  const totalSpent = state.expenses.reduce((a, e) => a + e.amount, 0);
  const totalBudget = state.settings.dailyBudget * state.settings.tripDays;

  // Fraza dana — menja se po datumu
  const dayNum = Number(today.replace(/-/g, '')) % ALL_PHRASES.length;
  const phrase = ALL_PHRASES[dayNum];

  const sun = SUN_TIMES[today];

  let hello = 'Bonjour !';
  const h = new Date().getHours();
  if (h >= 18 || h < 4) hello = 'Bonsoir !';

  return (
    <div className="screen screen--today">
      <section className="hero">
        <div className="hero__top">
          <span className="kicker">Paris, France</span>
          <OfflineBadge compact />
        </div>
        <h1 className="hero__title">Pariz</h1>
        <Flourish />
        <p className="hero__sub">4 dana u Parizu</p>
        <p className="hero__dates">5 – 9. novembar 2026 · za dvoje</p>
        <p className="hero__welcome">
          {hello} Dobrodošli u vaš lični pariski vodič — šetnje, bistroi, vino i sve što vam treba, i bez interneta.
        </p>
        <SkylineArt className="hero__art" />
      </section>

      {/* Današnji dan */}
      {phase.kind === 'before' && (
        <section className="card card--feature" onClick={() => go('plan/d1')} role="button" tabIndex={0}>
          <div className="card__eyebrow">Još {phase.daysLeft} {phase.daysLeft === 1 ? 'dan' : 'dana'} do Pariza</div>
          <h2 className="card__title">Prvi dan: {phase.day.title}</h2>
          <p className="card__text">{phase.day.theme}</p>
          <span className="card__link">
            Pogledaj plan <ChevronRight size={16} />
          </span>
        </section>
      )}

      {phase.kind === 'day' && (
        <section className="card card--feature">
          <div className="card__eyebrow">
            {phase.day.dayLabel} · {formatDate(phase.day.date, true)}
          </div>
          <h2 className="card__title">{phase.day.title}</h2>
          <p className="card__text">{phase.day.theme}</p>
          <div className="progress-line" aria-label={`Završeno ${doneCount} od ${phase.day.items.length}`}>
            <span style={{ width: `${(doneCount / phase.day.items.length) * 100}%` }} />
          </div>
          <div className="small muted">
            Završeno {doneCount} od {phase.day.items.length}
          </div>
          {nextItem ? (
            <button type="button" className="next-up" onClick={() => go('plan/' + phase.day.id)}>
              <span className="next-up__time">{nextItem.time}</span>
              <span className="next-up__body">
                <span className="next-up__label">Sledeće</span>
                <span className="next-up__title">{nextItem.title}</span>
              </span>
              <ChevronRight size={18} />
            </button>
          ) : (
            <p className="card__text">Sve za danas je obeleženo. Bravo — vreme je za čašu vina! 🍷</p>
          )}
        </section>
      )}

      {phase.kind === 'departure' && (
        <section className="card card--feature" onClick={() => go('plan/polazak')} role="button" tabIndex={0}>
          <div className="card__eyebrow">Ponedeljak, 9. novembar</div>
          <h2 className="card__title">Dan polaska</h2>
          <p className="card__text">Proverite listu za odlazak, dokumenta i put do aerodroma.</p>
          <span className="card__link">
            Lista za polazak <ChevronRight size={16} />
          </span>
        </section>
      )}

      {phase.kind === 'after' && (
        <section className="card card--feature">
          <div className="card__eyebrow">Au revoir, Paris</div>
          <h2 className="card__title">Putovanje je završeno</h2>
          <p className="card__text">
            Ukupno potrošeno: <strong>{eur(totalSpent)}</strong>. Sačuvajte rezervnu kopiju podataka u Podešavanjima kao uspomenu.
          </p>
        </section>
      )}

      {/* Brze akcije */}
      <section className="quick-grid" aria-label="Brz pristup">
        <button type="button" className="quick" onClick={() => go('vise/prevoz')}>
          <TrainFront size={22} />
          <span>Metro</span>
        </button>
        <button type="button" className="quick" onClick={() => go('francuski')}>
          <Languages size={22} />
          <span>Francuski</span>
        </button>
        <button type="button" className="quick" onClick={() => go('vise/restorani')}>
          <UtensilsCrossed size={22} />
          <span>Restorani</span>
        </button>
        <button type="button" className="quick" onClick={() => go('troskovi')}>
          <Euro size={22} />
          <span>Troškovi</span>
        </button>
        <button type="button" className="quick" onClick={() => go('vise/mapa')}>
          <MapIcon size={22} />
          <span>Mapa</span>
        </button>
        <button type="button" className="quick" onClick={() => go('vise/aerodrom')}>
          <Plane size={22} />
          <span>Aerodrom</span>
        </button>
        <button type="button" className="quick quick--home" onClick={() => go('kuca')}>
          <Home size={22} />
          <span>Kući</span>
        </button>
        <button type="button" className="quick quick--sos" onClick={() => go('sos')}>
          <LifeBuoy size={22} />
          <span>SOS</span>
        </button>
      </section>

      <RouletteButton />

      {today <= NOV5_NOTICE.date && <Nov5Notice />}

      {(phase.kind === 'before' || phase.kind === 'departure' || today === '2026-11-05') && (
        <button type="button" className="home-cta" onClick={() => go('vise/aerodrom')}>
          <Plane size={24} />
          <span>
            <strong>Aerodrom</strong>
            <span className="home-cta__sub">Kako od aerodroma do smeštaja i nazad</span>
          </span>
          <ChevronRight size={20} />
        </button>
      )}

      {/* Vreme */}
      <section className="card weather">
        <div className="weather__head">
          <CloudOff size={20} />
          <div>
            <div className="card__eyebrow">Vreme</div>
            <div className="weather__title">Prognoza uživo nije dostupna offline</div>
          </div>
        </div>
        <p className="card__text">
          Novembar u Parizu: {NOVEMBER_CLIMATE.temp}. {NOVEMBER_CLIMATE.note}
        </p>
        <div className="weather__sun">
          <Sunset size={18} />
          <span>
            Zalazak sunca {sun ? sun.sunset : NOVEMBER_CLIMATE.sunset}
            {sun ? ` · izlazak ${sun.sunrise}` : ''} <span className="muted">(približno)</span>
          </span>
        </div>
      </section>

      {/* Troškovi */}
      <section className="card mini-budget" onClick={() => go('troskovi')} role="button" tabIndex={0}>
        <div>
          <div className="card__eyebrow">Danas potrošeno</div>
          <div className="mini-budget__num">{eur(spentToday)}</div>
        </div>
        <div className="mini-budget__right">
          <div className="small muted">Ukupno</div>
          <div className="mini-budget__total">
            {eur(totalSpent, 0)} <span className="muted">/ {eur(totalBudget, 0)}</span>
          </div>
        </div>
      </section>

      {/* Fraza dana */}
      <section className="card phrase-day">
        <div className="card__eyebrow">Fraza dana</div>
        <div className="phrase-day__fr">{phrase.fr}</div>
        <div className="phrase-day__pron">[{phrase.pron}]</div>
        <div className="phrase-day__sr">{phrase.sr}</div>
        <div className="phrase-day__actions">
          <CopyButton text={phrase.fr} />
        </div>
      </section>

      {/* Smeštaj */}
      <section className="card home-mini" onClick={() => go('kuca')} role="button" tabIndex={0}>
        <MapPinned size={22} />
        <div className="home-mini__body">
          <div className="card__eyebrow">Naš smeštaj</div>
          <div className="home-mini__addr">{state.settings.address || 'Adresa nije uneta — dodirnite da je unesete'}</div>
          <div className="small muted">
            Metro {TRIP.homeMetro} · linija {TRIP.homeMetroLine}
          </div>
        </div>
        <ChevronRight size={18} />
      </section>

      {/* Ostali dani */}
      <section className="days-strip">
        <h3 className="section-title">Sva četiri dana</h3>
        {DAYS.map((d) => (
          <button type="button" key={d.id} className={'day-chip' + (d.date === today ? ' is-today' : '')} onClick={() => go('plan/' + d.id)}>
            <span className="day-chip__date">{formatDate(d.date)}</span>
            <span className="day-chip__title">{d.title}</span>
            <ChevronRight size={16} className="day-chip__icon" />
          </button>
        ))}
      </section>
    </div>
  );
}
