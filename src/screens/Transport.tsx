import { useState } from 'react';
import { ArrowDown, ChevronRight, Clock, Footprints, Home, Repeat, Undo2, ChevronDown } from 'lucide-react';
import { METRO_GUIDE, METRO_TERMS, ROUTES, type MetroRoute } from '../data/transport';
import { go } from '../router';
import { LineBadge, PageHeader } from '../components/ui';
import MetroDiagram from '../components/MetroDiagram';

export function RouteSteps({ r }: { r: MetroRoute }) {
  return (
    <ol className="route-steps">
      {r.steps.map((s, i) => (
        <li key={i} className="route-step">
          <div className="route-step__badge">{s.line === 'walk' ? <span className="walk-badge"><Footprints size={16} /></span> : <LineBadge line={s.line} size="lg" />}</div>
          <div className="route-step__body">
            {s.line === 'walk' ? (
              <>
                <div className="route-step__title">
                  Peške do stanice {s.to}
                </div>
                <div className="route-step__sub">{s.note}</div>
              </>
            ) : (
              <>
                <div className="route-step__title">
                  {s.from} <ArrowDown size={14} className="inline-arrow" /> {s.to}
                </div>
                <div className="route-step__dir">
                  Smer <strong>{s.direction}</strong>
                </div>
                <div className="route-step__sub">
                  {s.stops} {s.stops === 1 ? 'stanica' : s.stops && s.stops < 5 ? 'stanice' : 'stanica'}
                  {s.note ? ` · ${s.note}` : ''}
                </div>
              </>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function RouteDetail({ id }: { id: string }) {
  const r = ROUTES.find((x) => x.id === id);
  if (!r) return <TransportHome />;
  return (
    <div className="screen">
      <PageHeader title={r.short} kicker="Ruta metroa" backTo="vise/prevoz" />
      <section className="card route-card route-card--detail">
        <h2 className="route-card__title">{r.title}</h2>
        <dl className="route-facts">
          <div>
            <dt>Polazna stanica</dt>
            <dd>Jourdain (linija 11)</dd>
          </div>
          <div>
            <dt>Presedanje</dt>
            <dd>{r.transfer}</dd>
          </div>
          <div>
            <dt>Odredište</dt>
            <dd>{r.destStation}</dd>
          </div>
        </dl>
        <RouteSteps r={r} />
        <div className="route-info">
          <Footprints size={16} />
          <span>{r.walkAfter}</span>
        </div>
        <div className="route-info">
          <Clock size={16} />
          <span>
            Ukupno: <strong>{r.total}</strong>
          </span>
        </div>
        {r.alt && (
          <div className="route-info">
            <Repeat size={16} />
            <span>{r.alt}</span>
          </div>
        )}
        <div className="route-info route-info--back">
          <Undo2 size={16} />
          <span>
            <strong>Povratak:</strong> {r.back}
          </span>
        </div>
      </section>
      <p className="note">Vremena su procene. Aplikacija ne prikazuje polaske uživo, gužve, radove ni zatvorene stanice — to proverite na tablama u stanici.</p>
    </div>
  );
}

export default function TransportHome() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="screen">
      <PageHeader title="Metro i prevoz" kicker="Le métro" backTo="vise" />

      <button type="button" className="home-cta" onClick={() => go('kuca')}>
        <Home size={26} />
        <span>
          <strong>Kako do kuće?</strong>
          <span className="home-cta__sub">Linija 11, smer Rosny–Bois-Perrier → Jourdain</span>
        </span>
        <ChevronRight size={20} />
      </button>

      <section className="card">
        <h2 className="section-title">Šema naših ruta</h2>
        <MetroDiagram />
      </section>

      <h2 className="section-title">Rute od smeštaja</h2>
      {ROUTES.map((r) => (
        <button type="button" key={r.id} className="route-row" onClick={() => go('vise/prevoz/' + r.id)}>
          <span className="route-row__lines">
            {r.steps
              .filter((s) => s.line !== 'walk')
              .map((s, i) => (
                <LineBadge key={i} line={s.line} size="sm" />
              ))}
          </span>
          <span className="route-row__body">
            <span className="route-row__title">{r.short}</span>
            <span className="route-row__sub">
              do {r.destStation.replace(/ \(.*\)/, '')} · {r.total.replace(' (procena)', '')}
            </span>
          </span>
          <ChevronRight size={18} />
        </button>
      ))}

      <h2 className="section-title">Kako koristiti metro</h2>
      <div className="accordion">
        {METRO_GUIDE.map((g, i) => (
          <div key={g.title} className={'acc' + (open === i ? ' is-open' : '')}>
            <button type="button" className="acc__head" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
              <span>{g.title}</span>
              <ChevronDown size={18} />
            </button>
            {open === i && <p className="acc__body">{g.text}</p>}
          </div>
        ))}
      </div>

      <h2 className="section-title">Rečnik metroa</h2>
      <section className="card terms">
        {METRO_TERMS.map((t) => (
          <div key={t.fr} className="term">
            <span className="term__fr" lang="fr">
              {t.fr}
            </span>
            <span className="term__sr">{t.sr}</span>
          </div>
        ))}
      </section>
      <p className="note">Aplikacija ne prikazuje polaske uživo, štrajkove ni zatvorene stanice. Za to je potreban internet (npr. aplikacija Bonjour RATP).</p>
    </div>
  );
}
