import { ethers } from "ethers";
import { useEffect, useState } from "react";

let lastTokenInfo = {};

const useMinter = (CONTRACT_ADDRESS, ABI) => {
  const [minting, setMinting] = useState(false);
  const [account, setAccount] = useState('');
  const [mintedTokens, setMintedTokens] = useState([]);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      return;
    }
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts.length !== 0) {
      setAccount(accounts[0]);
      setupEventListener();
    }
  }

  const setupEventListener = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          const existingTokens = mintedTokens.slice();
          existingTokens.push({
            ...lastTokenInfo,
            image: `https://gateway.pinata.cloud/ipfs/${lastTokenInfo.image}`,
            url: `https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}/${tokenId}`,
          });
          setMintedTokens(existingTokens);
        });
      }
    } catch (error) {
      console.log(error)
    }
  }
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      setupEventListener();
    } catch (error) {
      console.log(error);
    }
  }

  const mintNewToken = async (name, desc, image, attribs) => {
    try {
      setMinting(true);
      lastTokenInfo = { name, desc, image };
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        let nftTxn = await connectedContract.makeAnEpicNFT(name, desc, `ipfs://${image}`, attribs);
        console.log(nftTxn);
        await nftTxn.wait();
      }
    } catch (error) {
      console.log(error)
    } finally {
      setMinting(false);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
  return [
    account,
    connectWallet,
    minting,
    mintedTokens,
    mintNewToken,
  ]
}

export default useMinter;