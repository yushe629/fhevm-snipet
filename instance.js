const ethers = require('ethers')
const fs = require("fs")


const network = "sepolia"
const provider = ethers.getDefaultProvider(network)

// for secutity
privatekey=""

const wallet = new ethers.Wallet(privateKey, provider)

// console.log(JSON.stringify(wallet))
console.log(wallet)