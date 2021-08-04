import React from 'react';
import { Doughnut } from 'react-chartjs-2';

 const InvestorPie = ({investors}) => { 

   let labels = [];
   let dataset = [];
   let funddata = 0;

   for (let i=0;i<investors.length;i++) {
      labels.push(investors[i].investorName); 
      dataset.push(Math.round(investors[i].sharePercent * 10000)/100);
      funddata += (Math.round(investors[i].sharePercent * 10000)/100);
   }
   funddata = 100 - funddata;

   labels.push('Fund');
   dataset.push(funddata);
   
   const state = {
      labels: labels, 
      datasets: [
         {
           label: '{shareBalance}',
           backgroundColor: ['#ec3414','#fca494','#063950','#5a93ad','#9fb7c3','#61393b'],
           borderColor: 'white',
           borderWidth: 1,
           cutout: 50,
           hoverBackgroundColor: ['#ec3414','#fca494','#063950','#5a93ad','#9fb7c3','#61393b'],
           hoverBorderColor: 'rgba(255,99,132,1)',
           data: dataset
         }]
   };

  const options = {
     legend: [{
               display: true,
               position: 'bottom',
               labels: {
                 fontColor: 'rgb(255, 99, 132)'
               }
             }]
  };

   return (
     <div className='text-center'>Fund Ownership
         <Doughnut data={state}
                   options={options} />
      </div>
   );
 }

 export default InvestorPie;
