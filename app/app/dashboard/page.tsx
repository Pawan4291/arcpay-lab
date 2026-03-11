"use client";

import { useState } from "react";
import { ethers } from "ethers";

export default function Dashboard(){

  const [wallet,setWallet] = useState("");
  const [addr1,setAddr1] = useState("");
  const [addr2,setAddr2] = useState("");
  const [amount,setAmount] = useState("");
  const [result,setResult] = useState("");
  const [loading,setLoading] = useState(false);

  const contractAddress = "0x27B7860935fe0a46bE3bb339dD6122aBB1434efa";

  const abi = [
    "function split(address payable addr1,address payable addr2) public payable"
  ];

  async function connectWallet(){

    const accounts = await window.ethereum.request({
      method:"eth_requestAccounts"
    });

    setWallet(accounts[0]);

  }

  async function sendSplitPayment(){

    try{

      setLoading(true);
      setResult("");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );

      const value = ethers.parseEther(amount);

      const tx = await contract.split(
        addr1,
        addr2,
        { value:value }
      );

      setResult("Transaction Sent ⏳");

      await tx.wait();

      setLoading(false);

      setResult("Payment Split Successful ✅");

    }catch(err){

      console.log(err);

      setLoading(false);

      setResult("Transaction Failed ❌");

    }

  }

  return(

    <main style={main}>

      <div style={header}>

        <h1>ArcPay Dashboard</h1>

        <button
        onClick={connectWallet}
        style={connectBtn}
        >

        {wallet ? wallet.slice(0,6)+"..."+wallet.slice(-4) : "Connect Wallet"}

        </button>

      </div>

      <div style={card}>

        <h2>Split Payment</h2>

        <input
        placeholder="Recipient Address 1"
        value={addr1}
        onChange={(e)=>setAddr1(e.target.value)}
        style={input}
        />

        <input
        placeholder="Recipient Address 2"
        value={addr2}
        onChange={(e)=>setAddr2(e.target.value)}
        style={input}
        />

        <input
        placeholder="Amount"
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
        style={input}
        />

        <button
        onClick={sendSplitPayment}
        disabled={loading}
        style={payBtn}
        >

        {loading ? "Processing..." : "Split Payment"}

        </button>

        <p style={{marginTop:"20px"}}>
        {result}
        </p>

      </div>

    </main>

  );

}

const main = {
  minHeight:"100vh",
  background:"#020617",
  color:"white",
  padding:"40px",
  fontFamily:"sans-serif"
}

const header = {
  display:"flex",
  justifyContent:"space-between",
  marginBottom:"40px"
}

const connectBtn = {
  background:"#2563eb",
  padding:"10px 20px",
  borderRadius:"8px",
  border:"none",
  color:"white",
  cursor:"pointer"
}

const card = {
  maxWidth:"500px",
  margin:"auto",
  background:"#1e293b",
  padding:"30px",
  borderRadius:"16px"
}

const input = {
  width:"100%",
  padding:"12px",
  marginTop:"12px",
  borderRadius:"8px",
  border:"none"
}

const payBtn = {
  width:"100%",
  padding:"14px",
  marginTop:"20px",
  borderRadius:"8px",
  border:"none",
  background:"#10b981",
  color:"white",
  fontWeight:"bold",
  cursor:"pointer"
}