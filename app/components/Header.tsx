"use client";
import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();
  const active = (p:string)=> pathname===p ? "nav-item active" : "nav-item";
  return (
    <header className="header">
      <div className="header-inner container">
        <div style={{display:"flex",alignItems:"center",gap:".6rem"}}>
          <div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(180deg,#1E3A8A,#173470)"}}/>
          <strong style={{fontFamily:"var(--font-heading)",fontSize:"1.1rem"}}>Momentum2025</strong>
        </div>
        <nav style={{display:"flex",gap:".6rem",alignItems:"center"}}>
          <a className={active("/")} href="/">Home</a>
          <a className={active("/free")} href="/free">Free Tools</a>
          <a className={active("/dashboard")} href="/dashboard">Dashboard</a>
          <a className={active("/pricing")} href="/pricing">Pricing</a>
          <a className="btn btn-outline" href="/free">Start Free</a>
          <a className="btn btn-primary" href="/pricing">Go Pro</a>
        </nav>
      </div>
    </header>
  );
}
