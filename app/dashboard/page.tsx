"use client"

import { useState } from "react"
import { ethers } from "ethers"

const contractAddress = "0x27B7860935fe0a46bE3bb339dD6122aBB1434efa"

const abi = [
 "function split(address payable a, address payable b) public payable"
]

export default function Dashboard(){

 const [wallet,setWallet] = useState("")
 const [hover,setHover] = useState(false)
 const [addr1,setAddr1] = useState("")
 const [addr2,setAddr2] = useState("")
 const [amount,setAmount] = useState("")
 const [status,setStatus] = useState("")

 async function connectWallet(){

  if(!window.ethereum){
   alert("Install MetaMask")
   return
  }

  const provider = new ethers.BrowserProvider((window as any).ethereum)
  const accounts = await provider.send("eth_requestAccounts",[])

  setWallet(accounts[0])
 }

 function disconnectWallet(){
  setWallet("")
 }

 async function splitPayment(){

  try{

   const provider = new ethers.BrowserProvider(window.ethereum)
   const signer = await provider.getSigner()

   const contract = new ethers.Contract(
    contractAddress,
    abi,
    signer
   )

   const tx = await contract.split(
    addr1,
    addr2,
    {
     value: ethers.parseUnits(amount,6)
    }
   )

   await tx.wait()

   setStatus("Payment Split Successful")

  }catch(err){

   console.log(err)
   setStatus("Transaction Failed")

  }

 }

 const shortAddress = wallet
  ? wallet.slice(0,6) + "..." + wallet.slice(-4)
  : ""

 return(

 <div style={{
  minHeight:"100vh",
  background:"#020617",
  color:"white",
  fontFamily:"sans-serif"
 }}>

 {/* HEADER */}

 <div style={{
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  padding:"20px 40px",
  borderBottom:"1px solid #1e293b"
 }}>

 {/* LOGO */}

 <div style={{
  display:"flex",
  alignItems:"center",
  gap:"12px",
  fontSize:"32px",
  fontWeight:"bold"
 }}>

 <img
 src="/arc-logo.png"
 style={{
  width:"40px",
  height:"40px",
  objectFit:"contain"
 }}
 />

 ArcPay

 </div>


 {/* WALLET BUTTON */}

 <button
 onClick={wallet ? disconnectWallet : connectWallet}
 onMouseEnter={()=>setHover(true)}
 onMouseLeave={()=>setHover(false)}
 style={{
  padding:"10px 18px",
  background:"#3b82f6",
  border:"none",
  borderRadius:"8px",
  color:"white",
  fontWeight:"bold",
  cursor:"pointer"
 }}>

 {wallet
  ? (hover ? "Disconnect Wallet" : shortAddress)
  : "Connect Wallet"}

 </button>

 </div>



 {/* CENTER */}

 <div style={{
  display:"flex",
  flexDirection:"column",
  alignItems:"center",
  marginTop:"60px"
 }}>

 <h1 style={{fontSize:"42px"}}>
 Split Payments on Arc Network
 </h1>

 <p style={{opacity:0.7}}>
 Send USDC to multiple recipients instantly
 </p>



 {/* CARD */}

 <div style={{
  marginTop:"40px",
  width:"520px",
  background:"#1e293b",
  padding:"40px",
  borderRadius:"16px"
 }}>

 <label>Recipient Address 1</label>

 <input
 value={addr1}
 onChange={(e)=>setAddr1(e.target.value)}
 style={{
  width:"100%",
  padding:"10px",
  marginTop:"6px",
  marginBottom:"20px",
  borderRadius:"8px",
  border:"none"
 }}
 />

 <label>Recipient Address 2</label>

 <input
 value={addr2}
 onChange={(e)=>setAddr2(e.target.value)}
 style={{
  width:"100%",
  padding:"10px",
  marginTop:"6px",
  marginBottom:"20px",
  borderRadius:"8px",
  border:"none"
 }}
 />

 <label>Amount (USDC)</label>

 <input
 value={amount}
 onChange={(e)=>setAmount(e.target.value)}
 style={{
  width:"100%",
  padding:"10px",
  marginTop:"6px",
  marginBottom:"25px",
  borderRadius:"8px",
  border:"none"
 }}
 />

 <button
 onClick={splitPayment}
 style={{
  width:"100%",
  padding:"14px",
  background:"#22c55e",
  border:"none",
  borderRadius:"10px",
  fontWeight:"bold",
  fontSize:"15px"
 }}>
 Split Payment
 </button>


 {/* FAUCET BUTTON */}

 <a
 href="https://faucet.circle.com/"
 target="_blank"
 style={{
  display:"block",
  marginTop:"12px",
  textDecoration:"none"
 }}>

 <button
 style={{
  width:"100%",
  padding:"12px",
  background:"#3b82f6",
  border:"none",
  borderRadius:"10px",
  color:"white",
  fontWeight:"bold"
 }}>
 Get Test USDC
 </button>

 </a>

 <p style={{marginTop:"10px"}}>
 {status}
 </p>

 </div>



 {/* ABOUT */}

 <div style={{
  marginTop:"60px",
  width:"600px",
  textAlign:"center",
  opacity:"0.8"
 }}>

 <h3>About ArcPay</h3>

 <p>
 ArcPay enables simple USDC payment splitting on Arc Network.
 Ideal for shared payments, team payouts and collaborative transactions.
 </p>

 <p style={{marginTop:"10px"}}>
 Created by Pawan

 <a
 href="https://x.com/Pawan2001564157"
 target="_blank"
 style={{marginLeft:"8px"}}
 >
 🐦
 </a>

 </p>

 </div>

 </div>



 {/* FOOTER */}

 <div style={{
  marginTop:"80px",
  padding:"20px",
  textAlign:"center",
  borderTop:"1px solid #1e293b"
 }}>

 <a href="https://www.arc.network/" target="_blank">🌐</a>

 <a href="https://x.com/arc" target="_blank" style={{marginLeft:"20px"}}>🐦</a>

 <a href="https://discord.gg/buildonarc" target="_blank" style={{marginLeft:"20px"}}>💬</a>

 </div>

 </div>

 )

}