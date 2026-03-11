"use client"

import { useState } from "react"
import { ethers } from "ethers"

export default function Dashboard() {

  const [wallet,setWallet] = useState("")

  async function connectWallet(){
    if(!(window as any).ethereum){
      alert("Install MetaMask")
      return
    }

    const accounts = await (window as any).ethereum.request({
      method:"eth_requestAccounts"
    })

    setWallet(accounts[0])
  }

  return(

    <div style={{
      minHeight:"100vh",
      background:"#020c22",
      color:"white",
      fontFamily:"sans-serif"
    }}>

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        padding:"20px 40px",
        background:"#071a3a"
      }}>

        <h2>ArcPay</h2>

        <button onClick={connectWallet}>
          {wallet ? wallet.slice(0,6)+"..."+wallet.slice(-4) : "Connect Wallet"}
        </button>

      </div>

      <div style={{
        textAlign:"center",
        marginTop:"80px"
      }}>

        <h1>Split Payments on Arc Network</h1>
        <p>Send USDC to multiple recipients instantly</p>

      </div>

    </div>

  )
}