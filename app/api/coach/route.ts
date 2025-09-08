import { NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function fallbackPlan(prompt: string, profile?: any) {
  const role = profile?.role || "your target role";
  return {
    reply:
`Based on "${prompt || "your profile"}", here’s a focused one-week plan:
• Refine resume bullets with measurable outcomes
• Apply to 5 roles aligned to ${role}
• 30 minutes/day interview practice
• Reach out to 3 relevant contacts
• Block 2 hours for a portfolio/example

Ask me to tailor this by role, industry, or timeframe.`,
    plan: [
      "Refine resume bullets with measurable outcomes",
      "Apply to 5 aligned roles this week",
      "30 min/day interview practice",
      "Message 3 industry contacts",
      "2h portfolio/case refresh",
    ]
  };
}

export async function POST(req: Request) {
  try {
    const { prompt = "", profile } = await req.json();

    if (!OPENAI_API_KEY) {
      const fb = fallbackPlan(prompt, profile);
      return NextResponse.json(fb);
    }

    const sys = "You are a concise, actionable career coach. Always return a short intro plus 4–6 weekly steps.";
    const user = [
      profile ? `Profile: ${JSON.stringify(profile)}` : "",
      prompt ? `Request: ${prompt}` : "Create a weekly job-search plan."
    ].filter(Boolean).join("\n");

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-4o-mini", messages: [{role:"system",content:sys},{role:"user",content:user}], temperature: 0.4 })
    });

    if (!r.ok) {
      const fb = fallbackPlan(prompt, profile);
      return NextResponse.json({ ...fb, error: "ai_unavailable" });
    }
    const data = await r.json();
    const reply: string = data?.choices?.[0]?.message?.content || fallbackPlan(prompt, profile).reply;

    // naive extraction: split lines/bullets
    const lines = reply.split(/\r?\n|•/).map(s=>s.trim()).filter(Boolean);
    const steps = Array.from(new Set(lines)).filter(s=>s.length>6).slice(0,6);

    return NextResponse.json({ reply, plan: steps.length? steps : fallbackPlan(prompt, profile).plan });
  } catch {
    const fb = fallbackPlan("", undefined);
    return NextResponse.json(fb, { status: 200 });
  }
}
