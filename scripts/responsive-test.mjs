// Responsive test: svaki ekran na 7 veličina (od malog Android-a do laptopa i položenog telefona).
// Proverava da nema horizontalnog prelivanja stranice i da su ključni elementi unutar ekrana.
// Pokretanje: npm run build && node scripts/responsive-test.mjs
import { spawn, execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { chromium, webkit } from 'playwright';

const PORT = 4174;
const BASE = `http://localhost:${PORT}/`;
mkdirSync('screenshots/responsive', { recursive: true });

const SIZES = [
  { name: '320 (mali telefon)', w: 320, h: 640 },
  { name: '375 iPhone 13 mini', w: 375, h: 812 },
  { name: '390 iPhone 14/15', w: 390, h: 844 },
  { name: '430 iPhone Pro Max', w: 430, h: 932 },
  { name: '812x375 položen', w: 812, h: 375 },
  { name: '768 tablet', w: 768, h: 1024 },
  { name: '1280 laptop', w: 1280, h: 800 }
];

const ROUTES = [
  'danas', 'plan/d1', 'plan/d2', 'plan/d3', 'plan/d4', 'plan/polazak', 'francuski', 'francuski/hrana', 'francuski/restoran', 'pomoc', 'sos',
  'troskovi', 'vise', 'kuca', 'vise/prevoz', 'vise/prevoz/eiffel', 'vise/restorani', 'vise/restorani/paloma', 'vise/rulet', 'vise/aerodrom',
  'vise/mapa', 'vise/info', 'vise/pakovanje', 'vise/omiljeno', 'vise/podesavanja', 'vise/offline', 'taksi'
];

const STATE = JSON.stringify({ version: 1, settings: { onboarded: true, address: '5 Rue Lassus, 19th arr., Paris, 75019, France' } });

const server = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: process.platform === 'win32'
});
await new Promise((res, rej) => {
  const t = setTimeout(() => rej(new Error('server')), 30000);
  server.stdout.on('data', (d) => String(d).includes(String(PORT)) && (clearTimeout(t), res()));
});

let fails = 0;
let checks = 0;
const engines = (process.env.BROWSERS || 'chromium,webkit').split(',');
try {
  for (const engineName of engines) {
    const engine = engineName === 'webkit' ? webkit : chromium;
    const browser = await engine.launch();
    for (const s of SIZES) {
      const ctx = await browser.newContext({ viewport: { width: s.w, height: s.h }, serviceWorkers: 'block', hasTouch: true });
      await ctx.addInitScript((st) => localStorage.setItem('pariz-offline-v1', st), STATE);
      const page = await ctx.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      const bad = [];
      for (const r of ROUTES) {
        await page.goto(BASE + '#/' + r, { waitUntil: 'load' });
        await page.waitForTimeout(120);
        const res = await page.evaluate(() => {
          const vw = document.documentElement.clientWidth;
          const overflow = document.documentElement.scrollWidth - vw;
          // elementi koji izlaze desno van ekrana (bez onih u horizontalno skrolabilnim trakama)
          const offenders = [];
          for (const el of document.querySelectorAll('#root *')) {
            const r = el.getBoundingClientRect();
            if (!r.width || r.right <= vw + 1) continue;
            let p = el.parentElement;
            let scrollable = false;
            while (p) {
              const ox = getComputedStyle(p).overflowX;
              if (ox === 'auto' || ox === 'scroll' || ox === 'hidden') { scrollable = true; break; }
              p = p.parentElement;
            }
            if (!scrollable) offenders.push((el.className && String(el.className).slice(0, 40)) || el.tagName);
          }
          const tab = document.querySelector('.tabbar');
          const tabOk = !tab || tab.getBoundingClientRect().bottom <= window.innerHeight + 1;
          return { overflow, offenders: offenders.slice(0, 3), tabOk };
        });
        checks++;
        if (res.overflow > 1 || res.offenders.length || !res.tabOk) {
          fails++;
          bad.push(`#/${r} preliv=${res.overflow}px ${res.offenders.join(', ')}${res.tabOk ? '' : ' tabbar van ekrana'}`);
        }
        if (engineName === 'chromium' && ['danas', 'vise/mapa', 'francuski', 'sos', 'plan/d2'].includes(r)) {
          await page.screenshot({ path: `screenshots/responsive/${s.w}x${s.h}-${r.replace(/\//g, '_')}.png` });
        }
      }
      if (errors.length) {
        fails++;
        bad.push('JS greške: ' + errors.slice(0, 2).join(' | '));
      }
      console.log(`${bad.length ? '✗' : '✓'} ${engineName} ${s.name}: ${ROUTES.length} ekrana${bad.length ? '\n    ' + bad.join('\n    ') : ''}`);
      await ctx.close();
    }
    await browser.close();
  }
} finally {
  if (process.platform === 'win32') {
    try {
      execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: 'ignore' });
    } catch {
      /* */
    }
  } else server.kill();
}
console.log(`\nResponsive: ${checks - fails}/${checks} provera prošlo.`);
process.exit(fails ? 1 : 0);
