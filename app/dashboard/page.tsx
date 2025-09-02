export default function DashboardPage() {
  return (
    <main className="container" style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:"1.25rem", paddingTop:"1rem" }}>
      <aside className="sidebar">
        <div className="kicker" style={{ marginBottom:".5rem" }}>Navigation</div>
        <div className="stack">
          <a className="nav-item" href="/dashboard">Overview</a>
          <a className="nav-item" href="/free">Free Tools</a>
          <a className="nav-item" href="/pricing">Upgrade</a>
        </div>
      </aside>
      <section className="stack-lg">
        <div className="grid-3">
          <div className="card"><div className="subtle">Resume Score</div><div className="h2">86</div></div>
          <div className="card"><div className="subtle">Applications</div><div className="h2">12</div></div>
          <div className="card"><div className="subtle">Interview Rate</div><div className="h2">25%</div></div>
        </div>
        <div className="card"><div className="h2">Welcome</div><p className="subtle">Your career analytics and tools live here.</p></div>
      </section>
    </main>
  );
}
