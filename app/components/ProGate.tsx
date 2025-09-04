"use client";
import { useEffect, useState } from "react";

export default function ProGate({ children }:{ children: React.ReactNode }) {
  const [pro, setPro] = useState(false);
  useEffect(() => { try { setPro(localStorage.getItem("m25:pro")==="true"); } catch {} }, []);
  if (pro) return <>{children}</>;
  return (
    <div className="card" style={{ padding: 16 }}>
      <strong>Pro feature</strong>
      <p className="subtle">Start a 3-day free trial to unlock this tool.</p>
      <a className="btn btn-primary" href="/profile">Start Trial</a>
    </div>
  );
}
