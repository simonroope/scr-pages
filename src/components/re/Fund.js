import React from 'react'; 
import { Container, Row, Col, Card } from "react-bootstrap";

function Fund({funds}) {

  return (
    <>
          {funds.map((fund, index) => (
            <Container key={index}>
              <Row className="text-center">
                <Col xs={6} md={4}>
                  <Card className="mb-3">
                    <Card.Header>FUND NAV</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        £ {fund.nav} 
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6} md={4}>
                  <Card className="mb-3">
                    <Card.Header >SHARES ISSUED</Card.Header>
                    <Card.Body >
                      <Card.Text>
                        {fund.sharesIssued}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6} md={4}>
                  <Card className="mb-3">
                    <Card.Header >SHARE PRICE</Card.Header>
                    <Card.Body >
                      <Card.Text>
                        {fund.sharePrice / 100} DAI
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6} md={4}>
                  <Card className="mb-3">
                    <Card.Header >CAPITAL VALUE</Card.Header>
                    <Card.Body >
                      <Card.Text>
                        £ {Math.abs(fund.capitalValue) / 1.0e+6} M
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6} md={4}>
                  <Card className="mb-3">
                    <Card.Header >CASH</Card.Header>
                    <Card.Body >
                      <Card.Text>
                         { (fund.cash / ( 10 ** 18 )).toFixed(2) } DAI
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={6} md={4}>
                  <Card className="mb-2">
                    <Card.Header >INVESTORS</Card.Header>
                    <Card.Body >
                      <Card.Text>
                        {fund.investors}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          ))}
  </>
  );
}

export default Fund;