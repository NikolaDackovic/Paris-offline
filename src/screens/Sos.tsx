import { useState } from 'react';
import { Building2, Maximize2, Phone, ChevronDown, LifeBuoy, Compass, Smartphone } from 'lucide-react';
import { useActions, useStore } from '../store';
import { ALL_PHRASES } from '../data/phrases';
import { EMBASSY, EMERGENCY_NUMBERS } from '../data/info';
import { TRIP } from '../data/trip';
import { go } from '../router';
import { CopyButton, PageHeader } from '../components/ui';
import { PhraseCard } from './French';

type Panel = 'pomoc' | 'izgubljeni' | 'telefon' | null;

const LOST_PHRASES = [
  { id: 'l1', fr: 'Bonjour, nous sommes perdus.', pron: 'bonžur, nu som perdi', sr: 'Dobar dan, izgubili smo se.' },
  { id: 'l2', fr: 'Nous voulons aller à cette adresse.', pron: 'nu vulon ale a set adres', sr: 'Želimo da idemo na ovu adresu.' },
  { id: 'l3', fr: 'C’est près du métro Jourdain, à côté de l’église de Belleville.', pron: 'se pre di metro žurden, a kote de legliz de belvil', sr: 'Blizu je metroa Jourdain, pored crkve u Belleville-u.' },
  { id: 'l4', fr: 'Où est la station de métro la plus proche ?', pron: 'u e la stasjon de metro la pli proš?', sr: 'Gde je najbliža stanica metroa?' },
  { id: 'l5', fr: 'Vous pouvez nous appeler un taxi ?', pron: 'vu puve nuz aple en taksi?', sr: 'Možete li da nam pozovete taksi?' }
];

