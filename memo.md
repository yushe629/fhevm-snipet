# zamaのサンプル

https://dapps.zama.ai/
にcontractのサンプルが転がっている

- eip-712
- erc-20
- blind auction
- private bet



dapps.zama.ai における実装を見る感じ
1. initFhevm(): browser only
2. { publicKey, token } = generateToken(contactAddress)
3. params = [userAddress, token]
4. signature = window.ethereum.request({method: 'eth_signTypeData_v4', params})
   1. 上はブラウザでのやりかた
   2. node上では？
5. getInstance().setTokenSignature(contractAddress, signature);
6. return {signature, publicKey}


