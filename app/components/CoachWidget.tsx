"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { from: "user" | "bot"; text: string };

export default function CoachWidget() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Hi! I’m your AI Career Coach. Ask me anything about your resume, interviews, or job search." }
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { from: "user", text: input.trim() };
    setMessages(m => [...m, userMsg]);
    setInput("");

    // Mock reply for now; later, swap to your API route/function
    setTimeout(() => {
      setMessages(m => [...m, {
        from: "bot",
        text: "Great question. Here’s a 1-week plan:\n• Update resume bullet points with metrics\n• Apply to 5 roles daily\n• Practice interview questions 30 min/day\n• Reach out to 3 connections on LinkedIn"
      }]);
    }, 600);
  };

  return (
    <div style={{
      position: "fixed", right: 20, bottom: 20, zIndex: 50,
      width: open ? 360 : 64
    }}>
      {open ? (
        <div className="card card-lg" style={{ height: 520, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".5rem" }}>
            <div className="kicker">AI Career Coach</div>
            <button className="btn btn-muted" onClick={() => setOpen(false)}>Minimize</button>
          </div>

          <div style={{
            flex: 1, overflowY: "auto", border: "1px solid var(--color-border)",
            borderRadius: "8px", padding: ".75rem", background: "var(--color-surface)"
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: m.from === "user" ? "flex-end" : "flex-start",
                marginBottom: ".5rem"
              }}>
                <div style={{
                  maxWidth: "85%",
                  whiteSpace: "pre-wrap",
                  background: m.from === "user" ? "var(--color-primary)" : "#fff",
                  color: m.from === "user" ? "#fff" : "var(--color-text)",
                  padding: ".55rem .7rem",
                  borderRadius: 12,
                  boxShadow: "var(--shadow-sm)",
                  border: "1px solid var(--color-border)"
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div style={{ display: "flex", gap: ".5rem", marginTop: ".6rem" }}>
            <input
              className="input"
              placeholder="Ask about jobs, resume, or interviews…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
            />
            <button className="btn btn-primary" onClick={send}>Send</button>
          </div>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={() => setOpen(true)}>Coach</button>
      )}
    </div>
  );
}
