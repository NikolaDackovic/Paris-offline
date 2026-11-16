import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { DEFAULT_ADDRESS, TRIP } from './data/trip';

export type ExpenseCategory = 'dorucak' | 'rucak' | 'vecera' | 'vino' | 'kafa' | 'prevoz' | 'ulaznice' | 'ostalo';

export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  note: string;
  date: string; // YYYY-MM-DD
  createdAt: number;
}

export interface PlaceStatus {
  fav?: boolean;
  visited?: boolean;
  want?: boolean;
  note?: string;
}

export interface CustomItem {
  id: string;
  label: string;
}

export interface AppState {
  version: 1;
  settings: {
    onboarded: boolean;
    address: string;
    addressNote: string;
    hostPhone: string;
    dailyBudget: number;
    tripDays: number;
  };
  departure: {
    airport: string;
    flight: string;
    flightTime: string;
    checkoutTime: string;
    transportNote: string;
  };
  airport: {
    code: 'CDG' | 'ORY' | 'BVA';
    flightIn: string;
    terminal: string;
    landingTime: string;
    flightOut: string;
    returnTime: string;
  };
  sos: {
    partnerPhone: string;
    bankName: string;
    bankPhone: string;
    meetingPoint: string;
  };
  expenses: Expense[];
  done: Record<string, boolean>; // stavke plana, liste za pakovanje i odlazak
  places: Record<string, PlaceStatus>;
  customPacking: CustomItem[];
  hiddenPacking: Record<string, boolean>;
  dayNotes: Record<string, string>;
  notes: string;
  favPhrases: Record<string, boolean>;
}

const KEY = 'pariz-offline-v1';

export const defaultState = (): AppState => ({
  version: 1,
  settings: {
    onboarded: false,
    address: DEFAULT_ADDRESS,
    addressNote: '',
    hostPhone: '',
    dailyBudget: TRIP.defaultDailyBudget,
    tripDays: TRIP.tripDayCount
  },
  departure: { airport: '', flight: '', flightTime: '', checkoutTime: '', transportNote: '' },
  airport: { code: 'CDG', flightIn: '', terminal: '', landingTime: '', flightOut: '', returnTime: '' },
  sos: { partnerPhone: '', bankName: '', bankPhone: '', meetingPoint: 'Ulaz u metro Jourdain kod crkve' },
  expenses: [],
  done: {},
  places: {},
  customPacking: [],
  hiddenPacking: {},
  dayNotes: {},
  notes: '',
  favPhrases: {}
});

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);

// Polja koja su po defaultu tekst ostaju tekst; brojevi/boolean ostaju svog tipa (zaštita od izmenjenih backup fajlova)
function strFields<T extends object>(merged: T, defaults: T): T {
  const out = { ...merged } as Record<string, unknown>;
  for (const [k, v] of Object.entries(defaults)) {
    if (typeof v === 'string' && typeof out[k] !== 'string') out[k] = out[k] == null ? v : String(out[k]);
    if (typeof v === 'number' && !(typeof out[k] === 'number' && isFinite(out[k] as number))) out[k] = v;
    if (typeof v === 'boolean' && typeof out[k] !== 'boolean') out[k] = v;
  }
  return out as T;
}

// Spaja učitane podatke sa podrazumevanim vrednostima (otporno na stare/oštećene podatke).
export function normalizeState(raw: unknown): AppState {
  const d = defaultState();
  if (!isObj(raw)) return d;
  const s = raw as Partial<AppState>;
  const expenses = Array.isArray(s.expenses)
    ? s.expenses
        .filter((e) => isObj(e) && typeof e.amount === 'number' && isFinite(e.amount) && typeof e.date === 'string')
        .map((e) => ({
          id: String(e.id || uid()),
          amount: Math.round(e.amount * 100) / 100,
          category: (e.category || 'ostalo') as ExpenseCategory,
          note: String(e.note || ''),
          date: e.date,
          createdAt: Number(e.createdAt) || Date.now()
        }))
    : [];
  return {
    version: 1,
    settings: strFields({ ...d.settings, ...(isObj(s.settings) ? s.settings : {}) }, d.settings),
    departure: strFields({ ...d.departure, ...(isObj(s.departure) ? s.departure : {}) }, d.departure),
    airport: strFields({ ...d.airport, ...(isObj(s.airport) ? s.airport : {}) }, d.airport),
    sos: strFields({ ...d.sos, ...(isObj(s.sos) ? s.sos : {}) }, d.sos),
    expenses,
    done: isObj(s.done) ? (s.done as Record<string, boolean>) : {},
    places: isObj(s.places) ? (s.places as Record<string, PlaceStatus>) : {},
    customPacking: Array.isArray(s.customPacking) ? s.customPacking.filter((c) => isObj(c) && typeof c.label === 'string') : [],
    hiddenPacking: isObj(s.hiddenPacking) ? (s.hiddenPacking as Record<string, boolean>) : {},
    dayNotes: isObj(s.dayNotes) ? (s.dayNotes as Record<string, string>) : {},
    notes: typeof s.notes === 'string' ? s.notes : '',
    favPhrases: isObj(s.favPhrases) ? (s.favPhrases as Record<string, boolean>) : {}
  };
}

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    return normalizeState(JSON.parse(raw));
  } catch {
    return defaultState();
  }
}

