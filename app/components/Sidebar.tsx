"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar(){
  const path = usePathname();
  const active = (p:string)=> path===p ? "side-link active" : "side-link";
  return (
    <aside className="sidebar">
      <div className="logoRow">
        <div className="logoDot" />
        <div className="brand">Momentum2025</div>
      </div>
      <nav className="side-nav">
        <Link className={active("/")} href="/">Welcome</Link>
        <Link className={active("/profile")} href="/profile">Profile</Link>
        <Link className={active("/dashboard")} href="/dashboard">Dashboard</Link>
        <Link className={active("/pro")} href="/pro">Pro Services</Link>
      </nav>
    </aside>
  );
}
