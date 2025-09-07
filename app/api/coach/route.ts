import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt = "", profile } = await req.json();

    // Very small heuristic reply — swap with real LLM later.
    const base =
`Based on: "${prompt || "your career profile"}"
Here’s a 1-week starter plan you can follow:`;
    const plan = [
      "Refine resume bullets with measurable outcomes",
      "Apply to 5 roles aligned to your target",
      "30 minutes/day interview practice",
      "Reach out to 3 relevant contacts",
      "Block 2 hours for a portfolio/example"
    ];

    const reply =
`${base}
• ${plan.join("\n• ")}

Tell me your target role, desired industry, and timeframe to personalize further.`;

    return NextResponse.json({ reply, plan });
  } catch {
    return NextResponse.json({ reply: "I couldn’t process that—try again." }, { status: 200 });
  }
}
