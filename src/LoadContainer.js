import React, { useState, useEffect } from "react";
import { getBlockchain, getReContracts, getDexContracts } from './utils.js';
import App from './App.js';

function LoadContainer() {

  const [blockchain, setBlockchain] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [reContracts, setReContracts] = useState(undefined);
  const [dexContracts, setDexContracts] = useState(undefined);

  useEffect(() => {

    const init = async () => {

      console.log('LoadContainer.init');

      let blockchain, accounts, reContracts, dexContracts;

      try {
        console.log('LoadContainer.getBlockchain');
        blockchain = await getBlockchain();
        accounts = blockchain.accounts;
        console.log('LoadContainer.blockchain.networkId: ', blockchain.networkId.chainId);
      }
      catch {
      }

      try {
        reContracts = await getReContracts(blockchain);
      }
      catch {
      }

      try {
        dexContracts = await getDexContracts(blockchain);
      }
      catch {
      }
 
      console.log('LoadContainer.set');

      setBlockchain(blockchain);
      setAccounts(accounts);
      setReContracts(reContracts);
      setDexContracts(dexContracts);

    }
    init();
  }, []);

  const isReady = () => {

    return (
      typeof blockchain !== 'undefined' 
      && typeof reContracts !== 'undefined'
      && typeof dexContracts !== 'undefined'
      && accounts.length > 0
    );
  }

  return (
    <App
      blockchain={blockchain}
      accounts={accounts}
      reContracts={reContracts}
      dexContracts={dexContracts}
    />
  );
}

export default LoadContainer;
