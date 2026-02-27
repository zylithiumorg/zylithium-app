export default function Home() {
  return (
    <main style={{ 
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontFamily: "Arial"
    }}>
      <h1>Zylithium Web3 Risk Intelligence</h1>
      <p>AI-powered smart contract & token risk analysis platform.</p>
      <button style={{
        padding: "10px 20px",
        marginTop: "20px",
        fontSize: "16px",
        cursor: "pointer"
      }}>
        Start Scan
      </button>
    </main>
  );
}
