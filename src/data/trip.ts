// Osnovni podaci o putovanju. Tačna adresa smeštaja se NE čuva ovde —
// unosi se u aplikaciji i čuva samo lokalno na telefonu.

export const LAST_CHECKED = '4. novembar 2026.';

// Adresa sa Booking-a (na izričit zahtev korisnika). Može se promeniti u Više → Podešavanja.
export const DEFAULT_ADDRESS = '5 Rue Lassus, 19th arr., Paris, 75019, France';

export const TRIP = {
  city: 'Pariz',
  country: 'Francuska',
  startDate: '2026-11-05',
  endDate: '2026-11-09',
  sightseeingDays: ['2026-11-05', '2026-11-06', '2026-11-07', '2026-11-08'],
  departureDate: '2026-11-09',
  travelers: 2,
  homeArea: 'Jourdain / Belleville (19. arondisman)',
  homeMetro: 'Jourdain',
  homeMetroLine: '11',
  homeMetroNote:
    'Stanica Jourdain je na raskršću Rue Lassus, Rue de Belleville i Rue du Jourdain, odmah kod velike crkve Saint-Jean-Baptiste de Belleville. Ima tri ulaza — jedan je baš na Rue Lassus. Od smeštaja je svega par minuta hoda (procena: 1–3 min).',
  defaultDailyBudget: 120,
  tripDayCount: 5
};

// Približni podaci za novembar (klimatski prosek, ne prognoza)
export const NOVEMBER_CLIMATE = {
  temp: 'obično oko 6–12 °C',
  note: 'Novembar je često oblačan, sa kišom i vetrom. Ponesite kišobran i slojevitu odeću.',
  sunrise: 'oko 7:50',
  sunset: 'oko 17:15–17:25'
};

export const SUN_TIMES: Record<string, { sunrise: string; sunset: string }> = {
  // Približna vremena za Pariz (lokalno vreme, CET)
  '2026-11-05': { sunrise: '≈ 7:51', sunset: '≈ 17:22' },
  '2026-11-06': { sunrise: '≈ 7:53', sunset: '≈ 17:20' },
  '2026-11-07': { sunrise: '≈ 7:54', sunset: '≈ 17:19' },
  '2026-11-08': { sunrise: '≈ 7:56', sunset: '≈ 17:17' },
  '2026-11-09': { sunrise: '≈ 7:58', sunset: '≈ 17:16' }
};
