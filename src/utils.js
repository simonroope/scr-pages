import { ethers, Contract } from 'ethers';

import Dai from './contracts/Dai.json';
import RealEstate from './contracts/RealEstate.json';

import Bat from './contracts/Bat.json';
import Dar from './contracts/Dar.json';
import Rep from './contracts/Rep.json';
import Zrx from './contracts/Zrx.json';
import Dex from './contracts/Dex.json';

import addresses from './data/addresse6.js'

const getBlockchain = () => 

  new Promise( async (resolve, reject) => {

    if (typeof window.ethereum === 'undefined') {
      console.log('window.ethereum undefined');
    }

    if (window.ethereum) {

      console.log('If window.ethereum 2: ', window.ethereum);

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      console.log('Utils accounts: ', accounts);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log('provider: ', provider);

      const signer = provider.getSigner();
      console.log('signer: ', signer);

      const signerAddress = await signer.getAddress();
      console.log('signerAddress: ', signerAddress);

      const networkId = await provider.getNetwork();
      console.log('networkId: ', networkId );

      resolve( {accounts, signer, signerAddress, provider, networkId} );
    }

    console.log('Utils resolve accounts,signer...');

    resolve( {accounts: undefined, signer: undefined, signerAddress: undefined, provider: undefined, networkId: undefined} );

    console.log('Utils RESOLVED accounts,signer...');

  });

const getReContracts = async (blockchain) => {

  const nWork = blockchain.networkId.name;
  const nWorkChain = blockchain.networkId.chainId;

  let daiAddress;
  let reAddress;

  if ( nWork === 'unknown' && nWorkChain === 31337 ) {
    //console.log('Localhost Re: ', addresses.lhostReDate);
    daiAddress = addresses.lhostDaiAddr;
    reAddress = addresses.lhostReAddr;
  }

  if (nWork === 'kovan') {
    daiAddress = addresses.kovanDaiAddr;
    reAddress = addresses.kovanReAddr;
  }

  if (nWork === 'rinkeby') {
    daiAddress = addresses.rinkebyDaiAddr;
    reAddress = addresses.rinkebyReAddr;
  }

  if ( nWork === 'unknown' && nWorkChain === 97 ) {   // Binance test
    daiAddress = addresses.bscTestDaiAddr;
    reAddress = addresses.bscTestReAddr;
  }

  const dai = new Contract(
    daiAddress,
    Dai.abi,
    blockchain.signer
  );

  const re = new Contract(
    reAddress,
    RealEstate.abi,
    blockchain.signer
  );

  return { dai, re };
  }

  const getDexContracts = async (blockchain) => {

    const nWork = blockchain.networkId.name;
    const nWorkChain = blockchain.networkId.chainId;

    let batAddr, darAddr, repAddr, zrxAddr, dexAddr;

    if ( nWork === 'unknown' && nWorkChain === 31337 ) {
      //console.log('Localhost Dex: ', addresses.lhostDexDate);
      batAddr = addresses.lhostBatAddr;
      darAddr = addresses.lhostDarAddr;
      repAddr = addresses.lhostRepAddr;
      zrxAddr = addresses.lhostZrxAddr;
      dexAddr = addresses.lhostDexAddr;
    }

    if (nWork === 'kovan') {
      console.log('Kovan: ', addresses.kovanDexDate);
      batAddr = addresses.kovanBatAddr;
      darAddr = addresses.kovanDarAddr;
      repAddr = addresses.kovanRepAddr;
      zrxAddr = addresses.kovanZrxAddr;
      dexAddr = addresses.kovanDexAddr;
    }

    if ( nWork === 'rinkeby' ) { 
      console.log('Rinkeby :', addresses.rinkebyDexDate);
      batAddr = addresses.rinkebyBatAddr;
      darAddr = addresses.rinkebyDarAddr;
      repAddr = addresses.rinkebyRepAddr;
      zrxAddr = addresses.rinkebyZrxAddr;
      dexAddr = addresses.rinkebyDexAddr;
    } 
  
    if ( nWork === 'unknown' && nWorkChain === 97 ) {
      console.log('bscTestnet :', addresses.bscTestDexDate);
      batAddr = addresses.bscTestBatAddr;
      darAddr = addresses.bscTestDarAddr;
      repAddr = addresses.bscTestRepAddr;
      zrxAddr = addresses.bscTestZrxAddr;
      dexAddr = addresses.bscTestDexAddr;
    }

    const bat = new Contract(
      batAddr,
      Bat.abi,
      blockchain.signer
    );

    const dar = new Contract(
      darAddr,
      Dar.abi,
      blockchain.signer
    );

    const rep = new Contract(
      repAddr,
      Rep.abi,
      blockchain.signer
    );

    const zrx = new Contract(
      zrxAddr,
      Zrx.abi,
      blockchain.signer
    );

    const dex = new Contract(
      dexAddr,
      Dex.abi,
      blockchain.signer
    );

    return { bat, dar, rep, zrx, dex };
  }

  export { getBlockchain, getReContracts, getDexContracts };
