"use client"

import { useState } from "react"
import { ethers } from "ethers"

const contractAddress = "0x27B7860935fe0a46bE3bb339dD6122aBB1434efa"

export default function Dashboard() {

const [wallet,setWallet] = useState("")
const [address1,setAddress1] = useState("")
const [address2,setAddress2] = useState("")
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
address1,
address2,
ethers.parseUnits(amount,6)
)

await tx.wait()

setResult("Payment Split Successful")

}catch(e){

setResult("Transaction Failed")

}

}

return(

<div style={{background:"#020c22",minHeight:"100vh",color:"white",fontFamily:"sans-serif"}}>

{/* HEADER */}

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"20px 40px",
background:"#071a3a"
}}>

<div style={{display:"flex",alignItems:"center",gap:"10px"}}>

<img src="/logo.png" width="40"/>

<h2 style={{margin:0}}>ArcPay</h2>

</div>

<button
onClick={wallet ? disconnectWallet : connectWallet}
style={{
background:"#3b82f6",
color:"white",
padding:"10px 20px",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
>

{wallet ? wallet.slice(0,6)+"..."+wallet.slice(-4) : "Connect Wallet"}

</button>

</div>


{/* HERO */}

<div style={{textAlign:"center",marginTop:"60px"}}>

<h1>Split Payments on Arc Network</h1>

<p>Send USDC to multiple recipients instantly</p>

</div>


{/* PAYMENT CARD */}

<div style={{
width:"420px",
margin:"50px auto",
background:"#1f2937",
padding:"30px",
borderRadius:"12px"
}}>

<p>Recipient Address 1</p>

<input
value={address1}
onChange={e=>setAddress1(e.target.value)}
style={{width:"100%",padding:"10px",marginBottom:"15px"}}
/>

<p>Recipient Address 2</p>

<input
value={address2}
onChange={e=>setAddress2(e.target.value)}
style={{width:"100%",padding:"10px",marginBottom:"15px"}}
/>

<p>Amount (USDC)</p>

<input
value={amount}
onChange={e=>setAmount(e.target.value)}
style={{width:"100%",padding:"10px",marginBottom:"20px"}}
/>

<button
onClick={splitPayment}
style={{
width:"100%",
background:"#22c55e",
padding:"12px",
borderRadius:"8px",
border:"none",
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
textAlign:"center",
marginTop:"15px",
color:"#3b82f6"
}}
>

Get Test USDC

</a>

<p style={{marginTop:"15px",textAlign:"center"}}>{result}</p>

</div>


{/* ABOUT */}

<div style={{textAlign:"center",marginTop:"40px"}}>

<h3>About ArcPay</h3>

<p>
ArcPay enables simple USDC payment splitting on Arc Network.
Ideal for shared payments, team payouts and collaborative transactions.
</p>

<p>

Created by Pawan

<a href="https://x.com/Pawan2001564157" target="_blank">

<img
src="https://abs.twimg.com/favicons/twitter.3.ico"
width="18"
style={{marginLeft:"6px"}}
/>

</a>

</p>

</div>


{/* FOOTER */}

<div style={{
textAlign:"center",
marginTop:"50px",
padding:"20px",
background:"#071a3a"
}}>

<a href="https://x.com/arc" target="_blank" style={{margin:"10px"}}>X</a>

<a href="https://discord.gg/buildonarc" target="_blank" style={{margin:"10px"}}>Discord</a>

<a href="https://www.arc.network/" target="_blank" style={{margin:"10px"}}>Website</a>

</div>

</div>

)

}