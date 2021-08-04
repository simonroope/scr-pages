import React from 'react';
import { Bar }  from 'react-chartjs-2';

 const InvestorBar = ({investors}) => { 
  
  let iNames = [];
  let iBalances = [];

  for (let i=0;i<investors.length;i++) {
    iNames.push(investors[i].investorName); 
    iBalances.push(investors[i].shareBalance);
  }

  let state = {
    labels: iNames,
    datasets: [
      {
        label: 'Share Balances', // '', // iNames,
        data: iBalances,
        backgroundColor: ['#ec3414','#fca494','#063950','#5a93ad','#9fb7c3','#61393b'],
        borderWidth: 1,
        hoverBackgroundColor: ['#ec3414','#fca494','#063950','#5a93ad','#9fb7c3','#61393b'],
        hoverBorderColor: 'rgba(255,99,132,1)'
      }
    ]
  };
  
  return (
         <Bar
          data={state}
          options={{
            scales: {
              xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
              }],
              yAxes: [{
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
              ticks: {
                min: 0
              }
              }]
            },
            legend: { 
              display: false
            },
            title: {
              display: true,
              text: 'Shares Issued'
            }
          }}
        />
   );
 }

 export default InvestorBar;
