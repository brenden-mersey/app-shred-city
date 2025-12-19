import Calculator from "./components/Calculator";

export default function Home() {
  return (
    <>
      <header className="header">
        <div className="container">
          <h1>SC</h1>
        </div>
      </header>
      <main className="main">
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
    </>
  );
}
