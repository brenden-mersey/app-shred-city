import Calculator from "./components/Calculator";

export default function Home() {
  return (
    <div className="page">
      <main className="main">
        <section className="section">
          <div className="container">
            <h1>Shred City</h1>
            <p>A fast, equipment-aware barbell and plate calculator built for lifters who think in per-side weight.</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <Calculator />
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Shred City</p>
        </div>
      </footer>
    </div>
  );
}
