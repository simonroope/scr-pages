import React, { useState } from 'react';

const TYPE = {
  MARKET: 'MARKET',
  LIMIT: 'LIMIT'
};

const SIDE = {
  BUY: 0,
  SELL: 1
};

function NewOrder({createMarketOrder, createLimitOrder}) {

  const initialOrder =  {
    side: SIDE.BUY,
    type: TYPE.MARKET,
    amount: '',
    price: ''
  };

  const [order, setOrder] = useState( initialOrder );
 
  const onSubmit = (e) => {
    e.preventDefault();
    if(order.type === TYPE.MARKET) {
      createMarketOrder(order.amount, order.side);
      setOrder( { side: order.side, type: order.type, amount: '', price: '' });
    } else {
      createLimitOrder(order.amount, order.price, order.side);
      setOrder( { side: order.side, type: order.type, amount: '', price: '' });
    }
    setButtonText(`SUCCESS`); 
    setTimeout(() => changeButtonText(order.side),5000); 
  }

  const [buttonText, setButtonText] = useState(`PLACE ${order.side === SIDE.BUY ? 'BUY' : 'SELL'} ORDER`); //same as creating your state variable where "Next" is the default value for buttonText and setButtonText is the setter function for your state variable instead of setState
  const changeButtonText = (iSide) => setButtonText(`PLACE ${iSide === SIDE.BUY ? 'BUY' : 'SELL'} ORDER`);
  
  return (
    <div id="orders" className="dex">
      <h6>Order Form</h6>
      <form onSubmit={(e) => onSubmit(e)}>

      <div className="form-group row">
          <div className="col-sm-8">
            <div id="side" className="btn-group-buy-sell" role="group">
              <button 
                type="button" 
                className={`btn btn-buy ${order.side === SIDE.BUY ? 'active' : ''}`}
                onClick={() => { setOrder(order =>  ({ ...order, side:  SIDE.BUY})); changeButtonText(SIDE.BUY); } }
              >BUY</button>
              <button 
                type="button" 
                className={`btn btn-sell ${order.side === SIDE.SELL ? 'active' : ''}`}
                onClick={() => { setOrder(order => ({ ...order, side:  SIDE.SELL})); changeButtonText(SIDE.SELL); } }
              >SELL</button>
            </div>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-8">
            <div id="type" className="btn-group-market-limit" role="group">
            <button 
                type="button" 
                className={`btn ${order.type === TYPE.MARKET ? 'active' : ''}`}
                onClick={() => setOrder(order => ({ ...order, type: TYPE.MARKET}))}
              >Market</button>
              <button 
                type="button" 
                className={`btn ${order.type === TYPE.LIMIT ? 'active' : ''}`}
                onClick={() => setOrder(order => ({ ...order, type: TYPE.LIMIT}))}
              >Limit</button>
            </div>
          </div>
        </div>
        
        <div className="form-group col-8">
          <label className="col-form-label col-form-label-sm" htmlFor="order-amount">Amount</label>
            <input 
              id="order-amount" 
              type="text" 
              className="form-control" 
              onChange={({ target: { value }}) => setOrder(order => ({ ...order, amount: value}))}
              value={order.amount} 
            />
        </div>
        {order.type === TYPE.MARKET ? null :
            <div className="form-group col-8">
            <label className="col-form-label col-form-label-sm" htmlFor="order-price">Limit Price</label>
            <input 
              id="order-price" 
              type="text" 
              className="form-control" 
              onChange={({ target: { value }}) => setOrder(order => ({ ...order, price: value}))}
              value={order.price} 
            />
          </div>
        }
          <button type="submit" 
                  className={`${order.side === SIDE.BUY ? 'btn-buy-submit' : 'btn-sell-submit'} col-8`}>{buttonText}</button>

      </form>
    </div>

  );
}

export default NewOrder;