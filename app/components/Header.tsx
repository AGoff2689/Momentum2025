"use client";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div style={{ display:"flex", alignItems:"center", gap:".6rem" }}>
          <div style={{ width:28, height:28, borderRadius:6, background:"var(--color-primary)" }} />
          <strong>Momentum2025</strong>
        </div>
        <nav style={{ display:"flex", gap:"1rem" }}>
          <a className="nav-item" href="/">Home</a>
          <a className="nav-item" href="/free">Free Tools</a>
          <a className="nav-item" href="/dashboard">Dashboard</a>
          <a className="nav-item" href="/pricing">Pricing</a>
        </nav>
      </div>
    </header>
  );
}
