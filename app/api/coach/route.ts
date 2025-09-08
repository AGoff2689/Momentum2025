import { NextResponse } from "next/server";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function fbQuestion(state:any){
  const asked = new Set(Object.keys(state?.answers||{}));
  const bank = [
    {id:"target_role", q:"What role are you targeting next?" },
    {id:"timeframe",   q:"What timeframe are you aiming for?" },
    {id:"skills",      q:"Which 3 skills do you want to highlight most?" },
    {id:"gaps",        q:"What do you feel are your biggest skill gaps?" },
    {id:"location",    q:"Preferred location or remote?" },
    {id:"industry",    q:"Any target industries or companies?" },
  ];
  const next = bank.find(b=>!asked.has(b.id));
  return next ? { question: next.q, done:false } : { question:null, done:true };
}
function fbPlan(prompt:string, profile:any){
  const role = profile?.target_role || "your target role";
  const plan = [
    "Refine resume bullets with measurable outcomes",
    `Apply to 5 roles aligned to ${role}`,
    "30 minutes/day interview practice",
    "Reach out to 3 relevant contacts",
    "2 hours portfolio/case refresh",
  ];
  const reply = `Hi, I'm Moe. Here’s a focused one-week plan:\n• ${plan.join("\n• ")}`;
  return { reply, plan };
}

export async function POST(req: Request) {
  const { mode="plan", prompt="", profile, resumeText="", goals="", state } = await req.json();

  if (mode === "ask_next_question") {
    if (!OPENAI_API_KEY) return NextResponse.json(fbQuestion(state));
    const sys = [
      "You are Moe, Momentum2025’s friendly, professional career coach.",
      "Given resume text, goals, and prior answers, ask ONE next best short question.",
      "If you have enough to plan, answer exactly 'DONE'."
    ].join(" ");
    const user = [
      resumeText ? `Resume:\n${resumeText.slice(0,6000)}` : "",
      goals ? `Goals:\n${goals}` : "",
      state ? `Prior answers JSON:\n${JSON.stringify(state).slice(0,4000)}` : ""
    ].filter(Boolean).join("\n\n");

    const r = await fetch("https://api.openai.com/v1/chat/completions",{
      method:"POST",
      headers:{ Authorization:`Bearer ${OPENAI_API_KEY}`, "Content-Type":"application/json" },
      body: JSON.stringify({ model:"gpt-4o-mini", temperature:0.3,
        messages:[ {role:"system",content:sys}, {role:"user",content:user} ]
      })
    });
    if (!r.ok) return NextResponse.json({ question:null, done:true });
    const data = await r.json();
    const text: string = data?.choices?.[0]?.message?.content?.trim() || "DONE";
    const done = /^done\b/i.test(text);
    return NextResponse.json({ question: done? null : text, done });
  }

  if (!OPENAI_API_KEY) return NextResponse.json(fbPlan(prompt, profile));
  const sys = "You are Moe, a concise, supportive career coach. Return a short intro + 4–6 specific weekly steps.";
  const user = [
    resumeText ? `Resume:\n${resumeText.slice(0,6000)}` : "",
    goals ? `Goals:\n${goals}` : "",
    profile ? `Profile JSON:\n${JSON.stringify(profile).slice(0,4000)}` : "",
    prompt ? `Request:\n${prompt}` : "Create a weekly plan tailored to this user."
  ].filter(Boolean).join("\n\n");

  const r = await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",
    headers:{ Authorization:`Bearer ${OPENAI_API_KEY}`, "Content-Type":"application/json" },
    body: JSON.stringify({ model:"gpt-4o-mini", temperature:0.4,
      messages:[ {role:"system",content:sys}, {role:"user",content:user} ]
    })
  });
  if (!r.ok) return NextResponse.json(fbPlan(prompt, profile));

  const data = await r.json();
  let reply: string = data?.choices?.[0]?.message?.content || fbPlan(prompt, profile).reply;
  if (!/^hi[, ]|^hello|^i('|’)m moe/i.test(reply.trim())) reply = `Hi, I'm Moe. ${reply}`;
  const lines = reply.split(/\r?\n|•/).map(s=>s.trim()).filter(Boolean);
  const steps = Array.from(new Set(lines)).filter(s=>s.length>6 && !/^hi,? i'?m moe/i.test(s)).slice(0,6);
  return NextResponse.json({ reply, plan: steps.length? steps : fbPlan(prompt, profile).plan });
}
