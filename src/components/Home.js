import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

import scrimage from '../images/SCRoope.jpg';
import linkedinlogo from '../images/linkedin.png';
import gitlogo from '../images/github.png';
import twitterlogo from '../images/twitter.png';
import scrcv from '../images/sroopeCV.pdf';

const Home = () => { 

  console.log('Home');

  return (
    
    <div>

    <Container>
    <Row className="align-items-center">
    <Col sm={8} md={6}>
          <h1>Simon Roope</h1>
          <h3>Full Stack DeFi Blockchain Developer</h3>
          <p>London<br/>Tel: +44 (0)7967 655594<br/>  
          Email: <a href="mailto:simonroope@gmail.com?subject=Hire Blockchain Developer">simonroope@gmail.com</a>
          </p>
    </Col>
    <Col sm={8} md={6}>
      <Image width="250" className="rounded p-2" src={scrimage} />
    </Col>
    </Row>

      <p>
         <br/>
         A self-motivated and driven Solidity developer with fifteen years of FinTech experience;
         building web and blockchain applications, data visualisations, large data warehouses and 
         high volume OLTP databases.
         <br/>
         <br/>
         Now engaged in DeFi and NFT projects; currently the tokenisation of Real Estate assets on 
         the Ethereum network to create secondary markets, liquidity, enhanced fund compliance, transparency 
         and lower cost of investor onboarding and income distribution. Developed with ERC20, ERC721 & ERC1155
         tokens, OpenZeppelin implementations, proxy contracts and integration with external Chainlink oracles, 
         IPFS and Polygon Layer 2 scaling.
         <br/>
         <br/>
         Other DeFi work includes the creation of Solidity smart contracts on Ethereum and Binance networks 
         for ICO coin issues, Uniswap forks, yield farming, liquidity pools, arbitrage and flashloans.
         <br/>
         <br/>
    </p>
  
    <Row className="mr-auto mx-auto">

      <Col> 
        <a className='mx-2' href='https://www.linkedin.com/in/simon-roope-1bb1587' target='_blank' rel='noreferrer'><img alt='LinkedInLogo' src={linkedinlogo} width='25' height='25'/></a>
        <a className='mx-2' href='https://github.com/simonroope' target='_blank' rel='noreferrer'><img alt='GithubLogo' src={gitlogo} width='25' height='25'/></a>
        <a className='mx-2' href='https://twitter.com/simonroope' target='_blank' rel='noreferrer'><img alt='TwitterLogo' src={twitterlogo} width='25' height='25'/></a>
      </Col>
     
      <Col >
        <a href={scrcv} target='_blank' rel='noreferrer'>Download CV</a>
      </Col>

    </Row>
    
    </Container>
    </div>
  );
}

export default Home;
