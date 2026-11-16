import { useState } from 'react';
import { Heart, Bookmark, CheckCircle2, MapPin, TrainFront, Clock, Euro, ShieldCheck, ChevronRight } from 'lucide-react';
import { CATEGORY_LABELS, PLACES, placeById, type PlaceCategory } from '../data/places';
import { useActions, useStore } from '../store';
import { go } from '../router';
import { CopyButton, PageHeader, Pill } from '../components/ui';
import { LAST_CHECKED } from '../data/trip';
import { RouletteButton } from './Roulette';

const BEST_LABEL: Record<string, string> = { doručak: 'Doručak', ručak: 'Ručak', večera: 'Večera', kafa: 'Kafa', vino: 'Vino' };

export function PlaceStatusButtons({ id }: { id: string }) {
  const { state } = useStore();
  const { setPlace } = useActions();
  const s = state.places[id] || {};
  return (
    <div className="status-btns">
      <button type="button" className={'status-btn' + (s.fav ? ' is-on' : '')} aria-pressed={!!s.fav} onClick={() => setPlace(id, { fav: !s.fav })}>
        <Heart size={16} fill={s.fav ? 'currentColor' : 'none'} /> Omiljeno
      </button>
      <button type="button" className={'status-btn' + (s.want ? ' is-on' : '')} aria-pressed={!!s.want} onClick={() => setPlace(id, { want: !s.want })}>
        <Bookmark size={16} fill={s.want ? 'currentColor' : 'none'} /> Želimo
      </button>
      <button type="button" className={'status-btn' + (s.visited ? ' is-on' : '')} aria-pressed={!!s.visited} onClick={() => setPlace(id, { visited: !s.visited })}>
        <CheckCircle2 size={16} /> Bili smo
      </button>
    </div>
  );
}

export function PlaceDetail({ id }: { id: string }) {
  const p = placeById(id);
  const { state } = useStore();
  const { setPlace } = useActions();
  if (!p) return <Places />;
  const s = state.places[id] || {};
  return (
    <div className="screen">
      <PageHeader title={p.name} kicker={p.area} backTo="vise/restorani" />
      <div className="pills">
        {p.bestFor.map((b) => (
          <Pill key={b} tone="wine">
            {BEST_LABEL[b]}
          </Pill>
        ))}
        {p.categories.map((c) => (
          <Pill key={c}>{CATEGORY_LABELS[c]}</Pill>
        ))}
      </div>

      <section className="card place-detail">
        <div className="pd-row">
          <MapPin size={18} />
          <div className="pd-row__body">
            <div className="pd-addr">{p.address}</div>
            <CopyButton text={p.address} label="Kopiraj adresu" />
          </div>
        </div>
        <div className="pd-row">
          <TrainFront size={18} />
          <div className="pd-row__body">{p.metro}</div>
        </div>
        <div className="pd-row">
          <Euro size={18} />
          <div className="pd-row__body">{p.price}</div>
        </div>
        <div className="pd-row">
          <Clock size={18} />
          <div className="pd-row__body">{p.hoursNote}</div>
        </div>
      </section>

      <section className="card">
        <div className="card__eyebrow">Kuhinja</div>
        <p className="card__text">{p.food}</p>
        <div className="card__eyebrow">Zašto vredi</div>
        <p className="card__text">{p.why}</p>
        <div className="card__eyebrow">Atmosfera</div>
        <p className="card__text">{p.vibe}</p>
        <div className="tip-box">
          <strong>Savet:</strong> {p.tip}
        </div>
      </section>

      <PlaceStatusButtons id={p.id} />

      <section className="card">
        <label className="field">
          <span className="field__label">Naša beleška</span>
          <textarea
            className="textarea"
            rows={3}
            value={s.note || ''}
            placeholder="Npr. probati pačji confit, sto kod prozora…"
            onChange={(e) => setPlace(p.id, { note: e.target.value })}
          />
        </label>
      </section>

      <p className="verify">
        <ShieldCheck size={14} /> {p.verified}. Poslednja provera: {p.lastChecked}. Radno vreme i cene se menjaju — proverite na licu mesta.
      </p>
    </div>
  );
}

type Filter = PlaceCategory | 'sve' | 'sacuvano';

export default function Places() {
  const { state } = useStore();
  const [filter, setFilter] = useState<Filter>('sve');
  const list = PLACES.filter((p) => {
    if (filter === 'sve') return true;
    if (filter === 'sacuvano') {
      const s = state.places[p.id];
      return !!(s && (s.fav || s.want));
    }
    return p.categories.includes(filter);
  });
  const filters: [Filter, string][] = [
    ['sve', 'Sve'],
    ['sacuvano', '♥ Sačuvano'],
    ...(Object.keys(CATEGORY_LABELS) as PlaceCategory[]).map((k) => [k, CATEGORY_LABELS[k]] as [Filter, string])
  ];

  return (
    <div className="screen">
      <PageHeader title="Gde jesti i piti" kicker="Bistroi · vino · pekare" backTo="vise" />
      <RouletteButton />
      <p className="lead">Mali, proveren izbor umesto ogromne liste: autentično, opušteno i bez luksuza. Cene su procene po osobi.</p>
      <div className="chips chips--scroll">
        {filters.map(([k, label]) => (
          <button type="button" key={k} className={'chip' + (filter === k ? ' is-active' : '')} onClick={() => setFilter(k)}>
            {label}
          </button>
        ))}
      </div>

      {list.length === 0 && <p className="muted">Još ništa niste sačuvali. Otvorite neko mesto i dodirnite „Omiljeno” ili „Želimo”.</p>}

      {list.map((p) => {
        const s = state.places[p.id] || {};
        return (
          <button type="button" key={p.id} className="place-card" onClick={() => go('vise/restorani/' + p.id)}>
            <div className="place-card__top">
              <span className="place-card__area">{p.area}</span>
              <span className="place-card__flags">
                {s.fav && <Heart size={14} fill="currentColor" />}
                {s.want && <Bookmark size={14} fill="currentColor" />}
                {s.visited && <CheckCircle2 size={14} />}
              </span>
            </div>
            <div className="place-card__name">{p.name}</div>
            <div className="place-card__food">{p.food}</div>
            <div className="place-card__why">{p.why}</div>
            <div className="place-card__bottom">
              <span className="place-card__best">{p.bestFor.map((b) => BEST_LABEL[b]).join(' · ')}</span>
              <ChevronRight size={16} />
            </div>
          </button>
        );
      })}
      <p className="verify">
        <ShieldCheck size={14} /> Postojanje i adrese provereni u više nezavisnih izvora ({LAST_CHECKED}). Radno vreme nije prikazano kao potvrđeno.
      </p>
    </div>
  );
}
