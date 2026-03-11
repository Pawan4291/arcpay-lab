use client"

import { useState } from "react"
import { ethers } from "ethers"

const contractAddress = "0x27B7860935fe0a46bE3bb339dD6122aBB1434efa"

const contractABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "_to1", "type": "address" },
      { "internalType": "address", "name": "_to2", "type": "address" }
    ],
    "name": "splitPayment",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]

export default function Dashboard() {

  const [wallet, setWallet] = useState("")
  const [addr1, setAddr1] = useState("")
  const [addr2, setAddr2] = useState("")
  const [amount, setAmount] = useState("")
  const [result, setResult] = useState("")

  async function connectWallet() {

    try {

      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts"
      })

      setWallet(accounts[0])

    } catch (error) {
      console.log(error)
    }

  }

  async function splitPayment() {

    try {

      setResult("Sending transaction...")

      const provider = new ethers.BrowserProvider((window as any).ethereum)

      const signer = await provider.getSigner()

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      )

      const value = ethers.parseUnits(amount, 6)

      const tx = await contract.splitPayment(addr1, addr2, {
        value
      })

      await tx.wait()

      setResult("Payment Split Successful")

    } catch (error) {

      console.log(error)
      setResult("Transaction Failed")

    }

  }

  return (

    <div style={{padding:"40px", textAlign:"center"}}>

      <h1>ArcPay Dashboard</h1>

      <button onClick={connectWallet}>
        {wallet ? wallet.slice(0,6)+"..."+wallet.slice(-4) : "Connect Wallet"}
      </button>

      <div style={{marginTop:"40px"}}>

        <input
          placeholder="Recipient Address 1"
          value={addr1}
          onChange={(e)=>setAddr1(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Recipient Address 2"
          value={addr2}
          onChange={(e)=>setAddr2(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Amount (USDC)"
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
        />

        <br/><br/>

        <button onClick={splitPayment}>
          Split Payment
        </button>

      </div>

      <p style={{marginTop:"30px"}}>{result}</p>

    </div>

  )

}