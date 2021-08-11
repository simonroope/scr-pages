import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

import { ethers } from 'ethers';

import Fund from './Fund';
import Property from './Property';
import Investor from './Investor';
import InvestInFund from './InvestInFund';
import InvestorPie from './InvestorPie';
import InvestorBar from './InvestorBar';

import PropertyData from '../../data/propertyData';

const RealEstate = ({blockchain, accounts, contracts}) => {

  const [userInvestor, setUserInvestor] = useState([]);
  const [funds, setFunds] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [properties, setProperties] = useState([]);

  const getProperties = async () => {

    const properties = PropertyData.property.map( prop => ( {
       ...prop,
       photoHash: 'Qmd8MZunosBioiLhqLJEJAC3LNQu5gcdbJzz8W4PAT1826'
    } ));

  return properties;
}

  const getFundBalances = async () => {

    const fundsXR = await contracts.re.getFundBalances();

    const fundsX = fundsXR.map(f => ({
        name: ethers.utils.parseBytes32String(f.name),
        nav: f.nav.toString(),
        sharesIssued: f.sharesIssued.toString(),
        sharePrice: f.sharePrice.toString(),
        capitalValue: f.capitalValue.toString(),
        cash: f.cash.toString(),
        investors: f.investors.toString()
     })
    )
    return fundsX
  }
 
  const getInvestorBalances = async () => {

    let investorsXR;
    try {
      investorsXR = await contracts.re.getAllInvestors();
    }
    catch (err) {
      console.log('Err: ',err);
      console.error(err)
    }
    
    const sharesIssued = investorsXR.reduce( ( sum , cur ) => sum + Number(cur.shareBalance), 0);
    
    const investorsX = investorsXR.map(i => ({
        investor: i.investor,
        investorName: ethers.utils.parseBytes32String(i.name),
        investorCountry: ethers.utils.parseBytes32String(i.country),
        daiBalance: i.daiBalance.toString(),
        shareBalance: i.shareBalance.toString(),
        sharePercent: (i.shareBalance.toString())/sharesIssued.toString()
     })
    )
    
    return investorsX;
  }

  const investInFund = async (_side, _name, _country, _shareAmount, _daiAmount) => { 
 
    const hexName = ethers.utils.formatBytes32String(_name);
    const hexCountry = ethers.utils.formatBytes32String(_country);
    const stringDai = ethers.utils.parseEther(_daiAmount.toString());

    try {
      const tx = await contracts.re.connect(blockchain.signer).investInFund(_side, hexName, hexCountry, _shareAmount, stringDai);
      const txReceipt = await tx.wait(); 
    }
    catch (err) {
      console.error(err)
    }

    const investors = await getInvestorBalances();

    const funds = await getFundBalances();

    setInvestors(investors);
    setFunds(funds);

  }

  const getUserInvestor = async () => {

    const allInvestorDetails = await getInvestorBalances();
    const userInvestorDetails = allInvestorDetails.find(i => i.investor.toLowerCase() === accounts[0].toLowerCase());

    return userInvestorDetails;
  
  }

  useEffect(() => {

    const init = async () => {

      const userInvestor = await getUserInvestor();
      const funds = await getFundBalances();
      const investors = await getInvestorBalances();
      const properties = await getProperties();

      setInvestors(investors);
      setUserInvestor(userInvestor);
      setProperties(properties);
      setFunds(funds);

      if ( funds.length === 0 ) {

        const nullFunds = [{
          name: 'Reit Fund',
          nav: 435,
          sharesIssued: 0,
          sharePrice: 129,
          capitalValue: 666600000,
          cash: 32.39 * 10 ** 18,
          investors: 0
        }];
        setFunds(nullFunds);
      }

    };
    init();

  },[])

  return (

    <Container>

      {funds.map((fund, index) => (
        <div key={index}>
        <h5>{fund.name}</h5>

      <Row >
        <Col xs={12} lg={6}>
          <Fund funds={funds} /> 
        </Col>

        <Col xs={12} lg={6}>
          <Card className="mb-3">
            <Card.Header>Properties In Fund</Card.Header>
            <Card.Body>
              <Card.Text>
                <Property properties={properties} />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col >
          <Card className="mb-3" >
            <Card.Header>Investors In Fund</Card.Header>

            <Row>
              <Col xs={12} sm={12} md={4}>
                <Card.Body>
                  <Card.Text>
                     <Investor investors={investors} />
                     <InvestInFund investInFund={investInFund} userInvestor={userInvestor} funds={funds} />
                  </Card.Text>
                </Card.Body>
              </Col>

              <Col xs={12} sm={6} md={4} > 
                <Card.Body>
                  <Card.Text>
                    <InvestorPie investors={investors} />
                  </Card.Text>
                </Card.Body>
              </Col>

              <Col xs={12} sm={6} md={4}> 
                <Card.Body>
                  <Card.Text>
                     <InvestorBar investors={investors} />
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>      

          </Card>
        </Col>
      </Row>

      </div>  
        )) }

  </Container>

  );
}

export default RealEstate; 
