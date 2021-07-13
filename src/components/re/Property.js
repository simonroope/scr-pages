import React from 'react';
import { Table } from 'react-bootstrap';

 const Property = ({properties}) => { 

    const propImage = ( propHash ) => {
      const propIpfsUrl = `https://ipfs.io.ipfs/${propHash}`;
      return propIpfsUrl;
    }

    return (
          <Table className="text-center mb-3">
            <thead>
              <tr>
                <th className="px-0 py-1">Property</th> 
                <th className="px-0 py-1">Name</th> 
                <th className="px-0 py-1">Country</th> 
                <th className="px-0 py-1">Value</th> 
              </tr>
            </thead>
            <tbody>
              {properties.map((property, index) => (
                <tr key={index}>
                  <td className="py-1">{property.propertyCode}</td>
                  <td className="py-1">{property.propertyName}</td>
                  <td className="py-1">{property.propertyCountry}</td>
                  <td className="py-1">{property.valuation.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
    );
 }

 export default Property;
