import type { ExpenseCategory } from '../store';

export const EXPENSE_CATEGORIES: { id: ExpenseCategory; label: string; emoji: string }[] = [
  { id: 'dorucak', label: 'Doručak', emoji: '🥐' },
  { id: 'rucak', label: 'Ručak', emoji: '🥖' },
  { id: 'vecera', label: 'Večera', emoji: '🍽️' },
  { id: 'vino', label: 'Vino / piće', emoji: '🍷' },
  { id: 'kafa', label: 'Kafa', emoji: '☕' },
  { id: 'prevoz', label: 'Prevoz', emoji: '🚇' },
  { id: 'ulaznice', label: 'Ulaznice', emoji: '🎟️' },
  { id: 'ostalo', label: 'Ostalo', emoji: '🧺' }
];

export const catMeta = (id: string) => EXPENSE_CATEGORIES.find((c) => c.id === id) || EXPENSE_CATEGORIES[7];
