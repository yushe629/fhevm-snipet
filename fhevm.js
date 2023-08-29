const { ethers } = require("ethers");
const { createInstance, initFhevm } = require("fhevmjs");
const fs = require("fs");

/**
 * 必要なもの
 * network の情報
 * provider
 * 
 * 
 * fhevmjs
 * - encrypt parameters with blockchain public key
 * - decrypt incoming data encrypted with user public key(not FHE)
 * 
 * - chainId: sepoliaなら11155111
 * - public key: 暗号化に使用, blockchainのprivatekey
 * - TFHEで生成したpublic key, private keyの組
 * - signature: eip-712規格 ブラウザは取得が容易だが、node.js上では少し手間がかかりそう
 * 
 * 
 * 手順
 * 1. instanceの生成 chainId, publicKey, keypairs(optional)
 * 
 */


// sepolia chainId
const chainId = 11155111;
const network = "sepolia";
const provider = ethers.getDefaultProvider(network)

// publicKey: sample in nodejs environment
const commonPublicKey = "0x000000000030";

// privatekey
const privateKey = JSON.stringify(fs.readFileSync("./privatekey.json"));
const signer = new ethers.Wallet(
	privateKey,
	provider
)
const userAddress = signer.address
console.log(userAddress)


// sample: Encrypted ERC20 contract
const contractAddress = "0x138d91974e88E463021016D49B3b981eeb27FbcE"
const contractAbi = JSON.parse(fs.readFileSync("./erc20Abi.json"))
const contract = new ethers.Contract(contractAddress, contractAbi, signer)


const generateTokenOption = {
	verifyingContract: contractAddress,
	name: "Authentication"
}

// const dummyAddress = "0x0000000000000000000000000000000000000044"
const initInstance = async () => {
	// // 
	// const fhevmKey = await provider.call({
	// 	from: null,
	// 	to: dummyAddress
	// })
	return await createInstance({chainId, publicKey: commonPublicKey})
}

const main = async () => {
	const instance = await initInstance()
	const {publicKey, token} = instance.generateToken(generateTokenOption)

	// 署名の取得
	// browserで署名を取得
	// node.jsでeip-712を取得する部分は未完成
	const params = [ userAddress, token ]
	const signature = await window.ethereum.request({ method: 'eth_signTypedData_v4', params });
	// const signature = signer._signTypedData()

	instance.setTokenSignature(contractAddress, signature)

	// コントラクトの呼び出しと結果の復号
	const response = await contract.balanceOf(publicKey, signature)
    const dec = instance.decrypt(contractAddress, response)

	// mint の場合
	const encryptedAmount = instance.encrypt16(1000)
	const mintRes = await contract.mint(encryptedAmount)
	const decryptData = instance.decrypt(contractAddress, mintRes)

	return {signature, publicKey}
};

main()

