const {ethers} = require('ethers')
const { createInstance } = require('fhevmjs')
const fs = require("fs")

// Encrypted ERC20

// const contractAbi = JSON.stringify(JSON.parse(fs.readFileSync("./EncryptedERC20_ABI.json")))
const contractAbi = JSON.stringify(JSON.parse(fs.readFileSync("./erc20Abi.json")))
const privateKey = JSON.stringify(fs.readFileSync("./privatekey.json"))

// wallet key not equal public key

// InfuraのURL指定
let network = 'sepolia' 
let provider = ethers.getDefaultProvider(network)
const chainId = 11155111

// WalletのPrivate key
// let privateKey = 'xxxxxxxxx'
const signer = new ethers.Wallet(
    privateKey,
    provider
)

// Contract Address
const contractAddress = "0xfb53f3d4DB636fa1Bd95f411F322767F822A9d5D"

// Contract ABI
// const contractAbi = ["function mint(string memory tokenURI) public returns (uint256)"]
const contract = new ethers.Contract(contractAddress, contractAbi, signer)

// transaction実行
// const tokenURI = "xxxxx"
// const func = async () => {
//     const res = await contract.mint(tokenURI)
//     console.log(res)
// }
// 


// const generateTokenOption = {
//     verifyingContract: "0x138d91974e88E463021016D49B3b981eeb27FbcE",
//     name: "authentication",
// }
const generateTokenOption = {
    verifyingContract: contractAddress,
    name: "authentication",
}

const instancekey = "0x1234"

const func = async () => {
    const instance = await createInstance({chainId, instancekey});
    const token = instance.generateToken(generateTokenOption);
    const response = await contract.balanceOf(token.publicKey, signer)
    const dec = instance.decrypt(generateTokenOption.verifyingContract,  response)
    console.log(dec)
}   

func()
