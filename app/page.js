export default function Home() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#1f2937" }}>
      
      {/* HERO */}
      <section style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "80px 20px",
      }}>
        <h1 style={{ fontSize: "46px", fontWeight: "700", marginBottom: "16px" }}>
          Institutional Web3 Risk Intelligence
        </h1>
        <p style={{ fontSize: "20px", color: "#475569", maxWidth: "700px", marginBottom: "32px" }}>
          Zylithium analyzes smart contracts, tokenomics, and risk patterns to help you make smarter, safer decisions in the BNB Smart Chain ecosystem.
        </p>
        <div style={{ display: "flex", gap: "16px" }}>
          <button style={{
            padding: "14px 28px", fontSize: "16px",
            backgroundColor: "#2563eb", color: "white",
            border: "none", borderRadius: "6px", cursor: "pointer",
          }}>
            Start Free Scan
          </button>
          <button style={{
            padding: "14px 28px", fontSize: "16px",
            backgroundColor: "transparent", color: "#2563eb",
            border: "1px solid #2563eb", borderRadius: "6px",
            cursor: "pointer"
          }}>
            View Pricing
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "60px 20px", backgroundColor: "#f8fafc" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
          <div style={{ maxWidth: "280px", textAlign: "center" }}>
            <h3 style={{ fontSize: "22px", marginBottom: "12px" }}>Smart Contract Analysis</h3>
            <p style={{ color: "#64748b" }}>
              Comprehensive multi-factor risk scanning with AI-assisted reasoning.
            </p>
          </div>

          <div style={{ maxWidth: "280px", textAlign: "center" }}>
            <h3 style={{ fontSize: "22px", marginBottom: "12px" }}>Liquidity & Wallet Risk</h3>
            <p style={{ color: "#64748b" }}>
              Detect unlocked liquidity, whale concentration, and risky ownership patterns.
            </p>
          </div>

          <div style={{ maxWidth: "280px", textAlign: "center" }}>
            <h3 style={{ fontSize: "22px", marginBottom: "12px" }}>Track & Compare</h3>
            <p style={{ color: "#64748b" }}>
              Track token history, score deltas, and portfolio risk at a glance.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "16px" }}>Ready to scan your token?</h2>
        <button style={{
          padding: "14px 32px", fontSize: "16px",
          backgroundColor: "#2563eb", color: "white",
          border: "none", borderRadius: "6px", cursor: "pointer",
        }}>
          Start Free Scan
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{
        textAlign: "center", padding: "30px 0",
        fontSize: "14px", color: "#94a3b8",
        borderTop: "1px solid #e2e8f0"
      }}>
        © 2026 Zylithium. All rights reserved.
      </footer>

    </div>
  );
}
