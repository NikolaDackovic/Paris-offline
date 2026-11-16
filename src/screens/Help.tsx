import { Phone, Maximize2, MapPin, Building2 } from 'lucide-react';
import { useStore } from '../store';
import { ALL_PHRASES, emergencyMessage } from '../data/phrases';
import { EMBASSY, EMERGENCY_NUMBERS } from '../data/info';
import { TRIP } from '../data/trip';
import { go } from '../router';
import { CopyButton, PageHeader } from '../components/ui';
import { PhraseCard } from './French';

export default function Help() {
  const { state } = useStore();
  const addr = state.settings.address;
  const msg = emergencyMessage(addr);
  const top = ALL_PHRASES.filter((p) => p.top);

  return (
    <div className="screen screen--help">
      <PageHeader title="Treba mi pomoć" kicker="J’ai besoin d’aide" backTo="francuski" />

      <section className="sos-numbers">
        {EMERGENCY_NUMBERS.map((n) => (
          <a key={n.num} href={'tel:' + n.num} className={'sos-num' + (n.main ? ' sos-num--main' : '')}>
            <span className="sos-num__n">{n.num}</span>
            <span className="sos-num__body">
              <span className="sos-num__title">{n.title}</span>
              <span className="sos-num__text">{n.text}</span>
            </span>
            <Phone size={18} />
          </a>
        ))}
        <p className="note">Zvanični francuski brojevi za hitne slučajeve. Poziv na 112 radi i bez interneta, ali je potreban mobilni signal.</p>
      </section>

      <section className="card addr-card">
        <div className="card__eyebrow">
          <MapPin size={14} /> Naša adresa u Parizu
        </div>
        <div className="addr-card__addr">{addr || 'Adresa nije uneta'}</div>
        {state.settings.addressNote && <div className="small">{state.settings.addressNote}</div>}
        <div className="small muted">
          Metro {TRIP.homeMetro} (linija {TRIP.homeMetroLine}) · {TRIP.homeArea}
        </div>
        <div className="row-actions">
          {addr ? <CopyButton text={addr} label="Kopiraj adresu" /> : <button type="button" className="btn" onClick={() => go('vise/podesavanja')}>Unesi adresu</button>}
          <button type="button" className="btn btn--ghost" onClick={() => go('taksi')}>
            <Maximize2 size={16} /> Pokaži na celom ekranu
          </button>
        </div>
        {state.settings.hostPhone && (
          <a className="btn btn--ghost btn--block" href={'tel:' + state.settings.hostPhone.replace(/\s/g, '')}>
            <Phone size={16} /> Pozovi domaćina: {state.settings.hostPhone}
          </a>
        )}
      </section>

      <section className="card">
        <div className="card__eyebrow">Poruka za pomoć na francuskom</div>
        <p className="emergency-msg" lang="fr">
          {msg}
        </p>
        <p className="small muted">
          Prevod: „Dobar dan, treba mi pomoć. Nas dvoje smo turisti iz Srbije i ne govorimo dobro francuski. {addr ? 'Naša adresa u Parizu je: ' + addr + '. ' : ''}Možete li da nam pomognete ili da pozovete 112? Hvala puno.”
        </p>
        <CopyButton text={msg} label="Kopiraj poruku" />
      </section>

      <h2 className="section-title">Najvažnije fraze</h2>
      {top.map((p) => (
        <PhraseCard key={p.id} p={p} />
      ))}

      <section className="card">
        <div className="card__eyebrow">
          <Building2 size={14} /> {EMBASSY.name}
        </div>
        <div className="addr-card__addr addr-card__addr--sm">{EMBASSY.address}</div>
        <div className="row-actions">
          <a className="btn btn--ghost" href={'tel:' + EMBASSY.phone.replace(/\s/g, '')}>
            <Phone size={16} /> {EMBASSY.phone}
          </a>
          <a className="btn btn--ghost" href={'tel:' + EMBASSY.phone2.replace(/\s/g, '')}>
            <Phone size={16} /> {EMBASSY.phone2}
          </a>
        </div>
        <p className="note">{EMBASSY.note}</p>
      </section>
    </div>
  );
}
