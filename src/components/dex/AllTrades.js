import React from 'react';
import Moment from 'react-moment';
import { format } from 'date-fns';
import { Line } from "react-chartjs-2";

function AllTrades({trades}) {

  const renderList = (trades, className) => {
    return (
      <>
        <table className={`table mt-3 order-list bordered size="sm" ${className}`}>
          <thead>
            <tr>
              <th>amount</th>
              <th>price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.tradeId}>
                <td className="px-1 py-1">{trade.amount}</td>
                <td className="px-1 py-1">{trade.price}</td>
                <td className="px-1 py-1"> <Moment unix format="DD MMM YYYY HH:mm">{trade.date}</Moment> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  const renderChart = (trades) => {

    const extractPrice = (data) => {
      return data.map( d => d.price);
    }

    const extractDate = (data) => {
      const dDate = data.map(d => format(new Date(parseInt(d.date) * 1000), 'd/MM/yyyy HH:mm'));
      return ( dDate );
    }

    const data = {
      labels: extractDate(trades),
      datasets: [
        {
          data: extractPrice(trades), 
          fill: true,            
          borderColor: 'purple',
          borderWidth: 1,
          lineTension: 0.05  
        }
      ]
    }

    const legend = {
      display: false,
      position: "bottom",
      labels: {
        fontColor: "#323130",
        fontSize: 12
      }
    }
    
    const options = {
      title: {
        display: true,
        text: "All Trades",
        fontSize: 16,
        fontStyle: 'normal',
        fontColor: '#000000'
      },
      legend: { display: false, labels: false },
      scales: {
        xAxes: [{
            type: 'time',
            time: {
              unit: 'hour', 
              tooltipFormat: 'll' 
            },
            displayFormats: {
              second: 'HH:mm:ss',
              minute: 'HH:mm',
              hour: 'HH',
              day: 'MM DD'
            },
            scaleLabel: {
              display: true,
              labelString: 'Transaction Date'
            },
            ticks: {
              major: {
                 enabled: true, 
                 autoSkip: true,
                 maxTicksLimit: 20,
                 maxRotation: 0,
                 minRotation: 0
              }
            }
          }],
          yAxes: [{
              ticks: {
                min: 0
              }
          }] 
      },
      elements: {
        point:{
            radius: 1
        }
      }
    };

    return (

      <Line data={data} legend={legend} options={options} />

    );
  }

  return (
    <div className="dex">
      <div className="row text-center">
        <div className="col-sm-12">
          {renderChart(trades)}
          {renderList(trades, 'trade-list')}
        </div>
      </div>
    </div>
  );
}

export default AllTrades;
