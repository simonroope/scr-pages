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

      const blockchain = await getBlockchain();
      const accounts = blockchain.accounts;
        
      const reContracts = await getReContracts(blockchain);
      
      const dexContracts = await getDexContracts(blockchain);
 
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

  if (!isReady()) {
    return <div>Connect Wallet</div>;
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