export default function Sos() {
  const { state } = useStore();
  const { setSos } = useActions();
  const [open, setOpen] = useState<Panel>(null);
  const addr = state.settings.address;
  const sos = state.sos;
  const top = ALL_PHRASES.filter((p) => p.top).slice(0, 8);

  const toggle = (p: Panel) => setOpen(open === p ? null : p);

  return (
    <div className="screen screen--sos">
      <PageHeader title="Travel SOS" kicker="Au secours" backTo="danas" />

      <section className="sos-addr">
        <div className="sos-addr__label">Naša adresa · Notre adresse</div>
        <div className="sos-addr__text">{(addr || 'Adresa nije uneta').toUpperCase()}</div>
        <div className="sos-addr__metro">
          <span className="line-badge line-badge--md" style={{ background: '#704B1C', color: '#fff' }}>
            11
          </span>
          Métro {TRIP.homeMetro} · ligne 11
        </div>
        <div className="row-actions">
          {addr && <CopyButton text={addr} label="Kopiraj adresu" />}
          <button type="button" className="btn btn--ghost" onClick={() => go('taksi')}>
            <Maximize2 size={16} /> Pokaži taksisti
          </button>
        </div>
      </section>

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
      </section>

      {/* Tri velike kartice */}
      <div className={'sos-card sos-card--help' + (open === 'pomoc' ? ' is-open' : '')}>
        <button type="button" className="sos-card__head" onClick={() => toggle('pomoc')} aria-expanded={open === 'pomoc'}>
          <LifeBuoy size={26} />
          <span>
            <strong>POMOĆ</strong>
            <span className="sos-card__sub">Osnovne fraze na francuskom</span>
          </span>
          <ChevronDown size={20} />
        </button>
        {open === 'pomoc' && (
          <div className="sos-card__body fade-in">
            {top.map((p) => (
              <PhraseCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>

      <div className={'sos-card sos-card--lost' + (open === 'izgubljeni' ? ' is-open' : '')}>
        <button type="button" className="sos-card__head" onClick={() => toggle('izgubljeni')} aria-expanded={open === 'izgubljeni'}>
          <Compass size={26} />
          <span>
            <strong>IZGUBILI SMO SE</strong>
            <span className="sos-card__sub">Adresa i kako da objasnimo gde idemo</span>
          </span>
          <ChevronDown size={20} />
        </button>
        {open === 'izgubljeni' && (
          <div className="sos-card__body fade-in">
            <ol className="steps-list">
              <li>Ostanite mirni i zajedno. Potražite znak „M” — svaka stanica ima mapu kvarta.</li>
              <li>Linija 11 (braon), smer Rosny–Bois-Perrier → Jourdain. Sa linije 2: presedanje u Belleville.</li>
              <li>Pokažite adresu taksisti ili prolazniku (dugme „Pokaži taksisti” gore).</li>
              <li>
                Mesto sastanka ako se razdvojimo: <strong>{sos.meetingPoint || '—'}</strong>
              </li>
            </ol>
            {LOST_PHRASES.map((p) => (
              <PhraseCard key={p.id} p={p} />
            ))}
            <button type="button" className="btn btn--ghost btn--block" onClick={() => go('kuca')}>
              Kako do kuće — sve rute
            </button>
          </div>
        )}
      </div>

      <div className={'sos-card sos-card--phone' + (open === 'telefon' ? ' is-open' : '')}>
        <button type="button" className="sos-card__head" onClick={() => toggle('telefon')} aria-expanded={open === 'telefon'}>
          <Smartphone size={26} />
          <span>
            <strong>IZGUBILI SMO TELEFON</strong>
            <span className="sos-card__sub">Praktični koraci</span>
          </span>
          <ChevronDown size={20} />
        </button>
        {open === 'telefon' && (
          <div className="sos-card__body fade-in">
            <ol className="steps-list">
              <li>
                <strong>Find My (Pronađi):</strong> sa telefona partnera otvorite aplikaciju Find My → „Pomozi prijatelju” (Help a Friend), ili icloud.com/find. Potreban je internet (mobilni podaci partnera).
              </li>
              <li>
                <strong>Označite kao izgubljen</strong> (Mark As Lost) — telefon se zaključava, a na ekranu se prikazuje vaša poruka i broj.
              </li>
              <li>
                <strong>Pozovite banku</strong> i blokirajte kartice. Kartice u Apple Pay-u se mogu ukloniti i preko iCloud-a.
              </li>
              <li>
                <strong>Javite se partneru</strong> i dogovorite mesto sastanka.
              </li>
              <li>Promenite lozinku Apple ID-a ako sumnjate na krađu.</li>
              <li>
                Za osiguranje: prijava gubitka/krađe u policiji („déclaration de perte / de vol” u komesarijatu). Recite: „On m’a volé mon téléphone.” [on ma vole mon telefon]
              </li>
            </ol>
            <div className="card sos-contacts">
              <h3 className="section-title">Naši važni brojevi (čuvaju se na telefonu)</h3>
              <p className="small muted">Unesite ih sada — i zapišite na papir, jer ako je telefon izgubljen, ovo vidite samo na drugom telefonu.</p>
              <label className="field">
                <span className="field__label">Telefon partnera</span>
                <input className="input" type="tel" value={sos.partnerPhone} placeholder="+381 …" onChange={(e) => setSos({ partnerPhone: e.target.value })} />
              </label>
              <div className="form-row">
                <label className="field field--grow">
                  <span className="field__label">Banka</span>
                  <input className="input" value={sos.bankName} placeholder="naziv banke" onChange={(e) => setSos({ bankName: e.target.value })} />
                </label>
                <label className="field field--grow">
                  <span className="field__label">Broj za blokadu kartica</span>
                  <input className="input" type="tel" value={sos.bankPhone} placeholder="+381 …" onChange={(e) => setSos({ bankPhone: e.target.value })} />
                </label>
              </div>
              <label className="field">
                <span className="field__label">Mesto sastanka ako se razdvojimo</span>
                <input className="input" value={sos.meetingPoint} onChange={(e) => setSos({ meetingPoint: e.target.value })} />
              </label>
              <div className="row-actions">
                {sos.partnerPhone && (
                  <a className="btn btn--primary" href={'tel:' + sos.partnerPhone.replace(/\s/g, '')}>
                    <Phone size={16} /> Partner
                  </a>
                )}
                {sos.bankPhone && (
                  <a className="btn btn--ghost" href={'tel:' + sos.bankPhone.replace(/\s/g, '')}>
                    <Phone size={16} /> {sos.bankName || 'Banka'}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

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
        <p className="note">Za izgubljen pasoš ili ozbiljne probleme. Pre poziva proverite podatke na amb-serbie.fr ako imate internet.</p>
      </section>

      <button type="button" className="btn btn--ghost btn--block" onClick={() => go('pomoc')}>
        Sve fraze za pomoć i poruka na francuskom
      </button>
    </div>
  );
}
