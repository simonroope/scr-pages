import React from 'react';
import Moment from 'react-moment';

function AllOrders({orders}) {
  const renderList = (orders, side, className) => {
    return (
      <>
        <table className={`table mb-0 order-list bordered size="sm" ${className}`}>
          <thead>
            <tr className="table-title order-list-title">
              <th colSpan='3'>{side}</th>
            </tr>
            <tr>
              <th>amount</th>
              <th>price</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-1">{order.amount - order.filled}</td>
                <td className="py-1">{order.price}</td>
                <td className="py-1"> <Moment unix format="DD MMM YYYY HH:mm">{order.date}</Moment> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  return (
    <div className="dex mt-3">
      <h6>All Open Orders</h6>
      <div className="row">
        <div className="col-sm-6">
          {renderList(orders.buy, 'Buy', 'order-list-buy')}
        </div>
        <div className="col-sm-6">
          {renderList(orders.sell, 'Sell', 'order-list-sell')}
        </div>
      </div>
    </div>
  );
}

export default AllOrders;
