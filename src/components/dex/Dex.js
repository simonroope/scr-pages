import React, { useState, useEffect } from "react";

import { ethers } from 'ethers';

import Header from './Header.js';
import Wallet from './Wallet.js';
import NewOrder from './NewOrder.js';
import AllOrders from './AllOrders.js';
import MyOrders from './MyOrders.js';
import AllTrades from './AllTrades.js';

const SIDE = {
  BUY: 0,
  SELL: 1
};

const Dex = ({blockchain, accounts, contracts}) => {

  const [tokens, setTokens] = useState([]);

  const [user, setUser] = useState({
    accounts: [],
    balances: {
      tokenDex: 0,
      tokenWallet: 0
    },
    selectedToken: undefined
  });

  const [orders, setOrders] = useState({
    buy: [],
    sell: []
  });

  const [trades, setTrades] = useState([]);
  const [listener, setListener] = useState(undefined);

  const getBalances = async (account, token) => {

    const ticker = token.ticker.toLowerCase();
    const tokenWallet = await contracts[ticker].balanceOf(account);

    const tokenDex = await contracts.dex.traderBalances(account, ethers.utils.formatBytes32String(token.ticker));

    return {tokenDex, tokenWallet};
  }

  const getOrders = async token => {

    const rawOrders = await Promise.all([
      contracts.dex.getOrders(ethers.utils.formatBytes32String(token.ticker), SIDE.BUY),
      contracts.dex.getOrders(ethers.utils.formatBytes32String(token.ticker), SIDE.SELL)
    ]);

    const buyOrders = rawOrders[0].map(order => ({
      ...order,
      id: order.id.toNumber(),
      amount: order.amount.toNumber(),
      price: order.price.toNumber(),
      filled: order.filled.toNumber(),
      date: order.date.toNumber()
    }));

    const sellOrders = rawOrders[1].map(order => ({
      ...order,
      id: order.id.toNumber(),
      amount: order.amount.toNumber(),
      price: order.price.toNumber(),
      filled: order.filled.toNumber(),
      date: order.date.toNumber()
    }));

    return { buy: buyOrders, sell: sellOrders };
  }

  const listenToTrades = async token => {

    const tradeIds = new Set();
    setTrades([]);

    const tradeFilter = contracts.dex.filters.NewTrade(null, null, ethers.utils.formatBytes32String(token.ticker)); 
    tradeFilter.fromBlock = 0;

    const allTradesRaw = await contracts.dex.queryFilter(tradeFilter);

    const allTrades = allTradesRaw.map( trade => ({
      ...trade.args,
      tradeId: trade.args.tradeId.toNumber(),
      orderId: trade.args.orderId.toNumber(),
      ticker: trade.args.ticker,
      trader1: trade.args.trader1,
      trader2: trade.args.trader2,
      amount: trade.args.amount.toNumber(),
      price: trade.args.price.toNumber(),
      date: trade.args.date.toNumber()
    }));


    setTrades( trades => ( [...trades, ...allTrades] )); 

    const listener = contracts.dex.on(tradeFilter, ( tradeId, orderId, ticker, trader1, trader2,
                                                     amount, price, date, newTrade ) => {

      if (tradeIds.has(newTrade.args.tradeId.toNumber())) return;
        tradeIds.add(newTrade.args.tradeId.toNumber());

        setTrades(trades => ([...trades, { tradeId: newTrade.args.tradeId.toNumber(),
                                           orderId: newTrade.args.orderId.toNumber(),
                                           ticker: newTrade.args.ticker,
                                           trader1: newTrade.args.trader1,
                                           trader2: newTrade.args.trader2,
                                           amount: newTrade.args.amount.toNumber(),
                                           price: newTrade.args.price.toNumber(),
                                           date: newTrade.args.date.toNumber()
                                          } ])
                  );
    });

    setListener(listener);
  }

  const selectToken = token => {
    setUser({...user, selectedToken: token});
  }

  const deposit = async (amount) => {

    await contracts[user.selectedToken.ticker.toLowerCase()]
      .connect(blockchain.signer)
      .approve(contracts.dex.address, amount);

    const tx = await contracts.dex
      .connect(blockchain.signer)
      .deposit(ethers.utils.formatBytes32String(user.selectedToken.ticker),amount);
    const txReceipt = await tx.wait(); 
   
    const balances = await getBalances(
      user.accounts[0],
      user.selectedToken
    );

    setUser(user => ({ ...user, balances}));
  }

  const withdraw = async amount => {
    const tx = await contracts.dex
      .connect(blockchain.signer)
      .withdraw(
        ethers.utils.formatBytes32String(user.selectedToken.ticker),
        amount
      );
    const txReceipt = await tx.wait(); 
   
    const balances = await getBalances(
      user.accounts[0],
      user.selectedToken
    );
    setUser(user => ({ ...user, balances}));
  }

  const createMarketOrder = async (amount, side) => {
    const mTx = await contracts.dex
      .connect(blockchain.signer)
      .createMarketOrder(
       ethers.utils.formatBytes32String(user.selectedToken.ticker),
       amount,
       side,
       { gasPrice: ethers.utils.parseUnits("50", "gwei") }
      );

    console.log(`Tx-hash: ${mTx.hash}`)
    const mReceipt = await mTx.wait();
    console.log(`Tx was mined in block: ${mReceipt.blockNumber}`)
    console.log("createMarketOrder tx receipt: ", mReceipt);

    const orders = await getOrders(user.selectedToken);
    setOrders(orders);
  }

  const createLimitOrder = async (amount, price, side) => {

    console.log(amount,'-',price,'-',side);

    const lTx = await contracts.dex
      .connect(blockchain.signer)
      .createLimitOrder(
        ethers.utils.formatBytes32String(user.selectedToken.ticker),
        amount,
        price,
        side
      );

    console.log(`Tx-hash: ${lTx.hash}`)
    const lReceipt = await lTx.wait();
    console.log(`Tx was mined in block: ${lReceipt.blockNumber}`)
    console.log("createLimitOrder tx receipt: ", lReceipt);

    const orders = await getOrders(user.selectedToken);
    console.log('CreateLimitOrders: ',orders);
    setOrders(orders);
    console.log('setOrders: ',orders);
  }

  useEffect(() => {

    const init = async () => {

      const rawTokens = await contracts.dex.getTokens(); 

      const tokens = rawTokens.map(token => ({
        ...token,
        ticker: ethers.utils.parseBytes32String(token.ticker),
        label: ethers.utils.parseBytes32String(token.label)
      }));

      const [balances, orders] = await Promise.all([
        getBalances(accounts[0], tokens[0]),
        getOrders(tokens[0])
      ]);

      listenToTrades(tokens[0]);

      setTokens(tokens);

      setUser({accounts, balances, selectedToken: tokens[0]});
      setOrders(orders);

    }
    init();
  }, []);


  useEffect(() => {

    const init = async () => {
    
      const [balances, orders] = await Promise.all([
        getBalances(
          user.accounts[0], 
          user.selectedToken
        ),
        getOrders(user.selectedToken)
      ]);

      listenToTrades(user.selectedToken);
      setUser(user => ({ ...user, balances}));
      setOrders(orders);

    }

    if(typeof user.selectedToken !== 'undefined') {
      init();
    }

  }, [user.selectedToken], () => {
    //contracts.dex.off;
  });

  if(typeof user.selectedToken === 'undefined') {
    return <div>Loading...</div>;
  }

  return (
    <div id="app">
      <main className="container-fluid">
        <Header blockchain={blockchain} user={user} tokens={tokens} selectToken={selectToken} />
        <div className="row mt-4">
          <div className="col-sm-4">
            <Wallet user={user} deposit={deposit} withdraw={withdraw} />
            <div>
            {user.selectedToken.label !== 'DAI' ? (
              <NewOrder 
                createMarketOrder={createMarketOrder}
                createLimitOrder={createLimitOrder}
              />
            ) : null}
            </div>
          </div>
          {user.selectedToken.label !== 'DAI' ? (
            <div className="col-sm-8">
              <AllTrades 
                trades={trades}
              />
              <AllOrders 
                orders={orders}
              />
              <MyOrders 
                orders={{
                  buy: orders.buy.filter(
                   order => order.trader.toLowerCase() === accounts[0].toLowerCase()
                ),
                  sell: orders.sell.filter(
                    order => order.trader.toLowerCase() === accounts[0].toLowerCase()
                )
              }}
            />
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default Dex;
