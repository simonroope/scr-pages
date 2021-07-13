import React, { useState } from 'react';
import { Form } from "react-bootstrap";

const DIRECTION = {
  WITHDRAW: 'WITHDRAW',
  DEPOSIT: 'DEPOSIT'
};

const Wallet = ({deposit, withdraw, user}) => {

  const initialAmount = '';

  const [direction, setDirection] = useState(DIRECTION.DEPOSIT);
  const [amount, setAmount] = useState(initialAmount);

  const onSubmit = (e) => {
    e.preventDefault();
    if(direction === DIRECTION.DEPOSIT) {
      deposit(amount);
    } else {
      withdraw(amount);
    }
    setAmount( initialAmount );
  }

  return (
    <div className="dex mb-5">
      <h6>Wallet Balance</h6>
      <div className="form-group row mb-2">
        <div className="col-sm-8">
          <input 
            className="form-control" 
            id="wallet" 
            disabled 
            value={user.balances.tokenWallet}
          />
        </div>
      </div>
      <div className="form-group row mb-4">
        <div className="col-sm-8">
          <input 
            className="form-control" 
            id="walletdex" 
            disabled 
            value={user.balances.tokenDex}
          />
        </div>
      </div>
      <Form id="transfer" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group row mb-3">
          <div className="col-sm-8">
            <div id="direction" className="btn-group-deposit-withdraw" role="group">
              <button 
                type="button" 
                className={`btn ${direction === DIRECTION.DEPOSIT ? 'active' : ''}`}
                onClick={() => setDirection(DIRECTION.DEPOSIT)}
              >&darr; Deposit</button>
              
              <button 
                type="button" 
                className={`btn ml-3 ${direction === DIRECTION.WITHDRAW ? 'active' : ''}`}
                onClick={() => setDirection(DIRECTION.WITHDRAW)}
              >&uarr; Withdraw</button>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-8">
            <div className="input-group">
              <input 
                id="amount" 
                type="text" 
                className="form-control" 
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            <div className="input-group-append">
              <span className="input-group-text">{user.selectedToken.ticker}</span>
            </div>
              <button type='submit' className="btn-wallet-submit ml-3">Submit</button>
          </div>
        </div>
      </div>
      </Form>
    </div>
  );
}

export default Wallet;
