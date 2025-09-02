import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
  return (
    <>
      <Header />
      <main className="container" style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:"1.25rem",paddingTop:"1rem"}}>
        <Sidebar />
        <section>
          <h1 className="h2">Dashboard</h1>
          <div className="subtle">Welcome to Momentum2025.</div>
        </section>
      </main>
    </>
  );
}
