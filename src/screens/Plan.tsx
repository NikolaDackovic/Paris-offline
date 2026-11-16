import { Coffee, Footprints, Landmark, MoonStar, TrainFront, UtensilsCrossed, Wine, ChevronRight, Lightbulb, Plane, Map as MapIcon } from 'lucide-react';
import { useActions, useStore } from '../store';
import { AIRPORT_INFO, DAYS, DEPARTURE_CHECKS, type ItemKind } from '../data/itinerary';
import { placeById } from '../data/places';
import { SUN_TIMES } from '../data/trip';
import { formatDate, todayISO } from '../lib/util';
import { go } from '../router';
import { CheckRow, LineBadge, PageHeader } from '../components/ui';
import { HOWTO, PLAN_B, PLANB_META, type PlanBKind } from '../data/dayextras';
import PinMap from '../components/PinMap';
import NeighborhoodMap from '../components/NeighborhoodMap';
import { useState } from 'react';

function StepBadge({ line }: { line: string }) {
  return line === 'walk' ? (
    <span className="walk-badge">
      <Footprints size={16} />
    </span>
  ) : (
    <LineBadge line={line} size="lg" />
  );
}

function dayPlaceIds(dayId: string): string[] {
  const d = DAYS.find((x) => x.id === dayId);
  if (!d) return [];
  return [...new Set([...d.items.map((i) => i.placeId).filter((x): x is string => !!x), ...d.dinnerPlaceIds])];
}

function HowToCard({ dayId }: { dayId: string }) {
  const how = HOWTO[dayId];
  const [showBack, setShowBack] = useState(false);
  const [showMap, setShowMap] = useState(false);
  if (!how) return null;
  const steps = showBack ? how.back : how.steps;
  return (
    <section className="card howto">
      <h3 className="section-title">
        <TrainFront size={16} /> Kako stižemo
      </h3>
      <div className="seg seg--sm">
        <button type="button" className={'seg__btn' + (!showBack ? ' is-active' : '')} onClick={() => setShowBack(false)}>
          Od kuće
        </button>
        <button type="button" className={'seg__btn' + (showBack ? ' is-active' : '')} onClick={() => setShowBack(true)}>
          Nazad kući
        </button>
      </div>
      {!showBack && <p className="small muted howto__intro">{how.intro}</p>}
      <ol className="route-steps">
        {steps.map((st, i) => (
          <li key={i} className="route-step">
            <div className="route-step__badge">
              <StepBadge line={st.line} />
            </div>
            <div className="route-step__body">
              <div className="route-step__title">
                <span className="step-num">{i + 1}.</span> {st.title}
              </div>
              <div className="route-step__sub route-step__sub--dark">{st.text}</div>
            </div>
          </li>
        ))}
      </ol>
      <button type="button" className="key-toggle" onClick={() => setShowMap(!showMap)}>
        <MapIcon size={16} /> {showMap ? 'Sakrij mapu' : 'Mapa — smernica'} {showMap ? '▴' : '▾'}
      </button>
      {showMap && (
        <div className="fade-in howto__map">
          <PinMap day={dayId} placeIds={dayPlaceIds(dayId)} showFilters={false} />
          {dayId === 'd1' && <NeighborhoodMap />}
        </div>
      )}
    </section>
  );
}

function PlanBCard({ dayId }: { dayId: string }) {
  const opts = PLAN_B[dayId] || [];
  const [kind, setKind] = useState<PlanBKind | null>(null);
  const cur = opts.find((o) => o.kind === kind);
  return (
    <section className="card planb">
      <h3 className="section-title">Plan B</h3>
      <div className="planb__grid">
        {opts.map((o) => (
          <button type="button" key={o.kind} className={'planb__btn' + (kind === o.kind ? ' is-active' : '')} aria-pressed={kind === o.kind} onClick={() => setKind(kind === o.kind ? null : o.kind)}>
            <span className="planb__emoji">{PLANB_META[o.kind].emoji}</span>
            <span>{PLANB_META[o.kind].label}</span>
          </button>
        ))}
      </div>
      {cur && (
        <div className="planb__body fade-in">
          <div className="planb__title">{cur.title}</div>
          <p className="card__text">{cur.text}</p>
          <div className="tl-links">
            {cur.placeIds.map((pid) => {
              const p = placeById(pid);
              return p ? (
                <button type="button" key={pid} className="link-chip" onClick={() => go('vise/restorani/' + pid)}>
                  <UtensilsCrossed size={14} /> {p.name}
                </button>
              ) : null;
            })}
          </div>
        </div>
      )}
    </section>
  );
}

