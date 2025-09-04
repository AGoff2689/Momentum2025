import { ArrowRight, Briefcase, FileCheck2, Sparkles } from "lucide-react";

const Feature = ({icon, title, desc}:{icon:React.ReactNode; title:string; desc:string}) => (
  <div className="card" style={{display:"grid",gap:".4rem",padding:"1.25rem"}}>
    <div style={{display:"flex",alignItems:"center",gap:".6rem"}}>
      <span>{icon}</span><strong>{title}</strong>
    </div>
    <p className="subtle" style={{margin:0}}>{desc}</p>
  </div>
);

export default function Home() {
  return (
    <main className="main" style={{paddingTop:"4rem"}}>
      <div className="container" style={{width:"100%", display:"grid", gap:"2rem"}}>
        {/* HERO */}
        <section className="card-hero" style={{textAlign:"center",position:"relative",overflow:"hidden"}}>
          <svg width="520" height="520" viewBox="0 0 520 520" style={{position:"absolute",right:-120,top:-120,opacity:.15}}>
            <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#1E3A8A"/><stop offset="1" stopColor="#0EA5E9"/></linearGradient></defs>
            <circle cx="260" cy="260" r="260" fill="url(#g)" />
          </svg>
          <h1 className="h1" style={{marginBottom:".6rem"}}>Advance your career with AI-powered tools</h1>
          <p className="subtle" style={{margin:"0 auto 1.25rem",maxWidth:680}}>
            Build your roadmap, perfect your resume, track applications, and get expert guidance from the AI Career Coach.
          </p>
          <div style={{display:"flex",gap:".75rem",justifyContent:"center"}}>
            <a className="btn btn-primary" href="/free">Start Free <ArrowRight size={18} style={{marginLeft:8}}/></a>
            <a className="btn btn-outline" href="/pricing">See Pro Features</a>
          </div>
        </section>

        {/* FEATURES */}
        <section className="container" style={{display:"grid",gap:"1rem",gridTemplateColumns:"repeat(3,minmax(0,1fr))"}}>
          <Feature icon={<FileCheck2 size={18}/>} title="Resume Builder" desc="Score and improve bullets with measurable impact."/>
          <Feature icon={<Briefcase size={18}/>} title="Job Tracker" desc="Track roles, stages, and next actions at a glance."/>
          <Feature icon={<Sparkles size={18}/>} title="AI Career Coach" desc="Actionable plans for interviews, outreach, and learning."/>
        </section>

        {/* CTA STRIP */}
        <section className="card" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem",padding:"1.25rem"}}>
          <div>
            <div className="h2" style={{margin:0}}>Ready to build momentum?</div>
            <div className="subtle">Free tools now. Upgrade anytime for pro features.</div>
          </div>
          <div style={{display:"flex",gap:".6rem"}}>
            <a className="btn btn-outline" href="/free">Explore Free</a>
            <a className="btn btn-primary" href="/pricing">Go Pro</a>
          </div>
        </section>
      </div>
    </main>
  );
}
