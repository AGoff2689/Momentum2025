import { ArrowRight } from "lucide-react";
export default function Home() {
  return (
    <main className="main">
      <div className="container" style={{width:"100%"}}>
        <section className="card-hero" style={{textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,pointerEvents:"none"}}>
            <div style={{position:"absolute",top:-60,left:-60,width:220,height:220,borderRadius:"50%",
              background:"radial-gradient(circle,#3aa1ff55,transparent 60%)"}}/>
            <div style={{position:"absolute",bottom:-80,right:-80,width:260,height:260,borderRadius:"50%",
              background:"radial-gradient(circle,#1e3a8a55,transparent 60%)"}}/>
          </div>
          <div className="h1" style={{marginBottom:".5rem"}}>Advance your career with AI-powered tools</div>
          <p className="subtle" style={{margin:"0 auto 1.25rem",maxWidth:680}}>
            Build your roadmap, perfect your resume, track applications, and get expert guidance from the AI Career Coach.
          </p>
          <div style={{display:"flex",gap:".75rem",justifyContent:"center"}}>
            <a className="btn btn-primary" href="/free">Start Free <ArrowRight size={18} style={{marginLeft:8}}/></a>
            <a className="btn btn-outline" href="/pricing">See Pro Features</a>
          </div>
        </section>
      </div>
    </main>
  );
}