const KIND_ICON: Record<ItemKind, JSX.Element> = {
  setnja: <Footprints size={16} />,
  hrana: <UtensilsCrossed size={16} />,
  vino: <Wine size={16} />,
  kafa: <Coffee size={16} />,
  znamenitost: <Landmark size={16} />,
  metro: <TrainFront size={16} />,
  odmor: <MoonStar size={16} />
};

function DayTabs({ active }: { active: string }) {
  const today = todayISO();
  return (
    <nav className="day-tabs" aria-label="Izbor dana">
      {DAYS.map((d) => (
        <button
          type="button"
          key={d.id}
          className={'day-tab' + (active === d.id ? ' is-active' : '') + (d.date === today ? ' is-today' : '')}
          onClick={() => go('plan/' + d.id)}
        >
          <span className="day-tab__num">{d.date.slice(8)}.</span>
          <span className="day-tab__lbl">{d.dayLabel}</span>
        </button>
      ))}
      <button
        type="button"
        className={'day-tab' + (active === 'polazak' ? ' is-active' : '') + (today === '2026-11-09' ? ' is-today' : '')}
        onClick={() => go('plan/polazak')}
      >
        <span className="day-tab__num">09.</span>
        <span className="day-tab__lbl">Polazak</span>
      </button>
    </nav>
  );
}

export default function Plan({ sub }: { sub?: string }) {
  const today = todayISO();
  const defaultDay = DAYS.find((d) => d.date === today)?.id || (today === '2026-11-09' ? 'polazak' : 'd1');
  const active = sub || defaultDay;

  return (
    <div className="screen">
      <PageHeader title="Plan puta" kicker="5 – 9. novembar" />
      <DayTabs active={active} />
      {active === 'polazak' ? <Departure /> : <DayView id={active} />}
    </div>
  );
}

