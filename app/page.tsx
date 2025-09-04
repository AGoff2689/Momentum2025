import { UserPlus } from "lucide-react";
export default function Home() {
  return (
    <main className="main">
      <div className="container" style={{ width:"100%" }}>
        <section className="card-hero" style={{ textAlign:"center" }}>
          <h1 className="h1" style={{ marginBottom: ".6rem" }}>Advance your career with AI-powered tools</h1>
          <p className="subtle" style={{ margin:"0 auto 1.25rem", maxWidth:680 }}>
            Create your profile to personalize your roadmap, resume guidance, and job search.
          </p>
          <a className="btn btn-primary" href="/profile">
            <UserPlus size={18} style={{ marginRight: 8 }} />
            Create Profile
          </a>
        </section>
      </div>
    </main>
  );
}
