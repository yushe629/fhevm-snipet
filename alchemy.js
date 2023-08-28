// import { Network, Alchemy } from "alchemy-sdk"
const { Network, Alchemy } = require("alchemy-sdk")

const alchemySettings = {
    // apiKey is Alchemy api key.
    apiKey: "",
    network: Network.ETH_SEPOLIA,
}

const alchemy = new Alchemy(alchemySettings);
// owner address is wallet id.
const ownerAddress = ""

const main = async () => {
    const nftsForOwner = await alchemy.nft.getNftsForOwner(ownerAddress);

for (const nft of nftsForOwner.ownedNfts) {
    console.log("contract address:", nft.contract.address);
    console.log("token ID:", nft.tokenId);
  }
  
const response = alchemy.nft.getNftMetadata(
    // contract address and tokenId
    "",
    ""
).then((res) => console.log(JSON.stringify(res)));
}

main()