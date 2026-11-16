import { useEffect, useRef, useState } from 'react';
import { Dices, MapPin, Euro, ChevronRight, RotateCcw } from 'lucide-react';
import { FILTER_LABELS, filterPool, type RouletteFilter, type RoulettePlace } from '../data/roulette';
import { go } from '../router';
import { CopyButton, PageHeader, Pill } from '../components/ui';

const BEST: Record<string, string> = { doručak: 'Doručak', ručak: 'Ručak', večera: 'Večera', kafa: 'Kafa', vino: 'Vino' };
const KEY = 'pariz-rulet-filteri';

function loadFilters(): RouletteFilter[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v.filter((x) => x in FILTER_LABELS) : [];
  } catch {
    return [];
  }
}

export function RouletteButton({ big = true }: { big?: boolean }) {
  return (
    <button type="button" className={'roulette-btn' + (big ? ' roulette-btn--big' : '')} onClick={() => go('vise/rulet')}>
      <Dices size={big ? 26 : 20} />
      <span>GDE ĆEMO DANAS?</span>
    </button>
  );
}

export default function Roulette() {
  const [filters, setFilters] = useState<RouletteFilter[]>(loadFilters);
  const [pick, setPick] = useState<RoulettePlace | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [flash, setFlash] = useState<string>('');
  const timer = useRef<number>();
  const pool = filterPool(filters);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(filters));
    } catch {
      /* */
    }
  }, [filters]);
  useEffect(() => () => window.clearInterval(timer.current), []);

  const toggle = (f: RouletteFilter) => {
    setPick(null);
    setFilters((cur) => {
      let next = cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f];
      // „Do 15” i „Do 25” se isključuju
      if (f === 'do15' && next.includes('do15')) next = next.filter((x) => x !== 'do25');
      if (f === 'do25' && next.includes('do25')) next = next.filter((x) => x !== 'do15');
      return next;
    });
  };

  const spin = () => {
    if (!pool.length || spinning) return;
    setSpinning(true);
    setPick(null);
    let n = 0;
    window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setFlash(pool[Math.floor(Math.random() * pool.length)].name);
      n++;
      if (n >= 12) {
        window.clearInterval(timer.current);
        // ne ponavljaj prethodni izbor ako postoji druga opcija
        const choices = pool.length > 1 && pick ? pool.filter((p) => p.id !== pick.id) : pool;
        const chosen = choices[Math.floor(Math.random() * choices.length)];
        setPick(chosen);
        setFlash('');
        setSpinning(false);
      }
    }, 70);
  };

  return (
    <div className="screen">
      <PageHeader title="Gde ćemo danas?" kicker="Food roulette" backTo="vise/restorani" />
      <p className="lead">Izaberite filtere i pustite slučaj da odluči — samo iz naše proverene liste.</p>

      <div className="chips">
        {(Object.keys(FILTER_LABELS) as RouletteFilter[]).map((f) => (
          <button type="button" key={f} className={'chip' + (filters.includes(f) ? ' is-active' : '')} aria-pressed={filters.includes(f)} onClick={() => toggle(f)}>
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>
      <div className="small muted">
        {pool.length ? `U igri: ${pool.length} ${pool.length === 1 ? 'mesto' : 'mesta'}` : 'Nijedno mesto ne odgovara svim filterima — uklonite neki.'}
        {filters.length > 0 && (
          <button type="button" className="link-btn" onClick={() => { setFilters([]); setPick(null); }}>
            <RotateCcw size={13} /> poništi
          </button>
        )}
      </div>

      <button type="button" className={'roulette-btn roulette-btn--big' + (spinning ? ' is-spinning' : '')} onClick={spin} disabled={!pool.length}>
        <Dices size={28} className={spinning ? 'spin' : ''} />
        <span>{spinning ? flash || '…' : pick ? 'JOŠ JEDNOM' : 'GDE ĆEMO DANAS?'}</span>
      </button>

      {pick && (
        <section className="card roulette-result fade-in" aria-live="polite">
          <div className="card__eyebrow">{pick.area}</div>
          <h2 className="roulette-result__name">{pick.name}</h2>
          <div className="pills">
            {pick.bestFor.map((b) => (
              <Pill key={b} tone="wine">
                {BEST[b]}
              </Pill>
            ))}
          </div>
          <div className="pd-row">
            <MapPin size={18} />
            <div className="pd-row__body">
              <div className="pd-addr">{pick.address}</div>
              <CopyButton text={pick.address} label="Kopiraj adresu" />
            </div>
          </div>
          <div className="pd-row">
            <Euro size={18} />
            <div className="pd-row__body">
              {pick.price}
              {pick.budget !== null && <div className="small muted">Procena za rulet: oko {pick.budget} € po osobi</div>}
            </div>
          </div>
          <p className="card__text">
            <strong>Zašto:</strong> {pick.why}
          </p>
          <p className="small muted">{pick.food} · {pick.metro}</p>
          <button type="button" className="btn btn--ghost btn--block" onClick={() => go('vise/restorani/' + pick.id)}>
            Sve o ovom mestu <ChevronRight size={16} />
          </button>
        </section>
      )}
      <p className="note">Cene su procene iz vodiča; radno vreme proverite na licu mesta.</p>
    </div>
  );
}
