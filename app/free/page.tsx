import StartTrial from "../components/StartTrial";
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
    const g = goal || "advance your career";
    setPlan(
`7-Day Plan${role ? ` for ${role}` : ""}
/ Day 1: Refresh resume bullets with metrics tied to ${g}
/ Day 2: Identify 10 target companies; tailor keywords
/ Day 3: Reach out to 3 contacts; ask for role insights
/ Day 4: Apply to 5 roles (${g}-aligned)
/ Day 5: 45 min interview practice (STAR + quant)
/ Day 6: Build a small portfolio artifact/case study
/ Day 7: Review outcomes; plan next week`
    );
  };

  const makeBullet = () => {
    const t = task || "Improved process";
    setBullet(`• ${t} by X% by doing <action>, measured via <metric> over <time>.`);
  };

  return (
    <StartTrial/>
<main className="container" style={{ paddingTop: 16 }}>
      <h1 className="h2" style={{ marginBottom: 16 }}>Free Career Tools</h1>

      <section style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr" }}>
        <div className="card" style={{ padding: 20 }}>
          <h2 className="h2" style={{ marginBottom: 8 }}>Weekly Plan Generator</h2>
          <p className="subtle" style={{ marginBottom: 16 }}>Uses your Profile if set.</p>

          <label className="label">Your immediate goal</label>
          <textarea className="textarea" style={{ minHeight: 96 }}
                    placeholder="e.g., land a PM interview"
                    value={goal} onChange={(e) => setGoal(e.target.value)} />
          <button className="btn btn-primary" style={{ marginTop: 12 }}>
            Generate Plan
          </button>

          {plan && (
            <pre style={{ marginTop: 12, whiteSpace: "pre-wrap", background: "#f8fafc",
                           border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
              {plan}
            </pre>
          )}
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h2 className="h2" style={{ marginBottom: 8 }}>Resume Bullet Helper</h2>
          <p className="subtle" style={{ marginBottom: 16 }}>Turn tasks into impact bullets.</p>

          <label className="label">What did you do?</label>
          <textarea className="textarea" style={{ minHeight: 96 }}
                    placeholder="e.g., Ran stand-ups and sprint planning"
                    value={task} onChange={(e) => setTask(e.target.value)} />
          <button className="btn btn-outline" style={{ marginTop: 12 }}>
            Suggest Bullet
          </button>

          {bullet && (
            <pre style={{ marginTop: 12, whiteSpace: "pre-wrap", background: "#f8fafc",
                           border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
              {bullet}
            </pre>
          )}
        </div>
      </section>
    </main>
  );
}

 
