import styles from "./page.module.scss";
import Calculator from "./components/Calculator";
import DebugPanel from "./components/DebugPanel";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Shred City</h1>
          <p>A fast, equipment-aware barbell and plate calculator built for lifters who think in per-side weight.</p>
        </div>
        <Calculator />
        <div className="logger">
          <h2>Debugging</h2>
          <DebugPanel data={{}} />
        </div>
      </main>
      <footer className={styles.footer}>
        <p>© 2025 Shred City</p>
      </footer>
      <div className={styles.ctas}>
        <a href="/calculator" className={styles.primary}>
          Calculator
        </a>
      </div>
    </div>
  );
}
