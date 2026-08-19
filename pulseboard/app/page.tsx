"use client";

import { useMemo, useState } from "react";

type Task = { id: number; title: string; tag: string; priority: "High" | "Medium" | "Low"; owner: string; due: string };
type Column = { id: string; title: string; tone: string; tasks: Task[] };

const seed: Column[] = [
  { id: "backlog", title: "Backlog", tone: "#8b92a1", tasks: [
    { id: 1, title: "Map onboarding journey", tag: "Research", priority: "Medium", owner: "LM", due: "Aug 22" },
    { id: 2, title: "Audit notification rules", tag: "Product", priority: "Low", owner: "JR", due: "Aug 25" },
  ]},
  { id: "progress", title: "In progress", tone: "#6c63ff", tasks: [
    { id: 3, title: "Build analytics overview", tag: "Frontend", priority: "High", owner: "AK", due: "Today" },
    { id: 4, title: "Finalize component tokens", tag: "Design", priority: "Medium", owner: "MS", due: "Aug 21" },
    { id: 5, title: "Add team permissions", tag: "Backend", priority: "High", owner: "JR", due: "Aug 23" },
  ]},
  { id: "review", title: "In review", tone: "#e8a43a", tasks: [
    { id: 6, title: "Improve empty states", tag: "UX", priority: "Medium", owner: "LM", due: "Today" },
    { id: 7, title: "Optimize API responses", tag: "Backend", priority: "High", owner: "AK", due: "Aug 20" },
  ]},
  { id: "done", title: "Done", tone: "#31b77a", tasks: [
    { id: 8, title: "Release design system v2", tag: "Design", priority: "Low", owner: "MS", due: "Aug 18" },
  ]},
];

const icons: Record<string, string> = { Overview: "⌂", Projects: "◫", Calendar: "□", Reports: "↗" };

export default function Home() {
  const [columns, setColumns] = useState(seed);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("Projects");
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
    setToast(`“${task.title}” moved to ${next[index + 1].title}`);
    window.setTimeout(() => setToast(""), 2600);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">P</span><span>Pulseboard</span></div>
        <nav aria-label="Primary navigation">
          <p className="eyebrow">Workspace</p>
          {Object.keys(icons).map(item => (
            <button key={item} className={`nav-item ${active === item ? "active" : ""}`} onClick={() => setActive(item)}>
              <span aria-hidden>{icons[item]}</span>{item}
            </button>
          ))}
        </nav>
        <div className="teams">
          <p className="eyebrow">Teams</p>
          <button className="team"><span className="team-dot coral" />Product</button>
          <button className="team"><span className="team-dot violet" />Engineering</button>
          <button className="team"><span className="team-dot green" />Marketing</button>
        </div>
        <div className="profile"><span className="avatar">JD</span><span><strong>Joseph Developer</strong><small>joseph@example.com</small></span><button aria-label="Profile settings">•••</button></div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="search"><span aria-hidden>⌕</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tasks, tags or people…" aria-label="Search tasks" /><kbd>⌘ K</kbd></div>
          <div className="top-actions"><button className="icon-btn" aria-label="Notifications">♢<span className="notification" /></button><span className="header-avatar">JD</span></div>
        </header>

        <div className="content">
          <div className="title-row">
            <div><p className="breadcrumb">Projects / Website redesign</p><h1>Website redesign</h1><p className="subtitle">Plan, prioritize and ship the new experience.</p></div>
            <div className="title-actions"><div className="avatar-stack"><span>MS</span><span>AK</span><span>LM</span><span>+4</span></div><button className="secondary">Share</button><button className="primary" onClick={() => setToast("New task flow ready for connection")}>＋ Add task</button></div>
          </div>

          <div className="stats" aria-label="Project summary">
            <article><span className="stat-icon purple">◫</span><div><small>Total tasks</small><strong>{columns.reduce((sum, c) => sum + c.tasks.length, 0)}</strong></div><em>+12%</em></article>
            <article><span className="stat-icon amber">◷</span><div><small>In progress</small><strong>{columns[1].tasks.length}</strong></div><em>2 due today</em></article>
            <article><span className="stat-icon green">✓</span><div><small>Completed</small><strong>68%</strong></div><div className="progress"><i /></div></article>
            <article><span className="stat-icon blue">◎</span><div><small>Team velocity</small><strong>24 <small>pts</small></strong></div><em>↑ 8%</em></article>
          </div>

          <div className="board-tools"><div className="view-tabs"><button className="selected">▦ Board</button><button>☷ List</button><button>▤ Timeline</button></div><div><button className="tool-btn">▽ Filter</button><button className="tool-btn">↕ Sort</button><button className="tool-btn">•••</button></div></div>

          <div className="board">
            {filtered.map(column => (
              <section className="column" key={column.id} aria-label={column.title}>
                <header><span className="column-dot" style={{ background: column.tone }} /><h2>{column.title}</h2><span className="count">{column.tasks.length}</span><button aria-label={`Add to ${column.title}`}>＋</button></header>
                <div className="cards">
                  {column.tasks.map(task => (
                    <article className="task" key={task.id}>
                      <div className="task-top"><span className={`tag ${task.tag.toLowerCase()}`}>{task.tag}</span><button aria-label="Task menu">•••</button></div>
                      <h3>{task.title}</h3>
                      <div className="task-meta"><span className={`priority ${task.priority.toLowerCase()}`}>● {task.priority}</span><span>◷ {task.due}</span></div>
                      <footer><span className="mini-avatar">{task.owner}</span><span>▢ {task.id % 3 + 1}</span><button onClick={() => advance(column.id, task.id)} disabled={column.id === "done"} aria-label={`Move ${task.title} forward`}>→</button></footer>
                    </article>
                  ))}
                  {column.tasks.length === 0 && <div className="empty">No matching tasks</div>}
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
