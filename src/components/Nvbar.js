import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { ethers } from 'ethers';
import logo from '../images/srr.png';
import wallet from '../images/ConnectWallet.png';

const Nvbar = () => {
  
  const loadEthers = async () => {

    if (window.ethereum) {
     
      console.log('window.ethereum: ', window.ethereum );

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('accounts: ', accounts);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log('provider: ', provider);

      const signer = provider.getSigner();
      console.log('signer: ', signer);

      const signerAddress = await signer.getAddress();
      console.log('signerAddress: ', signerAddress);

      const networkId = await provider.getNetwork();
      const nwork = networkId.name;
      console.log('networkId: ', networkId);
      console.log('networkName: ', nwork);

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      console.log('chainId: ', chainId);

    }

    if (!window.ethereum) {
      window.alert('Connect to Wallet');
    }
  }


  const isLoadEthers = async () => {
    
    if (!window.ethereum) {
      console.log('Connect to Wallet'); 
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
          <Nav.Link onClick={loadEthers}><img src={wallet} width={180} alt="Wallet"/></Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
    </div>

  )
}

export default Nvbar;

// <Nav.Link onClick={loadEthers}><img src={wallet} width={180} alt="Wallet"/></Nav.Link>
