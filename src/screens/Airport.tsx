import { AlertTriangle, Clock, Euro, Plane, Repeat, ArrowRightLeft, Footprints, Car, Bus, MapPin } from 'lucide-react';
import { useActions, useStore } from '../store';
import { AIRPORTS, NOV5_NOTICE, PRICE_NOTES, PRICES_CHECKED, type AirportCode, type AirportStep } from '../data/airport';
import { todayISO } from '../lib/util';
import { LineBadge, PageHeader } from '../components/ui';

function StepIcon({ line }: { line: string }) {
  if (line === 'walk') return <span className="walk-badge"><Footprints size={16} /></span>;
  if (line === 'taxi') return <span className="walk-badge"><Car size={16} /></span>;
  if (line === 'bus') return <span className="walk-badge"><Bus size={16} /></span>;
  if (line === 'RER B') return <span className="rer-badge">RER B</span>;
  return <LineBadge line={line} size="lg" />;
}

export function Nov5Notice() {
  return (
    <section className="notice">
      <div className="notice__head">
        <AlertTriangle size={18} />
        <strong>{NOV5_NOTICE.title}</strong>
      </div>
      <div className="small">{NOV5_NOTICE.source}:</div>
      <ul className="bullets">
        {NOV5_NOTICE.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <div className="notice__foot">
        Poslednja provera: <strong>{NOV5_NOTICE.checked}</strong>. {NOV5_NOTICE.disclaimer}
      </div>
    </section>
  );
}

export default function Airport() {
  const { state } = useStore();
  const { setAirport } = useActions();
  const a = state.airport;
  const ap = AIRPORTS.find((x) => x.code === a.code) || AIRPORTS[0];
  const showNotice = todayISO() <= NOV5_NOTICE.date;

  const field = (key: 'flightIn' | 'terminal' | 'landingTime' | 'flightOut' | 'returnTime', label: string, placeholder = '', type = 'text') => (
    <label className="field field--grow">
      <span className="field__label">{label}</span>
      <input className="input" type={type} value={a[key]} placeholder={placeholder} onChange={(e) => setAirport({ [key]: e.target.value })} />
    </label>
  );

  return (
    <div className="screen">
      <PageHeader title="Aerodrom" kicker="Arrivée & départ" backTo="vise" />

      {showNotice && <Nov5Notice />}

      <div className="seg" role="radiogroup" aria-label="Izbor aerodroma">
        {AIRPORTS.map((x) => (
          <button
            type="button"
            key={x.code}
            role="radio"
            aria-checked={a.code === x.code}
            className={'seg__btn' + (a.code === x.code ? ' is-active' : '')}
            onClick={() => setAirport({ code: x.code as AirportCode })}
          >
            <span className="seg__code">{x.short}</span>
            <span className="seg__name">{x.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      <section className="card">
        <h2 className="section-title">
          <Plane size={16} /> Naši letovi
        </h2>
        <div className="form-row">
          {field('flightIn', 'Let — dolazak', 'npr. JU 360')}
          {field('terminal', 'Terminal', 'npr. 2E')}
        </div>
        <div className="form-row">{field('landingTime', 'Vreme sletanja', '', 'time')}</div>
        <div className="form-row">
          {field('flightOut', 'Let — povratak', 'npr. JU 361')}
          {field('returnTime', 'Polazak povratnog leta', '', 'time')}
        </div>
        <p className="small muted">Sačuvano samo na ovom telefonu. Aerodrom: {ap.name}.</p>
        {a.returnTime && <p className="note">{ap.returnTip}</p>}
      </section>

      <section className="card airport-dest">
        <MapPin size={18} />
        <div>
          <div className="card__eyebrow">Odredište</div>
          <div className="airport-dest__addr">{state.settings.address || 'Adresa nije uneta'}</div>
          <div className="small muted">Metro Jourdain · linija 11</div>
        </div>
      </section>

      <p className="small muted">{ap.terminals}</p>

      {ap.options.map((o) => (
        <section key={o.id} className="card airport-opt">
          <h3 className="airport-opt__title">{o.title}</h3>
          <dl className="route-facts">
            <div>
              <dt>Prevoz</dt>
              <dd>{o.mode}</dd>
            </div>
            <div>
              <dt>Polazak</dt>
              <dd>{o.from}</dd>
            </div>
            <div>
              <dt>Dolazak</dt>
              <dd>{o.to}</dd>
            </div>
          </dl>
          <ol className="route-steps">
            {o.steps.map((s: AirportStep, i) => (
              <li key={i} className="route-step">
                <div className="route-step__badge">
                  <StepIcon line={s.line} />
                </div>
                <div className="route-step__body">
                  <div className="route-step__sub route-step__sub--dark">{s.text}</div>
                </div>
              </li>
            ))}
          </ol>
          <div className="route-info">
            <ArrowRightLeft size={16} />
            <span>{o.transfers}</span>
          </div>
          <div className="route-info">
            <Clock size={16} />
            <span>{o.duration}</span>
          </div>
          <div className="route-info">
            <Euro size={16} />
            <span>{o.price}</span>
          </div>
          <div className="route-info route-info--alt">
            <Repeat size={16} />
            <span>
              <strong>Ako je prevoz poremećen:</strong> {o.alternative}
            </span>
          </div>
          {o.note && <p className="note">{o.note}</p>}
        </section>
      ))}

      <section className="card">
        <h3 className="section-title">Cene i karte (procene)</h3>
        <ul className="bullets">
          {PRICE_NOTES.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p className="small muted">Provereno: {PRICES_CHECKED} (RATP, service-public.fr, aerodromi). Nema reda vožnje uživo.</p>
      </section>
    </div>
  );
}
