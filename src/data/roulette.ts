import { PLACES, type Place } from './places';

// Dodatni podaci za „Gde ćemo danas?” — izvedeni iz postojećih opisa i procena cena u places.ts.
// budget = uobičajen trošak po osobi u € (PROCENA); null = nema pouzdanih podataka.
const META: Record<string, { budget: number | null; french?: boolean; wine?: boolean }> = {
  paloma: { budget: 16, french: true },
  'artisan-libanais': { budget: 18 },
  'vieux-belleville': { budget: 32, french: true, wine: true },
  'cave-belleville': { budget: 15, wine: true },
  'flying-chouette': { budget: null, wine: true },
  'aux-folies': { budget: 8, wine: true },
  'rosa-bonheur': { budget: 15, wine: true },
  bastringue: { budget: 22, wine: true },
  'zebre-montmartre': { budget: 25, french: true },
  'jardin-den-face': { budget: 38, french: true },
  'deux-moulins': { budget: 12, french: true },
  barav: { budget: 20, wine: true },
  breizh: { budget: 22, french: true },
  'as-du-fallafel': { budget: 11 },
  'enfants-rouges': { budget: 15 },
  'cafe-du-marche': { budget: 25, french: true },
  'petit-cler': { budget: 32, french: true, wine: true }
  // Pekara (Grenier à Pain) i sladoled (Berthillon) nisu u ruletu — nisu restoran ni bar.
};

export type RouletteFilter = 'do15' | 'do25' | 'francuska' | 'vino' | 'blizu' | 'romanticno' | 'lokalno';

export const FILTER_LABELS: Record<RouletteFilter, string> = {
  do15: 'Do 15 €',
  do25: 'Do 25 €',
  francuska: 'Francuska kuhinja',
  vino: 'Vino i tapas',
  blizu: 'Blizu smeštaja',
  romanticno: 'Romantična večera',
  lokalno: 'Lokalna atmosfera'
};

export interface RoulettePlace extends Place {
  budget: number | null;
}

export const ROULETTE_POOL: RoulettePlace[] = PLACES.filter((p) => p.id in META).map((p) => ({ ...p, budget: META[p.id].budget }));

export function matches(p: RoulettePlace, f: RouletteFilter): boolean {
  const m = META[p.id];
  switch (f) {
    case 'do15':
      return p.budget !== null && p.budget <= 15;
    case 'do25':
      return p.budget !== null && p.budget <= 25;
    case 'francuska':
      return !!m.french;
    case 'vino':
      return !!m.wine || p.categories.includes('vino');
    case 'blizu':
      return p.categories.includes('blizu');
    case 'romanticno':
      return p.categories.includes('romanticno');
    case 'lokalno':
      return p.categories.includes('lokalno') || p.categories.includes('blizu');
  }
}

export function filterPool(filters: RouletteFilter[]): RoulettePlace[] {
  return ROULETTE_POOL.filter((p) => filters.every((f) => matches(p, f)));
}
