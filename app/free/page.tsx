"use client";
import { useState } from "react";

export default function FreeTools() {
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState<string | null>(null);

  const [task, setTask] = useState("");
  const [bullet, setBullet] = useState<string | null>(null);

  const makePlan = () => {
    const name = typeof window !== "undefined" ? localStorage.getItem("m25:name") : null;
    const role = typeof window !== "undefined" ? localStorage.getItem("m25:role") : null;
    const who = name ? `${name}` : "You";
    const target = role ? ` for ${role}` : "";
    const g = goal || "advance your career";
    setPlan(
`7-Day Plan${target}
• Day 1: Refresh resume bullets with metrics tied to ${g}
• Day 2: Identify 10 target companies; tailor keywords
• Day 3: Reach out to 3 contacts; ask for role insights
• Day 4: Apply to 5 roles (${g}-aligned)
• Day 5: 45 min interview practice (STAR + quant)
• Day 6: Build a small portfolio artifact/case study
• Day 7: Review outcomes; plan next week`
    );
  };

  const makeBullet = () => {
    const t = task || "Improved process";
    setBullet(
      `• ${t} by X% by doing <action>, measured via <metric> over <time>. (Tools: <tools>)`
    );
  };

  return (
    <main className="container" style={{ paddingTop: "1rem" }}>
      <h1 className="h2" style={{ marginBottom: "1rem" }}>Free Career Tools</h1>

      <section className="grid-2" style={{ display:"grid", gap:"1rem", gridTemplateColumns:"repeat(2,minmax(0,1fr))" }}>
        {/* Weekly Plan Generator */}
        <div className="card" style={{ padding: "1.25rem" }}>
          <h2 className="h2" style={{ marginBottom: ".5rem" }}>Weekly Plan Generator</h2>
          <p className="subtle" style={{ marginBottom: "1rem" }}>
            Get a 7-day action plan. (Uses Profile data if available.)
          </p>
          <label className="label">Your immediate goal</label>
          <textarea
            className="textarea"
            placeholder="e.g., land a product manager interview"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            style={{ minHeight: 96 }}
          />
          <button className="btn btn-primary" style={{ marginTop: "0.75rem" }} onClick={makePlan}>
            Generate Plan
          </button>

          {plan && (
            <pre style={{
              marginTop: "1rem", whiteSpace: "pre-wrap",
              background: "#f8fafc", border: "1px solid #e5e7eb",
              borderRadius: 10, padding: "0.75rem"
            }}>{plan}</pre>
          )}
        </div>

        {/* Resume Bullet Helper */}
        <div className="card" style={{ padding: "1.25rem" }}>
          <h2 className="h2" style={{ marginBottom: ".5rem" }}>Resume Bullet Helper</h2>
          <p className="subtle" style={{ marginBottom: "1rem" }}>
            Turn tasks into impact bullets with metrics.
          </p>
          <label className="label">What did you do?</label>
          <textarea
            className="textarea"
            placeholder="e.g., Managed weekly team stand-ups and sprint planning"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{ minHeight: 96 }}
          />
          <button className="btn btn-outline" style={{ marginTop: "0.75rem" }} onClick={makeBullet}>
            Suggest Bullet
          </button>

          {bullet && (
            <pre style={{
              marginTop: "1rem", whiteSpace: "pre-wrap",
              background: "#f8fafc", border: "1px solid #e5e7eb",
              borderRadius: 10, padding: "0.75rem"
            }}>{bullet}</pre>
          )}
        </div>
      </section>
    </main>
  );
}
