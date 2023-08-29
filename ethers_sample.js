const ethers = require('ethers')

// InfuraのURL指定
let network = 'rinkeby' 
let provider = ethers.getDefaultProvider(network)

// WalletのPrivate key
let privateKey = 'xxxxxxxxx'
const signer = new ethers.Wallet(
    privateKey,
    provider
)

// Contract Address
const contractAddress = "xxxxxx"

// Contract ABI
const contractAbi = ["function mint(string memory tokenURI) public returns (uint256)"]
const contract = new ethers.Contract(contractAddress, contractAbi, signer)

// transaction実行
const tokenURI = "xxxxx"
const func = async () => {
    const res = await contract.mint(tokenURI)
    console.log(res)
}

func()