interface Ctx {
  state: AppState;
  update: (fn: (s: AppState) => AppState) => void;
  saveError: boolean;
  replaceAll: (s: AppState) => void;
}

const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(load);
  const [saveError, setSaveError] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      // Zatraži trajno čuvanje (smanjuje rizik da browser obriše podatke)
      try {
        navigator.storage?.persist?.().catch(() => undefined);
      } catch {
        /* nije podržano */
      }
    }
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
  }, [state]);

  // Sinhronizacija ako je aplikacija otvorena u dva taba
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && e.newValue) {
        try {
          setState(normalizeState(JSON.parse(e.newValue)));
        } catch {
          /* ignoriši */
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const update = useCallback((fn: (s: AppState) => AppState) => setState((s) => fn(s)), []);
  const replaceAll = useCallback((s: AppState) => setState(s), []);

  const value = useMemo(() => ({ state, update, saveError, replaceAll }), [state, update, saveError, replaceAll]);
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const c = useContext(StoreCtx);
  if (!c) throw new Error('StoreProvider nedostaje');
  return c;
}

// Pomoćne akcije
export function useActions() {
  const { update } = useStore();
  return useMemo(
    () => ({
      toggleDone: (id: string) => update((s) => ({ ...s, done: { ...s.done, [id]: !s.done[id] } })),
      setPlace: (id: string, patch: Partial<PlaceStatus>) =>
        update((s) => ({ ...s, places: { ...s.places, [id]: { ...s.places[id], ...patch } } })),
      setSettings: (patch: Partial<AppState['settings']>) => update((s) => ({ ...s, settings: { ...s.settings, ...patch } })),
      setAirport: (patch: Partial<AppState['airport']>) => update((s) => ({ ...s, airport: { ...s.airport, ...patch } })),
      setSos: (patch: Partial<AppState['sos']>) => update((s) => ({ ...s, sos: { ...s.sos, ...patch } })),
      setDeparture: (patch: Partial<AppState['departure']>) => update((s) => ({ ...s, departure: { ...s.departure, ...patch } })),
      addExpense: (e: Omit<Expense, 'id' | 'createdAt'>) =>
        update((s) => ({ ...s, expenses: [...s.expenses, { ...e, id: uid(), createdAt: Date.now() }] })),
      editExpense: (id: string, patch: Partial<Expense>) =>
        update((s) => ({ ...s, expenses: s.expenses.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      deleteExpense: (id: string) => update((s) => ({ ...s, expenses: s.expenses.filter((x) => x.id !== id) })),
      togglePhrase: (id: string) => update((s) => ({ ...s, favPhrases: { ...s.favPhrases, [id]: !s.favPhrases[id] } })),
      setDayNote: (id: string, text: string) => update((s) => ({ ...s, dayNotes: { ...s.dayNotes, [id]: text } })),
      setNotes: (text: string) => update((s) => ({ ...s, notes: text })),
      addPacking: (label: string) => update((s) => ({ ...s, customPacking: [...s.customPacking, { id: 'c-' + uid(), label }] })),
      removePacking: (id: string) =>
        update((s) =>
          id.startsWith('c-')
            ? { ...s, customPacking: s.customPacking.filter((c) => c.id !== id) }
            : { ...s, hiddenPacking: { ...s.hiddenPacking, [id]: true } }
        ),
      restorePacking: () => update((s) => ({ ...s, hiddenPacking: {} }))
    }),
    [update]
  );
}

export const STORAGE_KEY = KEY;
