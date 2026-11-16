import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent } from 'react';
import { Crosshair, Minus, Plus, ChevronRight, X } from 'lucide-react';
import { CANAL, HOME, LINES, PARKS, PLACE_COORDS, SEINE, SIGHTS, STATIONS, STREETS, distanceKm, project, walkMinutes, type LatLon } from '../data/geo';
import { PLACES } from '../data/places';
import { LINE_COLORS } from '../data/transport';
import { go } from '../router';
import { CopyButton } from './ui';

// Interaktivna mapa-SMERNICA: sopstveni SVG crtež (bez interneta i bez spoljnih pločica).
// Prevlačenje = pomeranje, dva prsta / točkić / +/- = zum, dodir na pin = detalji.

export type PinKind = 'home' | 'food' | 'wine' | 'sight' | 'metro';

interface Pin {
  id: string;
  kind: PinKind;
  name: string;
  pos: LatLon;
  sub?: string;
  placeId?: string;
  address?: string;
  day?: string;
}

const KIND_META: Record<PinKind, { label: string; color: string; glyph: string }> = {
  home: { label: 'Smeštaj', color: '#2F5D8C', glyph: '⌂' },
  food: { label: 'Hrana', color: '#B5602C', glyph: '🍴' },
  wine: { label: 'Vino i bar', color: '#6B3F8F', glyph: '🍷' },
  sight: { label: 'Znamenitost', color: '#1F2433', glyph: '★' },
  metro: { label: 'Metro', color: '#704B1C', glyph: 'M' }
};

const isWine = (cats: string[], bestFor: string[]) => cats.includes('vino') && !bestFor.includes('ručak');

function buildPins(): Pin[] {
  const pins: Pin[] = [{ id: 'home', kind: 'home', name: 'Naš smeštaj', pos: HOME, sub: '5 Rue Lassus · metro Jourdain' }];
  for (const p of PLACES) {
    const pos = PLACE_COORDS[p.id];
    if (!pos) continue;
    pins.push({
      id: 'p-' + p.id,
      kind: isWine(p.categories, p.bestFor) ? 'wine' : 'food',
      name: p.name,
      pos,
      sub: p.food,
      placeId: p.id,
      address: p.address
    });
  }
  for (const s of SIGHTS) pins.push({ id: 's-' + s.id, kind: 'sight', name: s.name, pos: s.pos, day: s.day });
  for (const st of STATIONS) pins.push({ id: 'm-' + st.name, kind: 'metro', name: 'Metro ' + st.name, pos: st.pos, sub: 'Linije: ' + st.lines.join(', ') });
  return pins;
}

const ALL_PINS = buildPins();

interface VB {
  x: number;
  y: number;
  w: number;
  h: number;
}

const ASPECT = 1.15; // visina / širina okvira mape
const MIN_W = 500; // m
const MAX_W = 16000; // m

function fitBox(points: LatLon[], padM = 350): VB {
  const xy = points.map(project);
  let minX = Math.min(...xy.map((p) => p[0])) - padM;
  let maxX = Math.max(...xy.map((p) => p[0])) + padM;
  let minY = Math.min(...xy.map((p) => p[1])) - padM;
  let maxY = Math.max(...xy.map((p) => p[1])) + padM;
  let w = Math.max(maxX - minX, MIN_W * 1.6);
  let h = maxY - minY;
  if (h > w * ASPECT) w = h / ASPECT;
  h = w * ASPECT;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  minX = cx - w / 2;
  minY = cy - h / 2;
  return { x: minX, y: minY, w, h };
}

export const PRESETS = {
  kraj: () => fitBox([HOME, [48.8809, 2.3828], [48.8707, 2.3862], [48.8722, 2.3767], [48.8798, 2.3953]], 250),
  pariz: () => fitBox([HOME, [48.8584, 2.2945], [48.8867, 2.3431], [48.853, 2.3499], [48.862, 2.2885]], 400)
};

const path = (pts: LatLon[]) =>
  pts
    .map((p, i) => {
      const [x, y] = project(p);
      return `${i ? 'L' : 'M'}${x.toFixed(0)} ${y.toFixed(0)}`;
    })
    .join(' ');

interface Props {
  /** Ograniči prikaz na pinove jednog dana (+ smeštaj i metro) */
  day?: string;
  /** Id-jevi restorana koje treba istaći (za dan) */
  placeIds?: string[];
  initial?: 'kraj' | 'pariz';
  showFilters?: boolean;
}

