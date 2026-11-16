import { useEffect, useRef } from 'react';
import { CalendarDays, Euro, Languages, MoreHorizontal, Sun, RefreshCw } from 'lucide-react';
import { useRoute, go } from './router';
import { useStore } from './store';
import { usePwa } from './pwa';
import ScrollTop from './components/ScrollTop';
import Today from './screens/Today';
import Plan from './screens/Plan';
import French from './screens/French';
import Help from './screens/Help';
import Budget from './screens/Budget';
import TransportHome, { RouteDetail } from './screens/Transport';
import Places, { PlaceDetail } from './screens/Places';
import Airport from './screens/Airport';
import Roulette from './screens/Roulette';
import Sos from './screens/Sos';
import More, { Favorites, HomeGuide, InfoScreen, MapScreen, Onboarding, OfflineScreen, Packing, SettingsScreen, TaxiCard } from './screens/More';

const TABS = [
  { id: 'danas', label: 'Danas', icon: Sun },
  { id: 'plan', label: 'Plan', icon: CalendarDays },
  { id: 'francuski', label: 'Francuski', icon: Languages },
  { id: 'troskovi', label: 'Troškovi', icon: Euro },
  { id: 'vise', label: 'Više', icon: MoreHorizontal }
] as const;

function activeTab(route: string[]): string {
  const r = route[0];
  if (r === 'pomoc') return 'francuski';
  if (r === 'sos') return 'danas';
  if (r === 'kuca') return 'vise';
  return TABS.some((t) => t.id === r) ? r : 'danas';
}

function Screen({ route }: { route: string[] }) {
  const [a, b, c] = route;
  switch (a) {
    case 'plan':
      return <Plan sub={b} />;
    case 'francuski':
      return <French cat={b} />;
    case 'pomoc':
      return <Help />;
    case 'sos':
      return <Sos />;
    case 'troskovi':
      return <Budget />;
    case 'kuca':
      return <HomeGuide />;
    case 'vise':
      switch (b) {
        case 'prevoz':
          return c ? <RouteDetail id={c} /> : <TransportHome />;
        case 'restorani':
          return c ? <PlaceDetail id={c} /> : <Places />;
        case 'aerodrom':
          return <Airport />;
        case 'rulet':
          return <Roulette />;
        case 'mapa':
          return <MapScreen />;
        case 'info':
          return <InfoScreen />;
        case 'pakovanje':
          return <Packing />;
        case 'omiljeno':
          return <Favorites />;
        case 'podesavanja':
          return <SettingsScreen />;
        case 'offline':
          return <OfflineScreen />;
        default:
          return <More />;
      }
    default:
      return <Today />;
  }
}

export default function App() {
  const route = useRoute();
  const { state } = useStore();
  const { needRefresh, applyUpdate } = usePwa();
  const mainRef = useRef<HTMLElement>(null);
  const key = route.join('/');

  // Na promenu strane — skrol na vrh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);

  if (!state.settings.onboarded) return <Onboarding />;
  if (route[0] === 'taksi') return <TaxiCard />;

  const tab = activeTab(route);

  return (
    <div className="app">
      {needRefresh && (
        <div className="update-bar">
          <span>Dostupna je nova verzija aplikacije.</span>
          <button type="button" className="btn btn--sm" onClick={applyUpdate}>
            <RefreshCw size={14} /> Osveži
          </button>
        </div>
      )}
      <main ref={mainRef} className="main" key={key}>
        <Screen route={route} />
      </main>
      <ScrollTop />
      <nav className="tabbar" aria-label="Glavna navigacija">
        {TABS.map((t) => {
          const Icon = t.icon;
          const on = tab === t.id;
          return (
            <button type="button" key={t.id} className={'tab' + (on ? ' is-active' : '')} onClick={() => go(t.id)} aria-current={on ? 'page' : undefined}>
              <Icon size={23} strokeWidth={on ? 2.2 : 1.7} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
