// import { BrowserProvider } from 'ethers';
// import { initFhevm, createInstance } from 'fhevmjs';
const ethers = require('ethers');
const { createInstance } = require('fhevmjs');

// chainId must be a number.
const chainId = 11155111
const network = "sepolia"
const publicKey = "0x000000000000000000000000000000000000000"


const provider = ethers.getDefaultProvider(network)


// const keyPair = {
//     [key: string]: {
//         publicKey: string;
//         privateKey: string;
//         signature?: string | null;
//     };
// }



const generateTokenOption = {
    verifyingContract: "0x138d91974e88E463021016D49B3b981eeb27FbcE",
    name: "authentication",
}

const main = async () => {
    const instance = await createInstance({chainId, publicKey})
    const res = instance.generateToken(generateTokenOption)
    console.log(res)
}

main()
