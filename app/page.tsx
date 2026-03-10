"use client";

import { useState } from "react";
import { ethers } from "ethers";

export default function Home() {

  const [wallet, setWallet] = useState("");

  async function connectWallet() {
    if (typeof window !== "undefined" && (window as any).ethereum) {

      const provider = new ethers.BrowserProvider((window as any).ethereum);

      const accounts = await provider.send("eth_requestAccounts", []);

      setWallet(accounts[0]);

    } else {
      alert("Please install MetaMask");
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      fontFamily: "sans-serif",
      padding: "40px"
    }}>

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:"40px"
      }}>

        <h1>ArcPay Lab</h1>

        <button
          onClick={connectWallet}
          style={{
            background:"#2563eb",
            border:"none",
            padding:"10px 20px",
            borderRadius:"8px",
            color:"white",
            cursor:"pointer"
          }}
        >
          {wallet ? wallet.slice(0,6) + "..." + wallet.slice(-4) : "Connect Wallet"}
        </button>

      </div>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(3,1fr)",
        gap:"20px"
      }}>

        <div style={card}>
          <h3>Payment Split</h3>
          <p>Split stablecoin payments between multiple addresses.</p>
        </div>

        <div style={card}>
          <h3>Escrow Payment</h3>
          <p>Lock funds until conditions are met.</p>
        </div>

        <div style={card}>
          <h3>Subscription</h3>
          <p>Test recurring stablecoin payments.</p>
        </div>

      </div>

    </main>
  );
}

const card = {
  background:"#1e293b",
  padding:"20px",
  borderRadius:"10px"
};