export default function PinMap({ day, placeIds, initial = 'kraj', showFilters = true }: Props) {
  // Stabilan ključ: novi niz istih id-jeva ne sme da resetuje prikaz mape
  const idsKey = (placeIds || []).join(',');
  const pins = useMemo(() => {
    if (!day) return ALL_PINS;
    const ids = new Set(idsKey.split(',').filter(Boolean).map((id) => 'p-' + id));
    return ALL_PINS.filter((p) => p.kind === 'home' || p.kind === 'metro' || p.day === day || ids.has(p.id));
  }, [day, idsKey]);

  const startBox = useMemo(() => {
    if (day) {
      const pts = pins.filter((p) => p.kind !== 'metro').map((p) => p.pos);
      return fitBox(pts, 300);
    }
    return PRESETS[initial]();
  }, [day, pins, initial]);

  const [vb, setVb] = useState<VB>(startBox);
  const [kinds, setKinds] = useState<Record<PinKind, boolean>>({ home: true, food: true, wine: true, sight: true, metro: true });
  const [sel, setSel] = useState<Pin | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [pxW, setPxW] = useState(360);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const moved = useRef(0);
  const pinch = useRef<{ d: number; vb: VB; cx: number; cy: number } | null>(null);

  useEffect(() => setVb(startBox), [startBox]);

  // Prati stvarnu širinu u pikselima (za veličinu pinova i pomeranje)
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const update = () => setPxW(el.getBoundingClientRect().width || 360);
    update();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const k = vb.w / pxW; // metara po pikselu

  const zoomAt = useCallback((factor: number, cx?: number, cy?: number) => {
    setVb((v) => {
      const w = Math.min(MAX_W, Math.max(MIN_W, v.w * factor));
      const f = w / v.w;
      const px = cx ?? v.x + v.w / 2;
      const py = cy ?? v.y + v.h / 2;
      return { x: px - (px - v.x) * f, y: py - (py - v.y) * f, w, h: w * ASPECT };
    });
  }, []);

  const toWorld = (clientX: number, clientY: number) => {
    const r = svgRef.current!.getBoundingClientRect();
    return [vb.x + ((clientX - r.left) / r.width) * vb.w, vb.y + ((clientY - r.top) / r.height) * vb.h] as const;
  };

  const onDown = (e: RPointerEvent<SVGSVGElement>) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moved.current = 0;
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const [cx, cy] = toWorld((a.x + b.x) / 2, (a.y + b.y) / 2);
      pinch.current = { d: Math.hypot(a.x - b.x, a.y - b.y), vb, cx, cy };
    }
  };

  const onMove = (e: RPointerEvent<SVGSVGElement>) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const cur = { x: e.clientX, y: e.clientY };
    pointers.current.set(e.pointerId, cur);
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const p0 = pinch.current;
      const w = Math.min(MAX_W, Math.max(MIN_W, p0.vb.w * (p0.d / Math.max(d, 1))));
      const f = w / p0.vb.w;
      setVb({ x: p0.cx - (p0.cx - p0.vb.x) * f, y: p0.cy - (p0.cy - p0.vb.y) * f, w, h: w * ASPECT });
      moved.current += 10;
      return;
    }
    const dx = cur.x - prev.x;
    const dy = cur.y - prev.y;
    moved.current += Math.abs(dx) + Math.abs(dy);
    if (moved.current < 4) return;
    // Pointer capture tek kad zaista počne prevlačenje, da dodir na pin i dalje radi
    if (!svgRef.current?.hasPointerCapture(e.pointerId)) {
      try {
        svgRef.current?.setPointerCapture(e.pointerId);
      } catch {
        /* */
      }
    }
    setVb((v) => ({ ...v, x: v.x - dx * (v.w / pxW), y: v.y - dy * (v.w / pxW) }));
  };

  const onUp = (e: RPointerEvent<SVGSVGElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
  };

  // Zum točkićem miša (laptop) — non-passive listener da ne skroluje stranicu
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      setVb((v) => {
        const cx = v.x + ((e.clientX - r.left) / r.width) * v.w;
        const cy = v.y + ((e.clientY - r.top) / r.height) * v.h;
        const w = Math.min(MAX_W, Math.max(MIN_W, v.w * (e.deltaY > 0 ? 1.15 : 1 / 1.15)));
        const f = w / v.w;
        return { x: cx - (cx - v.x) * f, y: cy - (cy - v.y) * f, w, h: w * ASPECT };
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const centerHome = () => {
    const [hx, hy] = project(HOME);
    setVb((v) => ({ ...v, x: hx - v.w / 2, y: hy - v.h / 2 }));
  };

  // Smeštaj i izabrani pin se crtaju poslednji (uvek na vrhu)
  const visible = pins
    .filter((p) => kinds[p.kind])
    .sort((a, b) => Number(a.kind === 'home' || a.id === sel?.id) - Number(b.kind === 'home' || b.id === sel?.id));

  // Natpisi bez preklapanja: redom po važnosti, natpis koji bi prekrio drugi se izostavlja
  const labeled = useMemo(() => {
    const kpx = vb.w / pxW;
    const prio: Record<PinKind, number> = { home: 0, sight: 1, food: 2, wine: 2, metro: 3 };
    const order = pins
      .filter((p) => kinds[p.kind])
      .sort((a, b) => (a.id === sel?.id ? -1 : b.id === sel?.id ? 1 : prio[a.kind] - prio[b.kind]));
    const boxes: [number, number, number, number][] = [];
    const out = new Set<string>();
    // pin smeštaja je zauzet prostor
    const [hx, hy] = project(HOME);
    boxes.push([(hx - vb.x) / kpx - 14, (hy - vb.y) / kpx - 32, 28, 32]);
    for (const p of order) {
      if (p.kind === 'metro' && vb.w > 4500 && p.id !== sel?.id) continue;
      const [x, y] = project(p.pos);
      const sx = (x - vb.x) / kpx;
      const sy = (y - vb.y) / kpx;
      if (sx < -20 || sy < -20 || sx > pxW + 20 || sy > pxW * ASPECT + 20) continue;
      const text = p.kind === 'home' ? 'Smeštaj' : p.kind === 'metro' ? p.name.replace('Metro ', '') : p.name;
      const fs = p.kind === 'home' ? 12 : p.kind === 'metro' ? 10 : 10.5;
      const w = text.length * fs * 0.56;
      const box: [number, number, number, number] = p.kind === 'metro' ? [sx + 9, sy - 7, w, 13] : [sx + 11, sy - 26, w, 15];
      const hit = p.kind !== 'home' && boxes.some((b) => box[0] < b[0] + b[2] && box[0] + box[2] > b[0] && box[1] < b[1] + b[3] && box[1] + box[3] > b[1]);
      if (!hit || p.id === sel?.id) {
        out.add(p.id);
        boxes.push(box);
      }
    }
    return out;
  }, [pins, kinds, vb, pxW, sel]);
  const showLabel = (p: Pin) => labeled.has(p.id);

  const selDist = sel ? distanceKm(HOME, sel.pos) : 0;
  const s = k; // skala za elemente fiksne veličine u pikselima

  return (
    <div className="pinmap">
      <div className="pinmap__frame">
        <svg
          ref={svgRef}
          className="pinmap__svg"
          viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Mapa-smernica sa pinovima oko smeštaja"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onPointerLeave={onUp}
        >
          <rect x={vb.x - vb.w} y={vb.y - vb.h} width={vb.w * 3} height={vb.h * 3} fill="#F6F1E7" />
          {PARKS.map((pk) => {
            const [x, y] = project(pk.pos);
            return (
              <ellipse
                key={pk.name}
                cx={x}
                cy={y}
                rx={pk.rx}
                ry={pk.ry}
                fill={pk.name === 'Montmartre' ? '#EDE2CF' : '#D5E5C9'}
                transform={pk.rot ? `rotate(${pk.rot} ${x} ${y})` : undefined}
              />
            );
          })}
          <path d={path(SEINE)} fill="none" stroke="#BCD5E3" strokeWidth={Math.max(110, 9 * s)} strokeLinecap="round" strokeLinejoin="round" />
          <path d={path(CANAL)} fill="none" stroke="#BCD5E3" strokeWidth={Math.max(35, 4 * s)} strokeLinecap="round" />
          {STREETS.map((st) => (
            <path key={st.name} d={path(st.path)} fill="none" stroke="#E4D8C4" strokeWidth={Math.max(30, 6 * s)} strokeLinecap="round" strokeLinejoin="round" />
          ))}
          {LINES.map((l) => (
            <path key={l.line} d={path(l.path)} fill="none" stroke={LINE_COLORS[l.line].bg} strokeWidth={3 * s} strokeLinecap="round" strokeLinejoin="round" opacity={l.line === '11' ? 0.9 : 0.55} />
          ))}
          {vb.w < 4000 &&
            STREETS.map((st) => {
              const [x, y] = project(st.path[1]);
              return (
                <text key={'t' + st.name} x={x} y={y - 8 * s} fontSize={10 * s} className="pm-street" textAnchor="middle">
                  {st.name}
                </text>
              );
            })}

          {/* Pinovi */}
          {visible.map((p) => {
            const [x, y] = project(p.pos);
            const meta = KIND_META[p.kind];
            const active = sel?.id === p.id;
            if (p.kind === 'metro') {
              return (
                <g key={p.id} transform={`translate(${x} ${y}) scale(${s})`} className="pm-pin" onClick={() => moved.current < 6 && setSel(p)}>
                  <circle r={active ? 9 : 6.5} fill="#fff" stroke={meta.color} strokeWidth="2.2" />
                  <text y="3" textAnchor="middle" className="pm-m" fontSize="8">
                    M
                  </text>
                  {showLabel(p) && (
                    <text x="10" y="4" className="pm-label pm-label--metro" fontSize="10">
                      {p.name.replace('Metro ', '')}
                    </text>
                  )}
                </g>
              );
            }
            const big = p.kind === 'home' ? 1.35 : active ? 1.25 : 1;
            return (
              <g key={p.id} transform={`translate(${x} ${y}) scale(${s * big})`} className="pm-pin" onClick={() => moved.current < 6 && setSel(p)} data-pin={p.id}>
                <circle r="16" fill="transparent" />
                <path d="M0 0 C-3 -6 -10 -10 -10 -17 A10 10 0 1 1 10 -17 C10 -10 3 -6 0 0 Z" fill={meta.color} stroke="#fff" strokeWidth="1.6" />
                <text y="-13.5" textAnchor="middle" fontSize={p.kind === 'home' ? 12 : 9} className="pm-glyph">
                  {meta.glyph}
                </text>
                {showLabel(p) && (
                  <text x="12" y="-14" className={'pm-label' + (p.kind === 'home' ? ' pm-label--home' : '')} fontSize={p.kind === 'home' ? 12 : 10.5}>
                    {p.kind === 'home' ? 'Smeštaj' : p.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div className="pinmap__ctrls">
          <button type="button" className="pm-btn" onClick={() => zoomAt(1 / 1.5)} aria-label="Uvećaj">
            <Plus size={20} />
          </button>
          <button type="button" className="pm-btn" onClick={() => zoomAt(1.5)} aria-label="Umanji">
            <Minus size={20} />
          </button>
          <button type="button" className="pm-btn" onClick={centerHome} aria-label="Centriraj na smeštaj">
            <Crosshair size={20} />
          </button>
        </div>
        <div className="pinmap__badge">Skica · nije GPS</div>
      </div>

      {!day && (
        <div className="seg seg--sm pinmap__presets">
          <button type="button" className="seg__btn" onClick={() => setVb(PRESETS.kraj())}>
            Naš kraj
          </button>
          <button type="button" className="seg__btn" onClick={() => setVb(PRESETS.pariz())}>
            Ceo Pariz
          </button>
        </div>
      )}

      {showFilters && (
        <div className="chips pinmap__filters">
          {(Object.keys(KIND_META) as PinKind[]).map((kd) => (
            <button
              type="button"
              key={kd}
              className={'chip chip--pin' + (kinds[kd] ? ' is-active' : '')}
              aria-pressed={kinds[kd]}
              onClick={() => setKinds((c) => ({ ...c, [kd]: !c[kd] }))}
            >
              <i className="pin-dot" style={{ background: KIND_META[kd].color }} /> {KIND_META[kd].label}
            </button>
          ))}
        </div>
      )}

      {sel ? (
        <section className="card pinmap__info fade-in" aria-live="polite">
          <button type="button" className="icon-btn icon-btn--sm pinmap__close" onClick={() => setSel(null)} aria-label="Zatvori">
            <X size={18} />
          </button>
          <div className="card__eyebrow">
            <i className="pin-dot" style={{ background: KIND_META[sel.kind].color }} /> {KIND_META[sel.kind].label}
          </div>
          <div className="pinmap__name">{sel.name}</div>
          {sel.sub && <div className="small muted">{sel.sub}</div>}
          {sel.address && <div className="pinmap__addr">{sel.address}</div>}
          {sel.kind !== 'home' && (
            <div className="pinmap__dist">
              Od smeštaja ≈ {selDist.toFixed(1).replace('.', ',')} km vazdušnom linijom
              {selDist < 3 ? ` · peške oko ${walkMinutes(selDist)} min` : ' · bolje metroom'}
            </div>
          )}
          <div className="row-actions">
            {sel.address && <CopyButton text={sel.address} label="Kopiraj adresu" />}
            {sel.placeId && (
              <button type="button" className="btn btn--ghost" onClick={() => go('vise/restorani/' + sel.placeId)}>
                Detalji <ChevronRight size={16} />
              </button>
            )}
            {sel.kind === 'home' && (
              <button type="button" className="btn btn--ghost" onClick={() => go('kuca')}>
                Kako do kuće <ChevronRight size={16} />
              </button>
            )}
          </div>
        </section>
      ) : (
        <p className="small muted pinmap__hint">Dodirnite pin za detalje · prevlačite za pomeranje · dva prsta za zum.</p>
      )}
    </div>
  );
}
