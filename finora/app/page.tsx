"use client";

import { useMemo, useState } from "react";

type Tx = { id: number; name: string; category: string; date: string; amount: number; icon: string; kind: "income" | "expense" };

const initialTransactions: Tx[] = [
  { id: 1, name: "Acme Studio", category: "Salary", date: "Aug 18", amount: 4250, icon: "A", kind: "income" },
  { id: 2, name: "Green Market", category: "Groceries", date: "Aug 17", amount: -84.32, icon: "G", kind: "expense" },
  { id: 3, name: "Metro Pass", category: "Transport", date: "Aug 16", amount: -42, icon: "M", kind: "expense" },
  { id: 4, name: "Cloudbox", category: "Subscriptions", date: "Aug 15", amount: -12.99, icon: "C", kind: "expense" },
  { id: 5, name: "Freelance project", category: "Side income", date: "Aug 14", amount: 780, icon: "F", kind: "income" },
];

const chartSets: Record<string, number[]> = {
  "1M": [28,34,30,42,38,46,44,55,51,63,59,68],
  "3M": [22,30,28,36,44,40,49,55,52,60,67,72],
  "1Y": [18,26,32,29,40,48,45,56,61,58,70,76],
};

export default function Home() {
  const [period, setPeriod] = useState("1M");
  const [transactions, setTransactions] = useState(initialTransactions);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ name: "", amount: "", category: "Other", kind: "expense" as "income" | "expense" });
  const points = chartSets[period];
  const path = points.map((n, i) => `${i ? "L" : "M"} ${i * (440 / (points.length - 1))} ${112 - n}`).join(" ");
  const balance = useMemo(() => 12484.20 + transactions.slice(initialTransactions.length).reduce((sum, tx) => sum + tx.amount, 0), [transactions]);

  function addTransaction(e: React.FormEvent) {
    e.preventDefault();
    const value = Number(form.amount);
    if (!form.name.trim() || !value) return;
    const tx: Tx = { id: Date.now(), name: form.name, category: form.category, date: "Today", amount: form.kind === "expense" ? -Math.abs(value) : Math.abs(value), icon: form.name[0].toUpperCase(), kind: form.kind };
    setTransactions([tx, ...transactions]);
    setForm({ name: "", amount: "", category: "Other", kind: "expense" });
    setOpen(false);
    setNotice("Transaction added successfully");
    window.setTimeout(() => setNotice(""), 2400);
  }

  return (
    <main className="shell">
      <aside className="side">
        <div className="logo"><span>f</span>finora</div>
        <nav aria-label="Main navigation">
          <p>Menu</p>
          <button className="active"><span>⌂</span>Overview</button>
          <button><span>↕</span>Transactions</button>
          <button><span>◎</span>Analytics</button>
          <button><span>♧</span>Goals</button>
          <p>Finance</p>
          <button><span>▣</span>Accounts</button>
          <button><span>□</span>Budgets</button>
        </nav>
        <div className="upgrade"><span>✦</span><strong>Unlock more insights</strong><small>See forecasts and build unlimited goals.</small><button onClick={() => setNotice("Upgrade flow ready")}>Explore premium</button></div>
        <div className="user"><span>JD</span><div><strong>Joseph D.</strong><small>Personal account</small></div><button aria-label="Open profile">⌄</button></div>
      </aside>

      <section className="main">
        <header className="top"><div><h1>Good morning, Joseph</h1><p>Here’s what’s happening with your money.</p></div><div><button className="round" aria-label="Search">⌕</button><button className="round" aria-label="Notifications">♢<i /></button><button className="add" onClick={() => setOpen(true)}>＋ Add transaction</button></div></header>

        <div className="dashboard">
          <section className="balance-card">
            <div className="balance-head"><div><span>Total balance <button aria-label="Hide balance">⊙</button></span><strong>${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong><small><b>↑ 8.4%</b> from last month</small></div><div className="periods">{Object.keys(chartSets).map(p => <button key={p} className={period === p ? "active" : ""} onClick={() => setPeriod(p)}>{p}</button>)}</div></div>
            <div className="chart-wrap">
              <div className="axis"><span>$16k</span><span>$12k</span><span>$8k</span><span>$4k</span></div>
              <svg viewBox="0 0 440 120" preserveAspectRatio="none" aria-label={`${period} balance trend`}>
                <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2a725a" stopOpacity=".22"/><stop offset="1" stopColor="#2a725a" stopOpacity="0"/></linearGradient></defs>
                <path className="area" d={`${path} L 440 120 L 0 120 Z`} /><path className="line" d={path}/>
              </svg>
              <div className="months"><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span></div>
            </div>
          </section>

          <section className="quick"><article><div><span className="qicon income">↙</span><small>Income</small></div><strong>$5,030.00</strong><p><b>↑ 12.5%</b> vs last month</p></article><article><div><span className="qicon expense">↗</span><small>Expenses</small></div><strong>$2,184.60</strong><p><em>↓ 3.2%</em> vs last month</p></article></section>

          <section className="spending card">
            <header><div><h2>Spending by category</h2><p>August 1–18</p></div><button>•••</button></header>
            <div className="donut-row"><div className="donut"><div><strong>$2,184</strong><span>Total spent</span></div></div><div className="legend"><p><i className="housing"/><span>Housing</span><b>$980</b><small>45%</small></p><p><i className="food"/><span>Food & dining</span><b>$482</b><small>22%</small></p><p><i className="transport"/><span>Transport</span><b>$306</b><small>14%</small></p><p><i className="other"/><span>Other</span><b>$416</b><small>19%</small></p></div></div>
          </section>

          <section className="budget card"><header><div><h2>Monthly budget</h2><p>5 categories</p></div><button>View all</button></header><div className="budget-total"><span><b>$2,184</b> of $3,200 spent</span><strong>68%</strong></div><div className="budget-bar"><i/></div><div className="budget-stats"><span><small>Remaining</small><b>$1,016</b></span><span><small>Daily average</small><b>$121</b></span><span><small>Days left</small><b>13</b></span></div><div className="insight"><span>✦</span><p><strong>You’re on track</strong><small>At this pace, you’ll save $240 more than planned.</small></p></div></section>

          <section className="transactions card"><header><div><h2>Recent transactions</h2><p>Your latest account activity</p></div><button onClick={() => setNotice("All transactions loaded")}>View all</button></header><div className="tx-list">{transactions.slice(0,5).map(tx => <article key={tx.id}><span className={`tx-icon ${tx.kind}`}>{tx.icon}</span><div><strong>{tx.name}</strong><small>{tx.category}</small></div><time>{tx.date}</time><b className={tx.kind}>{tx.amount > 0 ? "+" : "−"}${Math.abs(tx.amount).toLocaleString("en-US",{minimumFractionDigits:2})}</b><button aria-label={`Open ${tx.name}`}>›</button></article>)}</div></section>
        </div>
      </section>

      {open && <div className="modal-back" onMouseDown={() => setOpen(false)}><form className="modal" onSubmit={addTransaction} onMouseDown={e => e.stopPropagation()}><div className="modal-head"><div><h2>Add transaction</h2><p>Keep your dashboard up to date.</p></div><button type="button" onClick={() => setOpen(false)} aria-label="Close">×</button></div><label>Description<input autoFocus value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="e.g. Coffee shop"/></label><div className="form-row"><label>Amount<input type="number" min="0" step="0.01" value={form.amount} onChange={e => setForm({...form,amount:e.target.value})} placeholder="0.00"/></label><label>Category<select value={form.category} onChange={e => setForm({...form,category:e.target.value})}><option>Other</option><option>Food</option><option>Transport</option><option>Salary</option></select></label></div><div className="type-toggle"><button type="button" className={form.kind === "expense" ? "active" : ""} onClick={() => setForm({...form,kind:"expense"})}>Expense</button><button type="button" className={form.kind === "income" ? "active" : ""} onClick={() => setForm({...form,kind:"income"})}>Income</button></div><button className="save">Save transaction</button></form></div>}
      {notice && <div className="notice" role="status">✓ {notice}</div>}
    </main>
  );
}
