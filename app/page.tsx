import Pricing from "./components/Pricing";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 960 }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem", textAlign: "center" }}>
          Momentum2025
        </h1>
        <p style={{ textAlign: "center", color: "#555", marginBottom: "2rem" }}>
          Operational tools built for your workflow.
        </p>
        <Pricing />
      </div>
    </main>
  );
}
