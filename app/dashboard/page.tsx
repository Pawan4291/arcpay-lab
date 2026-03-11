"use client"

import { useState } from "react"
import { ethers } from "ethers"

const contractAddress = "YOUR_CONTRACT_ADDRESS"

export default function Dashboard(){

const [wallet,setWallet] = useState("")
const [a1,setA1] = useState("")
const [a2,setA2] = useState("")
const [amount,setAmount] = useState("")
const [result,setResult] = useState("")

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

function disconnectWallet(){
setWallet("")
}

async function splitPayment(){

try{

const provider = new ethers.BrowserProvider((window as any).ethereum)
const signer = await provider.getSigner()

const contract = new ethers.Contract(
contractAddress,
[
"function splitPayment(address,address,uint256) public"
],
signer
)

const tx = await contract.splitPayment(
a1,
a2,
ethers.parseUnits(amount,6)
)

await tx.wait()

setResult("Payment Split Successful")

}catch{

setResult("Transaction Failed")

}

}

return(

<div style={{background:"#020c22",minHeight:"100vh",color:"white"}}>

{/* HEADER */}

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"18px 40px",
background:"#071a3a"
}}>

<div style={{display:"flex",alignItems:"center",gap:"12px"}}>

<img src="/logo.png" style={{width:"36px"}}/>

<h2 style={{margin:0,fontWeight:600}}>ArcPay</h2>

</div>

<button
onClick={wallet ? disconnectWallet : connectWallet}
style={{
background:"#3b82f6",
border:"none",
padding:"10px 20px",
borderRadius:"8px",
color:"white",
cursor:"pointer"
}}
>

{wallet ? wallet.slice(0,6)+"..."+wallet.slice(-4) : "Connect Wallet"}

</button>

</div>


{/* HERO */}

<div style={{textAlign:"center",marginTop:"60px"}}>

<h2 style={{marginBottom:"6px"}}>Split Payments on Arc Network</h2>

<p style={{opacity:0.8}}>Send USDC to multiple recipients instantly</p>

</div>


{/* CARD */}

<div style={{
width:"440px",
margin:"50px auto",
background:"#1f2937",
padding:"32px",
borderRadius:"14px"
}}>

<p>Recipient Address 1</p>

<input
value={a1}
onChange={e=>setA1(e.target.value)}
style={{width:"100%",padding:"10px",marginBottom:"16px"}}
/>

<p>Recipient Address 2</p>

<input
value={a2}
onChange={e=>setA2(e.target.value)}
style={{width:"100%",padding:"10px",marginBottom:"16px"}}
/>

<p>Amount (USDC)</p>

<input
value={amount}
onChange={e=>setAmount(e.target.value)}
style={{width:"100%",padding:"10px",marginBottom:"22px"}}
/>

<button
onClick={splitPayment}
style={{
width:"100%",
background:"#22c55e",
border:"none",
padding:"12px",
borderRadius:"8px",
color:"white",
cursor:"pointer"
}}
>

Split Payment

</button>

<a
href="https://faucet.circle.com/"
target="_blank"
style={{
display:"block",
marginTop:"14px",
textAlign:"center",
color:"#3b82f6"
}}
>

Get Test USDC

</a>

<p style={{textAlign:"center",marginTop:"14px"}}>{result}</p>

</div>


{/* ABOUT */}

<div style={{textAlign:"center"}}>

<h3>About ArcPay</h3>

<p style={{maxWidth:"600px",margin:"10px auto"}}>

ArcPay enables simple USDC payment splitting on Arc Network.
Ideal for shared payments, team payouts and collaborative transactions.

</p>

<p>

Created by Pawan

<a href="https://x.com/Pawan2001564157" target="_blank" style={{marginLeft:"6px"}}>

X

</a>

</p>

</div>


{/* FOOTER */}

<div style={{
marginTop:"60px",
background:"#071a3a",
padding:"20px",
textAlign:"center"
}}>

<a href="https://x.com/arc" target="_blank" style={{margin:"10px"}}>X</a>

<a href="https://discord.gg/buildonarc" target="_blank" style={{margin:"10px"}}>Discord</a>

<a href="https://www.arc.network/" target="_blank" style={{margin:"10px"}}>Website</a>

</div>

</div>

)

}