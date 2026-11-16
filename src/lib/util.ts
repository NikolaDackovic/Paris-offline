// Datumi se računaju po lokalnom vremenu uređaja (u Parizu iPhone automatski prelazi na CET).
export function todayISO(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split('-').map(Number);
  const [by, bm, bd] = b.split('-').map(Number);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86400000);
}

const MONTHS = ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'];
const WEEKDAYS = ['nedelja', 'ponedeljak', 'utorak', 'sreda', 'četvrtak', 'petak', 'subota'];

export function formatDate(iso: string, withWeekday = false): string {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const base = `${d}. ${MONTHS[m - 1]}`;
  return withWeekday ? `${WEEKDAYS[dt.getUTCDay()]}, ${base}` : base;
}

export function eur(n: number, decimals = 2): string {
  const fixed = (Math.round(n * 100) / 100).toFixed(decimals);
  const [i, f] = fixed.split('.');
  const withSep = i.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${withSep}${f ? ',' + f : ''} €`;
}

export function parseAmount(s: string): number | null {
  const cleaned = s.replace(/\s/g, '').replace('€', '').replace(',', '.');
  if (!cleaned) return null;
  const n = Number(cleaned);
  if (!isFinite(n) || n <= 0 || n > 100000) return null;
  return Math.round(n * 100) / 100;
}

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* pokušaj rezervnu metodu */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '-1000px';
    ta.style.fontSize = '16px';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

// Uklanja dijakritike radi pretrage (č→c, é→e…)
export function fold(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'dj')
    .replace(/[’']/g, "'");
}
