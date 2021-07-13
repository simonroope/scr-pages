import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { Container, Modal, Form, Button } from "react-bootstrap";

const InvestInFund = ({ investInFund, userInvestor, funds }) => { 

  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => { setState(initialState); setShow(false) };

  const { register } = useForm();

  useEffect(() => {
    register('investorName', { required: true });
    register('investorCountry', { required: true });
    register('numberShares', { required: true });
    register('total');
  }, []);

  const initialState = {
    investorName: typeof userInvestor !== 'undefined' ? userInvestor.investorName : '',
    investorCountry: typeof userInvestor !== 'undefined' ? userInvestor.investorCountry : '',
    numberShares: '',
    daiTotal: '0',
    daiPrice: funds[0].sharePrice 
  };

  const [state, setState] = useState(initialState);
    
  const handleInputChange = (e) => {
    setState((prevProps) => ({
      ...prevProps,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      investInFund( 0, state.investorName, state.investorCountry, 
                       state.numberShares, total ); 
    }
    catch (err) {
      console.error(err)
    }

    closeModal();
  };

  const total = ((state.numberShares * state.daiPrice) / 100).toFixed(2);

  return (
    <>
      <div className="my-2">
        <Container className="overflow-auto">
          {!show && <Button className="float-center" onClick={openModal}>Invest In Fund</Button>}
        </Container>
        
        <Modal show={show} onHide={closeModal}>

          <Modal.Header className='modal-background-color' closeButton>
            <Modal.Title>Invest In Fund</Modal.Title>
          </Modal.Header>

          <Modal.Body className='modal-background-color'>
            <Form onSubmit={handleSubmit}>

              <Form.Group controlId="investorName" className='mb-3'>
                <Form.Label>Investor Name</Form.Label>
                <Form.Control 
                  name="investorName" 
                  value={state.investorName}
                  className="form-control" 
                  required
                  onChange={handleInputChange}
                />
              </Form.Group> 
              <Form.Group controlId="investorCountry" className='mb-3'>
                <Form.Label>Investor Country</Form.Label>
                <Form.Control 
                  name="investorCountry"
                  className="form-control"
                  value={state.investorCountry}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="noShares" className='mb-3'>
                <Form.Label>No Shares</Form.Label>
                <Form.Control 
                  name="numberShares"
                  className="form-control" 
                  required
                  allowDecimals='false'
                  value={state.numberShares}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="dai" className='mb-3'>
                <Form.Label>Total DAI @ {funds[0].sharePrice / 100} / Share</Form.Label>
                <Form.Control 
                  name="daiTotal"
                  className="form-control" 
                  disabled
                  value={`${total} DAI`}
                />
              </Form.Group>

              <Button type='submit' className="btn btn-primary mb-3">Submit</Button>

            </Form>
          </Modal.Body>

        </Modal>
      </div>
    </>
  );
}

export default InvestInFund;
