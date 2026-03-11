"use client"

import { useState } from "react"
import { ethers } from "ethers"

const contractAddress = "0x27B7860935fe0a46bE3bb339dD6122aBB1434efa"

export default function Dashboard() {

  const [wallet,setWallet] = useState("")
  const [result,setResult] = useState("")

  async function connectWallet(){

    const eth = (window as any).ethereum

    if(!eth){
      alert("Install MetaMask")
      return
    }

    const accounts = await eth.request({
      method:"eth_requestAccounts"
    })

    setWallet(accounts[0])
  }

  async function testConnection(){

    try{

      const provider = new ethers.BrowserProvider((window as any).ethereum)

      const signer = await provider.getSigner()

      const address = await signer.getAddress()

      setResult("Connected: "+address)

    }catch(err){
      console.log(err)
      setResult("Connection failed")
    }

  }

  return(

    <div style={{padding:"40px"}}>

      <h1>ArcPay Dashboard</h1>

      <button onClick={connectWallet}>
        {wallet ? wallet : "Connect Wallet"}
      </button>

      <br/><br/>

      <button onClick={testConnection}>
        Test Wallet Connection
      </button>

      <p>{result}</p>

    </div>

  )

}