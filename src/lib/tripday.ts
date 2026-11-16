import { DAYS, DEPARTURE_DATE, type PlanDay } from '../data/itinerary';
import { TRIP } from '../data/trip';
import { daysBetween, todayISO } from './util';

export type TripPhase =
  | { kind: 'before'; daysLeft: number; day: PlanDay }
  | { kind: 'day'; day: PlanDay; index: number }
  | { kind: 'departure' }
  | { kind: 'after' };

export function getPhase(now = todayISO()): TripPhase {
  if (now < TRIP.startDate) return { kind: 'before', daysLeft: daysBetween(now, TRIP.startDate), day: DAYS[0] };
  const idx = DAYS.findIndex((d) => d.date === now);
  if (idx >= 0) return { kind: 'day', day: DAYS[idx], index: idx };
  if (now === DEPARTURE_DATE) return { kind: 'departure' };
  return { kind: 'after' };
}

export function tripDayDates(count: number): string[] {
  const out: string[] = [];
  const [y, m, d] = TRIP.startDate.split('-').map(Number);
  for (let i = 0; i < count; i++) {
    const dt = new Date(Date.UTC(y, m - 1, d + i));
    out.push(dt.toISOString().slice(0, 10));
  }
  return out;
}
