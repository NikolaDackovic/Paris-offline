import { useMemo, useState } from 'react';
import { LifeBuoy, Search, Star, X, ChevronRight, Info, MessageCircle, UtensilsCrossed, MapPin, Croissant, ShoppingBag, Siren } from 'lucide-react';
import { ALL_PHRASES, PHRASES, PRONUNCIATION_KEY, type Phrase } from '../data/phrases';
import { useActions, useStore } from '../store';
import { fold } from '../lib/util';
import { go } from '../router';
import { CopyButton, PageHeader } from '../components/ui';

export function PhraseCard({ p, showCat }: { p: Phrase & { category?: string }; showCat?: boolean }) {
  const { state } = useStore();
  const { togglePhrase } = useActions();
  const fav = !!state.favPhrases[p.id];
  return (
    <article className="phrase">
      {showCat && p.category && <div className="phrase__cat">{p.category}</div>}
      <div className="phrase__fr" lang="fr">
        {p.fr}
      </div>
      <div className="phrase__pron">
        <span className="phrase__pron-lbl">izgovor</span> {p.pron}
      </div>
      <div className="phrase__sr">{p.sr}</div>
      {p.note && <div className="phrase__note">{p.note}</div>}
      <div className="phrase__actions">
        <button type="button" className={'icon-btn' + (fav ? ' is-on' : '')} onClick={() => togglePhrase(p.id)} aria-label={fav ? 'Ukloni iz omiljenih' : 'Dodaj u omiljene'} aria-pressed={fav}>
          <Star size={18} fill={fav ? 'currentColor' : 'none'} />
        </button>
        <CopyButton text={p.fr} />
      </div>
    </article>
  );
}

// Velike kartice tema na početnoj strani „Francuski”
const TOPICS: { id: string; title: string; sub: string; icon: JSX.Element; tone?: string }[] = [
  { id: 'osnovno', title: 'Opšte', sub: 'Dobar dan, hvala, doviđenja…', icon: <MessageCircle size={26} /> },
  { id: 'restoran', title: 'Restoran', sub: 'Sto, vino, voda, račun', icon: <UtensilsCrossed size={26} /> },
  { id: 'prevoz', title: 'Po gradu', sub: 'Metro, pravac, toalet, pitanja', icon: <MapPin size={26} /> },
  { id: 'hrana', title: 'Hrana', sub: 'Šta probati i kako se kaže', icon: <Croissant size={26} /> },
  { id: 'kupovina', title: 'Kupovina', sub: 'Koliko košta, ne treba kesa', icon: <ShoppingBag size={26} /> },
  { id: 'hitno', title: 'Hitno', sub: 'Upomoć, lekar, policija', icon: <Siren size={26} />, tone: 'sos' }
];

function PronKey() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button type="button" className="key-toggle" onClick={() => setShow(!show)}>
        <Info size={16} /> Kako čitati izgovor {show ? '▴' : '▾'}
      </button>
      {show && (
        <ul className="bullets card">
          {PRONUNCIATION_KEY.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
      )}
    </>
  );
}

function Category({ id }: { id: string }) {
  const cat = PHRASES.find((c) => c.id === id);
  const topic = TOPICS.find((t) => t.id === id);
  if (!cat) return null;
  return (
    <div className="screen">
      <PageHeader title={topic?.title || cat.title} kicker={cat.title} backTo="francuski" />
      <PronKey />
      {cat.phrases.map((p) => (
        <PhraseCard key={p.id} p={p} />
      ))}
      {id === 'hitno' && (
        <button type="button" className="sos-banner" onClick={() => go('sos')}>
          <LifeBuoy size={22} />
          <span>
            <strong>Travel SOS</strong>
            <span className="sos-banner__sub">Brojevi, adresa, izgubljen telefon</span>
          </span>
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}

export default function French({ cat }: { cat?: string }) {
  const { state } = useStore();
  const [q, setQ] = useState('');

  const results = useMemo(() => {
    const f = fold(q.trim());
    if (!f) return null;
    return ALL_PHRASES.filter((p) => fold(`${p.fr} ${p.sr} ${p.pron} ${p.note || ''}`).includes(f));
  }, [q]);

  if (cat && PHRASES.some((c) => c.id === cat)) return <Category id={cat} />;

  const favs = ALL_PHRASES.filter((p) => state.favPhrases[p.id]);

  return (
    <div className="screen">
      <PageHeader title="Francuski" kicker="Parlez-vous français ?" />

      <div className="search">
        <Search size={18} className="search__icon" />
        <input
          className="search__input"
          type="search"
          inputMode="search"
          placeholder="Pretraži: račun, voda, metro, hvala…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Pretraga fraza"
        />
        {q && (
          <button type="button" className="search__clear" onClick={() => setQ('')} aria-label="Obriši pretragu">
            <X size={16} />
          </button>
        )}
      </div>

      {results ? (
        <section>
          <div className="small muted results-count">
            {results.length ? `Pronađeno: ${results.length}` : 'Nema rezultata. Probajte drugu reč (npr. „vino”, „izlaz”, „pomoć”).'}
          </div>
          {results.map((p) => (
            <PhraseCard key={p.id} p={p} showCat />
          ))}
        </section>
      ) : (
        <>
          <div className="topic-grid">
            {TOPICS.map((t) => {
              const n = PHRASES.find((c) => c.id === t.id)?.phrases.length || 0;
              return (
                <button type="button" key={t.id} className={'topic' + (t.tone ? ' topic--' + t.tone : '')} onClick={() => go('francuski/' + t.id)}>
                  <span className="topic__icon">{t.icon}</span>
                  <span className="topic__title">{t.title}</span>
                  <span className="topic__sub">{t.sub}</span>
                  <span className="topic__count">{n} izraza</span>
                </button>
              );
            })}
          </div>

          <button type="button" className="sos-banner" onClick={() => go('sos')}>
            <LifeBuoy size={22} />
            <span>
              <strong>Treba mi pomoć — SOS</strong>
              <span className="sos-banner__sub">Hitni brojevi, adresa i najvažnije fraze</span>
            </span>
            <ChevronRight size={18} />
          </button>

          <PronKey />

          {favs.length > 0 && (
            <section>
              <h2 className="section-title">
                <Star size={16} /> Omiljene
              </h2>
              {favs.map((p) => (
                <PhraseCard key={'f' + p.id} p={p} />
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
}
