"use client";

import { useMemo, useState } from "react";

type Task = { id: number; title: string; tag: string; priority: "Alta" | "Média" | "Baixa"; owner: string; due: string };
type Column = { id: string; title: string; tone: string; tasks: Task[] };

const seed: Column[] = [
  { id: "backlog", title: "Pendentes", tone: "#8b92a1", tasks: [
    { id: 1, title: "Mapear jornada de integração", tag: "Pesquisa", priority: "Média", owner: "LM", due: "22 ago" },
    { id: 2, title: "Revisar regras de notificação", tag: "Produto", priority: "Baixa", owner: "JR", due: "25 ago" },
  ]},
  { id: "progress", title: "Em andamento", tone: "#6c63ff", tasks: [
    { id: 3, title: "Criar visão geral de métricas", tag: "Frontend", priority: "Alta", owner: "AK", due: "Hoje" },
    { id: 4, title: "Finalizar tokens de componentes", tag: "Design", priority: "Média", owner: "MS", due: "21 ago" },
    { id: 5, title: "Adicionar permissões da equipe", tag: "Backend", priority: "Alta", owner: "JR", due: "23 ago" },
  ]},
  { id: "review", title: "Em revisão", tone: "#e8a43a", tasks: [
    { id: 6, title: "Melhorar estados vazios", tag: "UX", priority: "Média", owner: "LM", due: "Hoje" },
    { id: 7, title: "Otimizar respostas da API", tag: "Backend", priority: "Alta", owner: "AK", due: "20 ago" },
  ]},
  { id: "done", title: "Concluídas", tone: "#31b77a", tasks: [
    { id: 8, title: "Publicar design system v2", tag: "Design", priority: "Baixa", owner: "MS", due: "18 ago" },
  ]},
];

const icons: Record<string, string> = { "Visão geral": "⌂", Projetos: "◫", Calendário: "□", Relatórios: "↗" };

export default function Home() {
  const [columns, setColumns] = useState(seed);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("Projetos");
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => columns.map(col => ({
    ...col,
    tasks: col.tasks.filter(task => `${task.title} ${task.tag} ${task.owner}`.toLowerCase().includes(query.toLowerCase())),
  })), [columns, query]);

  function advance(columnId: string, taskId: number) {
    const index = columns.findIndex(c => c.id === columnId);
    if (index < 0 || index === columns.length - 1) return;
    const task = columns[index].tasks.find(t => t.id === taskId);
    if (!task) return;
    const next = columns.map(c => ({ ...c, tasks: [...c.tasks] }));
    next[index].tasks = next[index].tasks.filter(t => t.id !== taskId);
    next[index + 1].tasks.unshift(task);
    setColumns(next);
    setToast(`“${task.title}” movida para ${next[index + 1].title}`);
    window.setTimeout(() => setToast(""), 2600);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">P</span><span>Pulseboard</span></div>
        <nav aria-label="Navegação principal">
          <p className="eyebrow">Área de trabalho</p>
          {Object.keys(icons).map(item => (
            <button key={item} className={`nav-item ${active === item ? "active" : ""}`} onClick={() => setActive(item)}>
              <span aria-hidden>{icons[item]}</span>{item}
            </button>
          ))}
        </nav>
        <div className="teams">
          <p className="eyebrow">Equipes</p>
          <button className="team"><span className="team-dot coral" />Produto</button>
          <button className="team"><span className="team-dot violet" />Engenharia</button>
          <button className="team"><span className="team-dot green" />Marketing</button>
        </div>
        <div className="profile"><span className="avatar">JD</span><span><strong>Joseph Desenvolvedor</strong><small>joseph@example.com</small></span><button aria-label="Configurações do perfil">•••</button></div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="search"><span aria-hidden>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar tarefas, etiquetas ou pessoas…" aria-label="Buscar tarefas" /><kbd>⌘ K</kbd></div>
          <div className="top-actions"><button className="icon-btn" aria-label="Notificações">♢<span className="notification" /></button><span className="header-avatar">JD</span></div>
        </header>

        <div className="content">
          <div className="title-row">
            <div><p className="breadcrumb">Projetos / Reformulação do site</p><h1>Reformulação do site</h1><p className="subtitle">Planeje, priorize e entregue a nova experiência.</p></div>
            <div className="title-actions"><div className="avatar-stack"><span>MS</span><span>AK</span><span>LM</span><span>+4</span></div><button className="secondary">Compartilhar</button><button className="primary" onClick={() => setToast("Fluxo de nova tarefa pronto")}>＋ Adicionar tarefa</button></div>
          </div>

          <div className="stats" aria-label="Resumo do projeto">
            <article><span className="stat-icon purple">◫</span><div><small>Total de tarefas</small><strong>{columns.reduce((sum, c) => sum + c.tasks.length, 0)}</strong></div><em>+12%</em></article>
            <article><span className="stat-icon amber">◷</span><div><small>Em andamento</small><strong>{columns[1].tasks.length}</strong></div><em>2 vencem hoje</em></article>
            <article><span className="stat-icon green">✓</span><div><small>Concluído</small><strong>68%</strong></div><div className="progress"><i /></div></article>
            <article><span className="stat-icon blue">◎</span><div><small>Velocidade da equipe</small><strong>24 <small>pts</small></strong></div><em>↑ 8%</em></article>
          </div>

          <div className="board-tools"><div className="view-tabs"><button className="selected">▦ Quadro</button><button>☷ Lista</button><button>▤ Linha do tempo</button></div><div><button className="tool-btn">▽ Filtrar</button><button className="tool-btn">↕ Ordenar</button><button className="tool-btn">•••</button></div></div>

          <div className="board">
            {filtered.map(column => (
              <section className="column" key={column.id} aria-label={column.title}>
                <header><span className="column-dot" style={{ background: column.tone }} /><h2>{column.title}</h2><span className="count">{column.tasks.length}</span><button aria-label={`Adicionar em ${column.title}`}>＋</button></header>
                <div className="cards">
                  {column.tasks.map(task => (
                    <article className="task" key={task.id}>
                      <div className="task-top"><span className={`tag ${task.tag.toLowerCase()}`}>{task.tag}</span><button aria-label="Menu da tarefa">•••</button></div>
                      <h3>{task.title}</h3>
                      <div className="task-meta"><span className={`priority ${task.priority.toLowerCase()}`}>● {task.priority}</span><span>◷ {task.due}</span></div>
                      <footer><span className="mini-avatar">{task.owner}</span><span>▢ {task.id % 3 + 1}</span><button onClick={() => advance(column.id, task.id)} disabled={column.id === "done"} aria-label={`Avançar ${task.title}`}>→</button></footer>
                    </article>
                  ))}
                  {column.tasks.length === 0 && <div className="empty">Nenhuma tarefa encontrada</div>}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
      {toast && <div className="toast" role="status">✓ {toast}</div>}
    </main>
  );
}
