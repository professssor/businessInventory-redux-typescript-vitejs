import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../Store/Store';
import { useDispatch, useSelector } from 'react-redux';

import { fetchItems } from '../action/inventoryAction';
import { fetchSale } from '../action/salesAction';
import Dashboard from './Dashboard';

const Reports: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const sales = useSelector((state: RootState) => state.salesReducer.salesHistory);
  const inventory = useSelector((state: RootState) => state.inventoryReducer.inventory);

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchSale());
  }, [dispatch]);

  // CSS style for tables
  const tableStyle:React.CSSProperties = {
    border: '1px solid #000',
    borderCollapse: 'collapse',
    width: '100%',
  };

  // CSS style to center text within table cells
  const cellStyle:React.CSSProperties
   = {
    textAlign: 'center',
    padding: '8px',
  };

  return (
    <div>


            <Dashboard/>

        <h2 style={{color:"red", textAlign:"center"}}>REPORT SECTION</h2>
      <h2>Inventory Reports</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>Name</th>
           <th style={cellStyle}>Category</th>
            <th style={cellStyle}>Price</th>
            <th style={cellStyle}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
                    <td style={cellStyle}>{item.name}</td>
              <td style={cellStyle}>{item.category}</td>
              <td style={cellStyle}>{item.price}</td>
              <td style={cellStyle}>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <h2>Sales Reports</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>Item Name</th>
            <th style={cellStyle}>Price</th>
            <th style={cellStyle}>Quantity</th>
            <th style={cellStyle}>Total Revenue</th>
            <th style={cellStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={index}>
              <td style={cellStyle}>{sale.itemName}</td>
              <td style={cellStyle}>{sale.itemPrice}</td>
              <td style={cellStyle}>{sale.itemQuantity}</td>
              <td style={cellStyle}>{sale.totalRevenue}</td>
              <td style={cellStyle}>{sale.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
   
    </div>
  );
}

export default Reports;
