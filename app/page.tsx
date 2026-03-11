"use client";

import Link from "next/link";

export default function Home() {

  return(

    <main style={main}>

      <div style={centerBox}>

        <h1 style={title}>
          ArcPay
        </h1>

        <p style={subtitle}>
          The simplest way to split stablecoin payments on Arc Network.
          <br/>
          Send one transaction and automatically distribute funds to multiple wallets.
        </p>

        <div style={buttons}>

          <Link href="/dashboard">
            <button style={primaryBtn}>
              Launch App
            </button>
          </Link>

          <a
          href="https://faucet.circle.com/"
          target="_blank"
          >
            <button style={secondaryBtn}>
              Get Testnet USDC
            </button>
          </a>

        </div>

      </div>

    </main>

  );

}

const main = {
  minHeight:"100vh",
  background:"linear-gradient(135deg,#020617,#0f172a)",
  color:"white",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  fontFamily:"sans-serif"
}

const centerBox = {
  textAlign:"center",
  maxWidth:"700px"
}

const title = {
  fontSize:"70px",
  fontWeight:"bold",
  marginBottom:"20px"
}

const subtitle = {
  fontSize:"20px",
  opacity:"0.8",
  marginBottom:"40px",
  lineHeight:"1.6"
}

const buttons = {
  display:"flex",
  gap:"20px",
  justifyContent:"center"
}

const primaryBtn = {
  padding:"14px 28px",
  borderRadius:"10px",
  border:"none",
  background:"#10b981",
  color:"white",
  fontSize:"16px",
  cursor:"pointer"
}

const secondaryBtn = {
  padding:"14px 28px",
  borderRadius:"10px",
  border:"1px solid white",
  background:"transparent",
  color:"white",
  fontSize:"16px",
  cursor:"pointer"
}