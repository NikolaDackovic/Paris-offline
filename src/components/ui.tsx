import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { Check, ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import { copyText } from '../lib/util';
import { LINE_COLORS } from '../data/transport';
import { go } from '../router';

/* ---------- Toast ---------- */
const ToastCtx = createContext<(msg: string) => void>(() => undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<number>();
  const show = useCallback((m: string) => {
    setMsg(m);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMsg(null), 1800);
  }, []);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className={'toast' + (msg ? ' toast--show' : '')} role="status" aria-live="polite">
        {msg}
      </div>
    </ToastCtx.Provider>
  );
}
export const useToast = () => useContext(ToastCtx);

/* ---------- Copy dugme ---------- */
export function CopyButton({ text, label = 'Kopiraj', compact = false }: { text: string; label?: string; compact?: boolean }) {
  const toast = useToast();
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className={'btn-copy' + (compact ? ' btn-copy--compact' : '') + (ok ? ' is-ok' : '')}
      aria-label={label}
      onClick={async (e) => {
        e.stopPropagation();
        const success = await copyText(text);
        setOk(success);
        toast(success ? 'Kopirano ✓' : 'Kopiranje nije uspelo — označite tekst ručno');
        window.setTimeout(() => setOk(false), 1500);
      }}
    >
      {ok ? <Check size={16} /> : <Copy size={16} />}
      {!compact && <span>{ok ? 'Kopirano' : label}</span>}
    </button>
  );
}

/* ---------- Zaglavlje podstrane ---------- */
export function PageHeader({ title, kicker, backTo, children }: { title: string; kicker?: string; backTo?: string; children?: ReactNode }) {
  return (
    <header className="page-header">
      {backTo !== undefined && (
        <button type="button" className="back-btn" onClick={() => go(backTo)} aria-label="Nazad">
          <ChevronLeft size={22} />
          <span>Nazad</span>
        </button>
      )}
      {kicker && <div className="kicker">{kicker}</div>}
      <h1 className="page-title">{title}</h1>
      {children}
    </header>
  );
}

/* ---------- Red u listi (link) ---------- */
export function NavRow({ icon, title, sub, to, onClick }: { icon: ReactNode; title: string; sub?: string; to?: string; onClick?: () => void }) {
  return (
    <button type="button" className="nav-row" onClick={onClick || (() => to && go(to))}>
      <span className="nav-row__icon">{icon}</span>
      <span className="nav-row__text">
        <span className="nav-row__title">{title}</span>
        {sub && <span className="nav-row__sub">{sub}</span>}
      </span>
      <ChevronRight size={18} className="nav-row__chev" />
    </button>
  );
}

/* ---------- Oznaka metro linije ---------- */
export function LineBadge({ line, size = 'md' }: { line: string; size?: 'sm' | 'md' | 'lg' }) {
  const c = LINE_COLORS[line] || LINE_COLORS.walk;
  return (
    <span className={'line-badge line-badge--' + size} style={{ background: c.bg, color: c.fg }} aria-label={'Linija ' + line}>
      {line}
    </span>
  );
}

/* ---------- Checkbox red ---------- */
export function CheckRow({ checked, onChange, children, onRemove }: { checked: boolean; onChange: () => void; children: ReactNode; onRemove?: () => void }) {
  return (
    <div className={'check-row' + (checked ? ' is-checked' : '')}>
      <button type="button" className="check-row__btn" onClick={onChange} aria-pressed={checked}>
        <span className="check-box">{checked && <Check size={15} strokeWidth={3} />}</span>
        <span className="check-row__label">{children}</span>
      </button>
      {onRemove && (
        <button type="button" className="check-row__remove" onClick={onRemove} aria-label="Ukloni stavku">
          ×
        </button>
      )}
    </div>
  );
}

/* ---------- Kružni indikator napretka ---------- */
export function Ring({ value, size = 120, stroke = 10, children, over = false }: { value: number; size?: number; stroke?: number; children?: ReactNode; over?: boolean }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(1, value));
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={over ? 'var(--danger)' : 'var(--wine)'}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset .6s ease' }}
        />
      </svg>
      <div className="ring__center">{children}</div>
    </div>
  );
}

export function Pill({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'wine' | 'ok' | 'warn' }) {
  return <span className={'pill pill--' + tone}>{children}</span>;
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="note">{children}</p>;
}
