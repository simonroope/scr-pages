import React from 'react';
import { Container, Table } from "react-bootstrap";

 const Investor = ({investors}) => { 

    return (
      <Container className="investor">
          <Table className="text-center py-1" bordered size="sm">
            <thead>
              <tr>
                <th className="px-0 py-1">id</th> 
                <th className="px-4 py-1">Name</th> 
                <th className="px-0 py-1">Country</th> 
                <th className="px-0 py-1">Dai</th> 
                <th className="px-0 py-1">Shares</th> 
                <th className="px-0 py-1">%</th> 
              </tr>
            </thead>
            <tbody>
              {investors.map((investor, index) => (
                  <tr key={index}>
                    <td className="">{index+1}</td>
                    <td className="w-25">{investor.investorName}</td>
                    <td className="">{investor.investorCountry}</td>
                    <td className="">{(investor.daiBalance / ( 10**18 )).toFixed(2)}</td>
                    <td className="">{investor.shareBalance}</td>
                    <td className="">{Math.round(investor.sharePercent * 10000)/100}%</td>
                  </tr>
              ))}
            </tbody>
          </Table>
      </Container>
    );
 }

 export default Investor;