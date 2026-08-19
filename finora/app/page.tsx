"use client";

import { useMemo, useState } from "react";

type Tx = { id: number; name: string; category: string; date: string; amount: number; icon: string; kind: "income" | "expense" };

const initialTransactions: Tx[] = [
  { id: 1, name: "Estúdio Acme", category: "Salário", date: "18 ago", amount: 4250, icon: "A", kind: "income" },
  { id: 2, name: "Mercado Verde", category: "Supermercado", date: "17 ago", amount: -84.32, icon: "M", kind: "expense" },
  { id: 3, name: "Passe Metrô", category: "Transporte", date: "16 ago", amount: -42, icon: "M", kind: "expense" },
  { id: 4, name: "Cloudbox", category: "Assinaturas", date: "15 ago", amount: -12.99, icon: "C", kind: "expense" },
  { id: 5, name: "Projeto freelance", category: "Renda extra", date: "14 ago", amount: 780, icon: "F", kind: "income" },
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
  const [form, setForm] = useState({ name: "", amount: "", category: "Outros", kind: "expense" as "income" | "expense" });
  const points = chartSets[period];
  const path = points.map((n, i) => `${i ? "L" : "M"} ${i * (440 / (points.length - 1))} ${112 - n}`).join(" ");
  const balance = useMemo(() => 12484.20 + transactions.slice(initialTransactions.length).reduce((sum, tx) => sum + tx.amount, 0), [transactions]);

  function addTransaction(e: React.FormEvent) {
    e.preventDefault();
    const value = Number(form.amount);
    if (!form.name.trim() || !value) return;
    const tx: Tx = { id: Date.now(), name: form.name, category: form.category, date: "Hoje", amount: form.kind === "expense" ? -Math.abs(value) : Math.abs(value), icon: form.name[0].toUpperCase(), kind: form.kind };
    setTransactions([tx, ...transactions]);
    setForm({ name: "", amount: "", category: "Outros", kind: "expense" });
    setOpen(false);
    setNotice("Transação adicionada com sucesso");
    window.setTimeout(() => setNotice(""), 2400);
  }

  return (
    <main className="shell">
      <aside className="side">
        <div className="logo"><span>f</span>finora</div>
        <nav aria-label="Navegação principal">
          <p>Menu</p>
          <button className="active"><span>⌂</span>Visão geral</button>
          <button><span>↕</span>Transações</button>
          <button><span>◎</span>Análises</button>
          <button><span>♧</span>Metas</button>
          <p>Finanças</p>
          <button><span>▣</span>Contas</button>
          <button><span>□</span>Orçamentos</button>
        </nav>
        <div className="upgrade"><span>✦</span><strong>Descubra novas análises</strong><small>Veja previsões e crie metas ilimitadas.</small><button onClick={() => setNotice("Fluxo de assinatura pronto")}>Conheça o premium</button></div>
        <div className="user"><span>JD</span><div><strong>Joseph D.</strong><small>Conta pessoal</small></div><button aria-label="Abrir perfil">⌄</button></div>
      </aside>

      <section className="main">
        <header className="top"><div><h1>Bom dia, Joseph</h1><p>Confira o que está acontecendo com seu dinheiro.</p></div><div><button className="round" aria-label="Buscar">⌕</button><button className="round" aria-label="Notificações">♢<i /></button><button className="add" onClick={() => setOpen(true)}>＋ Adicionar transação</button></div></header>

        <div className="dashboard">
          <section className="balance-card">
            <div className="balance-head"><div><span>Saldo total <button aria-label="Ocultar saldo">⊙</button></span><strong>{balance.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong><small><b>↑ 8,4%</b> em relação ao mês passado</small></div><div className="periods">{Object.keys(chartSets).map(p => <button key={p} className={period === p ? "active" : ""} onClick={() => setPeriod(p)}>{p}</button>)}</div></div>
            <div className="chart-wrap">
              <div className="axis"><span>R$16k</span><span>R$12k</span><span>R$8k</span><span>R$4k</span></div>
              <svg viewBox="0 0 440 120" preserveAspectRatio="none" aria-label={`Tendência do saldo em ${period}`}>
                <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2a725a" stopOpacity=".22"/><stop offset="1" stopColor="#2a725a" stopOpacity="0"/></linearGradient></defs>
                <path className="area" d={`${path} L 440 120 L 0 120 Z`} /><path className="line" d={path}/>
              </svg>
              <div className="months"><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span><span>Jul</span><span>Ago</span></div>
            </div>
          </section>

          <section className="quick"><article><div><span className="qicon income">↙</span><small>Receitas</small></div><strong>R$ 5.030,00</strong><p><b>↑ 12,5%</b> vs. mês passado</p></article><article><div><span className="qicon expense">↗</span><small>Despesas</small></div><strong>R$ 2.184,60</strong><p><em>↓ 3,2%</em> vs. mês passado</p></article></section>

          <section className="spending card">
            <header><div><h2>Gastos por categoria</h2><p>1–18 de agosto</p></div><button>•••</button></header>
            <div className="donut-row"><div className="donut"><div><strong>R$ 2.184</strong><span>Total gasto</span></div></div><div className="legend"><p><i className="housing"/><span>Moradia</span><b>R$ 980</b><small>45%</small></p><p><i className="food"/><span>Alimentação</span><b>R$ 482</b><small>22%</small></p><p><i className="transport"/><span>Transporte</span><b>R$ 306</b><small>14%</small></p><p><i className="other"/><span>Outros</span><b>R$ 416</b><small>19%</small></p></div></div>
          </section>

          <section className="budget card"><header><div><h2>Orçamento mensal</h2><p>5 categorias</p></div><button>Ver tudo</button></header><div className="budget-total"><span><b>R$ 2.184</b> de R$ 3.200 gastos</span><strong>68%</strong></div><div className="budget-bar"><i/></div><div className="budget-stats"><span><small>Restante</small><b>R$ 1.016</b></span><span><small>Média diária</small><b>R$ 121</b></span><span><small>Dias restantes</small><b>13</b></span></div><div className="insight"><span>✦</span><p><strong>Você está no caminho certo</strong><small>Neste ritmo, economizará R$ 240 além do planejado.</small></p></div></section>

          <section className="transactions card"><header><div><h2>Transações recentes</h2><p>Últimas movimentações da sua conta</p></div><button onClick={() => setNotice("Todas as transações foram carregadas")}>Ver tudo</button></header><div className="tx-list">{transactions.slice(0,5).map(tx => <article key={tx.id}><span className={`tx-icon ${tx.kind}`}>{tx.icon}</span><div><strong>{tx.name}</strong><small>{tx.category}</small></div><time>{tx.date}</time><b className={tx.kind}>{tx.amount > 0 ? "+" : "−"}{Math.abs(tx.amount).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</b><button aria-label={`Abrir ${tx.name}`}>›</button></article>)}</div></section>
        </div>
      </section>

      {open && <div className="modal-back" onMouseDown={() => setOpen(false)}><form className="modal" onSubmit={addTransaction} onMouseDown={e => e.stopPropagation()}><div className="modal-head"><div><h2>Adicionar transação</h2><p>Mantenha seu painel sempre atualizado.</p></div><button type="button" onClick={() => setOpen(false)} aria-label="Fechar">×</button></div><label>Descrição<input autoFocus value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Ex.: Cafeteria"/></label><div className="form-row"><label>Valor<input type="number" min="0" step="0.01" value={form.amount} onChange={e => setForm({...form,amount:e.target.value})} placeholder="0,00"/></label><label>Categoria<select value={form.category} onChange={e => setForm({...form,category:e.target.value})}><option>Outros</option><option>Alimentação</option><option>Transporte</option><option>Salário</option></select></label></div><div className="type-toggle"><button type="button" className={form.kind === "expense" ? "active" : ""} onClick={() => setForm({...form,kind:"expense"})}>Despesa</button><button type="button" className={form.kind === "income" ? "active" : ""} onClick={() => setForm({...form,kind:"income"})}>Receita</button></div><button className="save">Salvar transação</button></form></div>}
      {notice && <div className="notice" role="status">✓ {notice}</div>}
    </main>
  );
}
