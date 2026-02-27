export default function Home() {
  return (
    <div style={{fontFamily: "Arial, sans-serif", backgroundColor: "#0f172a", color: "white"}}>

      {/* NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 60px",
        borderBottom: "1px solid #1e293b"
      }}>
        <h2>Zylithium</h2>
        <div>
          <button style={{
            padding: "8px 18px",
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid white",
            cursor: "pointer"
          }}>
            Login
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div style={{
        textAlign: "center",
        padding: "120px 20px"
      }}>
        <h1 style={{fontSize: "48px", marginBottom: "20px"}}>
          Web3 Risk Intelligence Platform
        </h1>

        <p style={{
          fontSize: "20px",
          color: "#94a3b8",
          maxWidth: "700px",
          margin: "0 auto"
        }}>
          AI-powered smart contract risk detection, wallet monitoring, and scam intelligence — built for serious Web3 builders.
        </p>

        <div style={{marginTop: "40px"}}>
          <button style={{
            padding: "14px 30px",
            fontSize: "16px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginRight: "15px"
          }}>
            Start Free Scan
          </button>

          <button style={{
            padding: "14px 30px",
            fontSize: "16px",
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid #334155",
            borderRadius: "6px",
            cursor: "pointer"
          }}>
            View Documentation
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "40px",
        padding: "80px 20px",
        backgroundColor: "#111827",
        flexWrap: "wrap"
      }}>

        <div style={{maxWidth: "300px"}}>
          <h3>🔍 Smart Contract Analysis</h3>
          <p style={{color: "#94a3b8"}}>
            Deep AI audit engine to detect vulnerabilities, logic flaws, and security risks.
          </p>
        </div>

        <div style={{maxWidth: "300px"}}>
          <h3>🛡 Wallet Risk Scoring</h3>
          <p style={{color: "#94a3b8"}}>
            Identify suspicious wallets, scam interactions, and high-risk behavior patterns.
          </p>
        </div>

        <div style={{maxWidth: "300px"}}>
          <h3>⚡ Real-Time Monitoring</h3>
          <p style={{color: "#94a3b8"}}>
            Continuous tracking of smart contracts and transaction risk exposure.
          </p>
        </div>

      </div>

      {/* FOOTER */}
      <div style={{
        textAlign: "center",
        padding: "40px",
        borderTop: "1px solid #1e293b",
        color: "#64748b"
      }}>
        © 2026 Zylithium. All rights reserved.
      </div>

    </div>
  )
}
