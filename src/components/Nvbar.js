import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { ethers } from 'ethers';
import logo from '../images/srr.png';
import wallet from '../images/ConnectWallet.png';

const Nvbar = () => {
  
  const loadEthers = async () => {

    if (window.ethereum) {

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const networkId = await provider.getNetwork();
      const nwork = networkId.name;

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });

    }
  }

  return (

    <div>
      <Navbar collapseOnSelect expand="md" bg="">
      <Navbar.Brand as={Link} to="/"><img src={logo} width="75" alt="Logo" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link className="mx-2" eventKey={1} as={NavLink} to="/"><h4>Home</h4></Nav.Link>
          <Nav.Link className="mx-2" eventKey={2} as={NavLink} to="/realestate"><h4>Real Estate</h4></Nav.Link>
          <Nav.Link className="mx-2" eventKey={3} as={NavLink} to="/dex"><h4>DEX</h4></Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link><img src={wallet} width={180} alt="Wallet"/></Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
    </div>

  )
}

export default Nvbar;

// <Nav.Link onClick={loadEthers}><img src={wallet} width={180} alt="Wallet"/></Nav.Link>
