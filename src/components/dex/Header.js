import React from 'react'; 
import { Row, Col } from 'react-bootstrap';
import Dropdown from './Dropdown.js';

const Header = ({ blockchain, user, tokens, selectToken }) => {

  let networkName;

  switch(blockchain.networkId.chainId) {

  case 31337:
    networkName = "Localhost";
    break;
  case 42:
    networkName = "Kovan"; 
    break;
  case 4:
    networkName = "Rinkeby"; 
    break;
  case 5:
    networkName = "Goerli";
    break;
  case 80001:
    networkName = "Matic Mumbai";
    break;
  case 97:
    networkName = "Binance Test"; 
    break;
  case 56:
    networkName = "Binance"; 
    break;
  default:
    networkName = blockchain.networkId.name;
  }

  return (
      <Row>
        <Col>
          <Dropdown 
            items={tokens.map((token) => ({
              label: token.label,
              value: token
            }))} 
            activeItem={{
              label: user.selectedToken.label,
              value: user.selectedToken
            }}
            onSelect={selectToken}
          />
        </Col>
        <Col className='small-font d-flex justify-content-end'>
          {networkName} - {user.accounts[0].substring(0, 6) + '...' + user.accounts[0].substring(user.accounts[0].length - 6)}
        </Col>
      </Row>
  );
}

export default Header;

// <div className='text-left mr-4'><small>{networkName} - {user.accounts[0].substring(0, 6) + '...' + user.accounts[0].substring(user.accounts[0].length - 6)}</small></div>

