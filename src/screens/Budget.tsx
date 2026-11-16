import { useMemo, useState } from 'react';
import { Pencil, Plus, Trash2, Settings2, Check, X } from 'lucide-react';
import { useActions, useStore, type Expense, type ExpenseCategory } from '../store';
import { EXPENSE_CATEGORIES, catMeta } from '../data/budget';
import { TRIP } from '../data/trip';
import { daysBetween, eur, formatDate, parseAmount, todayISO } from '../lib/util';
import { tripDayDates } from '../lib/tripday';
import { PageHeader, Ring, useToast } from '../components/ui';

interface FormState {
  amount: string;
  category: ExpenseCategory;
  note: string;
  date: string;
}

function ExpenseForm({ initial, onSubmit, onCancel, submitLabel }: { initial: FormState; onSubmit: (f: FormState, amount: number) => void; onCancel?: () => void; submitLabel: string }) {
  const [f, setF] = useState<FormState>(initial);
  const [err, setErr] = useState('');
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseAmount(f.amount);
    if (amount === null) {
      setErr('Unesite iznos veći od 0 (npr. 12,50)');
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(f.date)) {
      setErr('Izaberite datum');
      return;
    }
    setErr('');
    onSubmit(f, amount);
  };
  return (
    <form className="expense-form" onSubmit={submit}>
      <div className="amount-field">
        <input
          className="amount-field__input"
          inputMode="decimal"
          placeholder="0,00"
          value={f.amount}
          onChange={(e) => setF({ ...f, amount: e.target.value })}
          aria-label="Iznos u evrima"
        />
        <span className="amount-field__cur">€</span>
      </div>
      <div className="cat-grid" role="radiogroup" aria-label="Kategorija">
        {EXPENSE_CATEGORIES.map((c) => (
          <button
            type="button"
            key={c.id}
            role="radio"
            aria-checked={f.category === c.id}
            className={'cat-btn' + (f.category === c.id ? ' is-active' : '')}
            onClick={() => setF({ ...f, category: c.id })}
          >
            <span className="cat-btn__emoji">{c.emoji}</span>
            <span className="cat-btn__label">{c.label}</span>
          </button>
        ))}
      </div>
      <div className="form-row">
        <label className="field field--grow">
          <span className="field__label">Datum</span>
          <input className="input" type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
        </label>
      </div>
      <label className="field">
        <span className="field__label">Beleška (opciono)</span>
        <input className="input" value={f.note} placeholder="npr. Paloma, ručak" onChange={(e) => setF({ ...f, note: e.target.value })} />
      </label>
      {err && <div className="form-error">{err}</div>}
      <div className="row-actions">
        <button type="submit" className="btn btn--primary btn--grow">
          <Check size={18} /> {submitLabel}
        </button>
        {onCancel && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            <X size={18} /> Otkaži
          </button>
        )}
      </div>
    </form>
  );
}