function DayView({ id }: { id: string }) {
  const { state } = useStore();
  const { toggleDone, setDayNote } = useActions();
  const day = DAYS.find((d) => d.id === id) || DAYS[0];
  const done = day.items.filter((i) => state.done[i.id]).length;
  const sun = SUN_TIMES[day.date];

  return (
    <div className="day fade-in" key={day.id}>
      <section className="day-head">
        <div className="kicker">
          {day.dayLabel} · {formatDate(day.date, true)}
        </div>
        <h2 className="day-head__title">{day.title}</h2>
        <p className="day-head__theme">{day.theme}</p>
        <p className="day-head__intro">{day.intro}</p>
        <div className="day-head__meta">
          <span>
            <Footprints size={14} /> {day.walking}
          </span>
          {sun && (
            <span>
              <MoonStar size={14} /> zalazak {sun.sunset}
            </span>
          )}
        </div>
        <div className="progress-line">
          <span style={{ width: `${(done / day.items.length) * 100}%` }} />
        </div>
        <div className="small muted">
          Obeleženo {done} od {day.items.length} — dodirnite krug kad nešto obiđete
        </div>
      </section>

      <HowToCard dayId={day.id} />

      <ol className="timeline">
        {day.items.map((it) => {
          const isDone = !!state.done[it.id];
          const place = it.placeId ? placeById(it.placeId) : undefined;
          return (
            <li key={it.id} className={'tl-item tl-item--' + it.kind + (isDone ? ' is-done' : '')}>
              <button
                type="button"
                className="tl-check"
                onClick={() => toggleDone(it.id)}
                aria-pressed={isDone}
                aria-label={isDone ? 'Označi kao neurađeno' : 'Označi kao urađeno'}
              >
                {isDone ? '✓' : ''}
              </button>
              <div className="tl-body">
                <div className="tl-top">
                  <span className="tl-time">{it.time}</span>
                  <span className="tl-kind">{KIND_ICON[it.kind]}</span>
                </div>
                <h3 className="tl-title">{it.title}</h3>
                <p className="tl-text">{it.text}</p>
                <div className="tl-links">
                  {it.routeId && (
                    <button type="button" className="link-chip" onClick={() => go('vise/prevoz/' + it.routeId)}>
                      <TrainFront size={14} /> Ruta metroa
                    </button>
                  )}
                  {place && (
                    <button type="button" className="link-chip" onClick={() => go('vise/restorani/' + place.id)}>
                      <UtensilsCrossed size={14} /> {place.name}
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <section className="card tips">
        <h3 className="section-title">
          <Lightbulb size={16} /> Saveti za ovaj dan
        </h3>
        <ul className="bullets">
          {day.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <PlanBCard dayId={day.id} />

      <section className="card">
        <h3 className="section-title">Opcije za večeru i vino</h3>
        {day.dinnerPlaceIds.map((pid) => {
          const p = placeById(pid);
          if (!p) return null;
          return (
            <button type="button" key={pid} className="mini-place" onClick={() => go('vise/restorani/' + pid)}>
              <span>
                <span className="mini-place__name">{p.name}</span>
                <span className="mini-place__sub">
                  {p.area} · {p.food}
                </span>
              </span>
              <ChevronRight size={16} />
            </button>
          );
        })}
      </section>

      <section className="card">
        <h3 className="section-title">Naše beleške za ovaj dan</h3>
        <textarea
          className="textarea"
          rows={4}
          placeholder="Npr. gde smo jeli, šta nam se dopalo, šta da ne propustimo…"
          value={state.dayNotes[day.id] || ''}
          onChange={(e) => setDayNote(day.id, e.target.value)}
        />
      </section>
    </div>
  );
}

function Departure() {
  const { state } = useStore();
  const { toggleDone, setDeparture } = useActions();
  const dep = state.departure;
  const done = DEPARTURE_CHECKS.filter((c) => state.done[c.id]).length;

  const field = (key: keyof typeof dep, label: string, placeholder: string, type = 'text') => (
    <label className="field">
      <span className="field__label">{label}</span>
      <input
        className="input"
        type={type}
        value={dep[key]}
        placeholder={placeholder}
        onChange={(e) => setDeparture({ [key]: e.target.value })}
      />
    </label>
  );

  return (
    <div className="day fade-in">
      <section className="day-head">
        <div className="kicker">Ponedeljak · 9. novembar</div>
        <h2 className="day-head__title">Dan polaska</h2>
        <p className="day-head__intro">
          Lagano jutro, poslednji kroasan iz komšijske pekare i polazak bez stresa. Detalje leta unesite sami — aplikacija ih ne izmišlja.
        </p>
      </section>

      <button type="button" className="home-cta" onClick={() => go('vise/aerodrom')}>
        <Plane size={24} />
        <span>
          <strong>Aerodrom asistent</strong>
          <span className="home-cta__sub">CDG · Orly · Beauvais — kako stići, cene, alternative</span>
        </span>
        <ChevronRight size={20} />
      </button>

      <section className="card">
        <h3 className="section-title">
          <Plane size={16} /> Naš let i odlazak
        </h3>
        {field('airport', 'Aerodrom', 'npr. CDG, Orly, Beauvais')}
        {field('flight', 'Broj leta', 'npr. JU 123')}
        {field('flightTime', 'Vreme poletanja', '', 'time')}
        {field('checkoutTime', 'Vreme odjave iz smeštaja', '', 'time')}
        <label className="field">
          <span className="field__label">Kako idemo do aerodroma</span>
          <textarea
            className="textarea"
            rows={3}
            value={dep.transportNote}
            placeholder="npr. metro 11 → Châtelet → linija 14; polazak iz stana u 9:30"
            onChange={(e) => setDeparture({ transportNote: e.target.value })}
          />
        </label>
        {dep.flightTime && (
          <p className="note">
            Savet: na aerodromu budite najkasnije 2 sata pre poletanja (za let van Šengena i ranije). Od Jourdain računajte 1–1,5 h do CDG/Orly (procena) — plus rezerva za
            gužve.
          </p>
        )}
      </section>

      <section className="card">
        <h3 className="section-title">
          Lista za polazak <span className="muted small">· {done}/{DEPARTURE_CHECKS.length}</span>
        </h3>
        {DEPARTURE_CHECKS.map((c) => (
          <CheckRow key={c.id} checked={!!state.done[c.id]} onChange={() => toggleDone(c.id)}>
            {c.label}
          </CheckRow>
        ))}
      </section>

      <section className="card">
        <h3 className="section-title">Do aerodroma (opšte informacije)</h3>
        {AIRPORT_INFO.map((a) => (
          <div key={a.name} className="info-block">
            <div className="info-block__title">{a.name}</div>
            <p className="info-block__text">{a.text}</p>
          </div>
        ))}
        <p className="note">Proverite stanje saobraćaja i eventualne štrajkove dan ranije dok imate internet.</p>
      </section>
    </div>
  );
}
