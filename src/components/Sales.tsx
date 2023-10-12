import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Store/Store';
import { AddSale, fetchSale } from '../action/salesAction';
import { DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css 
import Dashboard from './Dashboard';


const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: "100%"
};

const inputStyle: React.CSSProperties = {
  margin: '8px',
  width: '200px',
};

const tableStyle: React.CSSProperties = {
  border: '1px solid #000',
  borderCollapse: 'collapse',
  width: "70%"
};

const tableHeaderStyle: React.CSSProperties = {
  border: '1px solid #000',
  padding: '8px',
  backgroundColor: 'lightgray',
};

const tableRowStyle: React.CSSProperties = {
  border: '1px solid #000',
  padding: '8px',
};

const buttonStyle: React.CSSProperties = {
  margin: '8px',
  padding: '8px 16px',
  backgroundColor: 'blue',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

export interface ItemDetail {
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
  totalRevenue: number;
  date: string;
}






const Sales: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const sales = useSelector((state: RootState) => state.salesReducer.salesHistory);

  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);
  const [salesArray, setSaleArray] = useState<ItemDetail[]>();

  // State for date range selection
 const [startDate,setStartDate]= useState(new Date());
  const [endDate,setEndDate]= useState(new Date());

  useEffect(() => {
    dispatch(fetchSale());
  }, [dispatch]);

  useEffect(() => {
    setSaleArray(sales);
  }, [sales]);

  const recordSale = (e: React.FormEvent) => {
    e.preventDefault();

    const totalRevenue = itemQuantity * itemPrice;
    const newSale = {
      itemName,
      itemQuantity,
      itemPrice,
      totalRevenue,
      date: new Date().toLocaleString(),
    };
    dispatch(AddSale(newSale));
    setItemName('');
    setItemQuantity(0);
    setItemPrice(0);
  };

  // Function to handle date range selection
const handleSelect =(date:any)=>{
      let filteredDate=sales?.filter(sale=>{
const saleDate =new Date(sale.date)
return saleDate >=date.selection.startDate && saleDate<=date.selection.endDate
  });
  setStartDate(date.selection.startDate);
   setEndDate(date.selection.endDate)
     setSaleArray(filteredDate)


}



  


  // Function to filter sales based on the selected date range


    const selectionRange  = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
   
  }

  return (
    <div style={containerStyle}>
            <Dashboard/>
      <h2>Record Sales Transactions</h2>
      <section style={{ display: "flex", justifyContent: "space-around", width: "80%", border: "1px solid gray" }}>
        <div style={{justifySelf:"center", width:"100%", textAlign:'center'}}>
          <form onSubmit={(e) => recordSale(e)}>
            <div>
              <div> 
                <label>Item Name:</label>
                <input
                  required
                  type="text"
                  style={inputStyle}
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </div>
              <div>
                <label>Quantity:</label>
                <input
                  required
                  type="number"
                  style={inputStyle}
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(Number(e.target.value))}
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  required
                  type="number"
                  style={inputStyle}
                  value={itemPrice}
                  onChange={(e) => setItemPrice(Number(e.target.value))}
                />
              </div>
              <input type="submit" style={buttonStyle} value="Record Sale" />
            </div>
          </form>
        </div>
{/* container for the react-date-range */}
        <div style={{width:"100%", textAlign:"center"}}>
              <DateRangePicker 
              ranges={[selectionRange]}
        onChange={handleSelect}
              />
        </div>
        <h3>
        </h3>
      </section>

      <h2>Sales History</h2>
      {salesArray?.length === 0 && <h4>Sales details are being fetched</h4>}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Item Name</th>
            <th style={tableHeaderStyle}>Quantity</th>
            <th style={tableHeaderStyle}>Price</th>
            <th style={tableHeaderStyle}>Total Revenue</th>
            <th style={tableHeaderStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {salesArray?.map((sale, index) => (
            <tr key={index} style={tableRowStyle}>
              <td>{sale.itemName}</td>
              <td>{sale.itemQuantity}</td>
              <td>{sale.itemPrice}</td>
              <td>{sale.totalRevenue}</td>
              <td>{sale.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