export default function Budget() {
  const { state } = useStore();
  const { addExpense, editExpense, deleteExpense, setSettings } = useActions();
  const toast = useToast();
  const today = todayISO();
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [budgetInput, setBudgetInput] = useState(String(state.settings.dailyBudget).replace('.', ','));
  const [daysInput, setDaysInput] = useState(String(state.settings.tripDays));
  const [formKey, setFormKey] = useState(0);

  const { dailyBudget, tripDays } = state.settings;
  const totalBudget = dailyBudget * tripDays;
  const total = state.expenses.reduce((a, e) => a + e.amount, 0);
  const spentToday = state.expenses.filter((e) => e.date === today).reduce((a, e) => a + e.amount, 0);
  const remaining = totalBudget - total;
  const elapsed = Math.min(Math.max(daysBetween(TRIP.startDate, today) + 1, 1), tripDays);
  const avg = total / elapsed;

  const byCat = useMemo(() => {
    const m = new Map<string, number>();
    state.expenses.forEach((e) => m.set(e.category, (m.get(e.category) || 0) + e.amount));
    return EXPENSE_CATEGORIES.map((c) => ({ ...c, sum: m.get(c.id) || 0 }))
      .filter((c) => c.sum > 0)
      .sort((a, b) => b.sum - a.sum);
  }, [state.expenses]);

  const byDate = useMemo(() => {
    const m = new Map<string, Expense[]>();
    [...state.expenses]
      .sort((a, b) => (a.date === b.date ? b.createdAt - a.createdAt : a.date < b.date ? 1 : -1))
      .forEach((e) => {
        if (!m.has(e.date)) m.set(e.date, []);
        m.get(e.date)!.push(e);
      });
    return [...m.entries()];
  }, [state.expenses]);

  const dates = tripDayDates(tripDays);
  const perDay = dates.map((d) => ({ d, sum: state.expenses.filter((e) => e.date === d).reduce((a, e) => a + e.amount, 0) }));
  const maxDay = Math.max(dailyBudget, ...perDay.map((p) => p.sum));

  const todayLeft = dailyBudget - spentToday;

  let summary = '';
  if (total === 0) summary = 'Još nema unetih troškova. Dodajte prvi trošak dugmetom ispod.';
  else if (remaining >= 0)
    summary = `Potrošili ste ${eur(total)} od ${eur(totalBudget, 0)}. Ostalo je ${eur(remaining)} — u proseku ${eur(avg)} po danu, ${avg <= dailyBudget ? 'u okviru plana. Santé ! 🍷' : 'malo iznad dnevnog plana.'}`;
  else summary = `Prekoračili ste budžet za ${eur(-remaining)}. Nije strašno — Pariz se ne posećuje svaki dan.`;

  return (
    <div className="screen">
      <PageHeader title="Troškovi" kicker="Budžet za dvoje">
        <button type="button" className="icon-btn header-action" onClick={() => setShowSettings(!showSettings)} aria-label="Podešavanje budžeta">
          <Settings2 size={20} />
        </button>
      </PageHeader>

      {showSettings && (
        <section className="card fade-in">
          <h3 className="section-title">Podešavanje budžeta</h3>
          <div className="form-row">
            <label className="field field--grow">
              <span className="field__label">Dnevni budžet (€, za dvoje)</span>
              <input className="input" inputMode="decimal" value={budgetInput} onChange={(e) => setBudgetInput(e.target.value)} />
            </label>
            <label className="field field--grow">
              <span className="field__label">Broj dana</span>
              <input className="input" inputMode="numeric" value={daysInput} onChange={(e) => setDaysInput(e.target.value)} />
            </label>
          </div>
          <button
            type="button"
            className="btn btn--primary btn--block"
            onClick={() => {
              const b = parseAmount(budgetInput);
              const d = Math.round(Number(daysInput));
              if (b === null || !(d >= 1 && d <= 30)) {
                toast('Proverite unete vrednosti');
                return;
              }
              setSettings({ dailyBudget: b, tripDays: d });
              toast('Budžet sačuvan');
              setShowSettings(false);
            }}
          >
            Sačuvaj
          </button>
          <p className="note">Predlog: 120 € dnevno za dvoje × 5 dana (5–9. novembar).</p>
        </section>
      )}

      <section className="card budget-hero">
        <Ring value={totalBudget ? total / totalBudget : 0} size={150} stroke={12} over={remaining < 0}>
          <div className="ring__label">{remaining >= 0 ? 'Preostalo' : 'Prekoračeno'}</div>
          <div className="ring__value">{eur(Math.abs(remaining), 0)}</div>
          <div className="ring__sub">od {eur(totalBudget, 0)}</div>
        </Ring>
        <div className="stats">
          <div className="stat">
            <span className="stat__label">Danas</span>
            <span className="stat__value">{eur(spentToday)}</span>
            <span className={'stat__sub' + (todayLeft < 0 ? ' is-over' : '')}>{todayLeft >= 0 ? `još ${eur(todayLeft, 0)} danas` : `${eur(-todayLeft, 0)} preko`}</span>
          </div>
          <div className="stat">
            <span className="stat__label">Ukupno</span>
            <span className="stat__value">{eur(total)}</span>
          </div>
          <div className="stat">
            <span className="stat__label">Prosek / dan</span>
            <span className="stat__value">{eur(avg)}</span>
            <span className="stat__sub">plan {eur(dailyBudget, 0)}</span>
          </div>
        </div>
      </section>

      <p className="summary">{summary}</p>

      {!adding ? (
        <button type="button" className="btn btn--primary btn--block btn--lg" onClick={() => setAdding(true)}>
          <Plus size={20} /> Dodaj trošak
        </button>
      ) : (
        <section className="card fade-in">
          <h3 className="section-title">Novi trošak</h3>
          <ExpenseForm
            key={formKey}
            submitLabel="Sačuvaj trošak"
            initial={{ amount: '', category: 'kafa', note: '', date: today }}
            onCancel={() => setAdding(false)}
            onSubmit={(f, amount) => {
              addExpense({ amount, category: f.category, note: f.note.trim(), date: f.date });
              toast(`Dodato: ${eur(amount)}`);
              setFormKey((k) => k + 1);
              setAdding(false);
            }}
          />
        </section>
      )}

      {/* Po danima */}
      <section className="card">
        <h3 className="section-title">Po danima</h3>
        <div className="day-bars">
          {perDay.map(({ d, sum }) => (
            <div key={d} className={'day-bar' + (d === today ? ' is-today' : '')}>
              <span className="day-bar__label">{formatDate(d)}</span>
              <span className="day-bar__track">
                <span className={'day-bar__fill' + (sum > dailyBudget ? ' is-over' : '')} style={{ width: `${maxDay ? (sum / maxDay) * 100 : 0}%` }} />
                <span className="day-bar__limit" style={{ left: `${(dailyBudget / maxDay) * 100}%` }} />
              </span>
              <span className="day-bar__sum">{eur(sum, 0)}</span>
            </div>
          ))}
        </div>
        <p className="small muted">Linija označava dnevni budžet ({eur(dailyBudget, 0)}).</p>
      </section>

      {byCat.length > 0 && (
        <section className="card">
          <h3 className="section-title">Po kategorijama</h3>
          {byCat.map((c) => (
            <div key={c.id} className="cat-bar">
              <span className="cat-bar__label">
                {c.emoji} {c.label}
              </span>
              <span className="cat-bar__track">
                <span style={{ width: `${(c.sum / total) * 100}%` }} />
              </span>
              <span className="cat-bar__sum">{eur(c.sum, 0)}</span>
            </div>
          ))}
        </section>
      )}

      <section>
        <h3 className="section-title">Svi troškovi</h3>
        {byDate.length === 0 && <p className="muted small">Lista je prazna.</p>}
        {byDate.map(([date, list]) => (
          <div key={date} className="exp-group">
            <div className="exp-group__head">
              <span>{formatDate(date, true)}</span>
              <span>{eur(list.reduce((a, e) => a + e.amount, 0))}</span>
            </div>
            {list.map((e) =>
              editId === e.id ? (
                <div key={e.id} className="card fade-in">
                  <ExpenseForm
                    submitLabel="Sačuvaj izmene"
                    initial={{ amount: String(e.amount).replace('.', ','), category: e.category, note: e.note, date: e.date }}
                    onCancel={() => setEditId(null)}
                    onSubmit={(f, amount) => {
                      editExpense(e.id, { amount, category: f.category, note: f.note.trim(), date: f.date });
                      setEditId(null);
                      toast('Izmenjeno');
                    }}
                  />
                </div>
              ) : (
                <div key={e.id} className="exp-row">
                  <span className="exp-row__emoji">{catMeta(e.category).emoji}</span>
                  <span className="exp-row__body">
                    <span className="exp-row__cat">{catMeta(e.category).label}</span>
                    {e.note && <span className="exp-row__note">{e.note}</span>}
                  </span>
                  <span className="exp-row__amt">{eur(e.amount)}</span>
                  <button type="button" className="icon-btn icon-btn--sm" onClick={() => setEditId(e.id)} aria-label="Izmeni">
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    className="icon-btn icon-btn--sm"
                    onClick={() => {
                      if (window.confirm(`Obrisati trošak ${eur(e.amount)}?`)) {
                        deleteExpense(e.id);
                        toast('Obrisano');
                      }
                    }}
                    aria-label="Obriši"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
