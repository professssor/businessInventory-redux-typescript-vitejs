import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div>
    
      <Link to="/sales" style={buttonStyle}>
        Go to Sales
      </Link>
      <Link to="/inventory" style={buttonStyle}>
        Go to Inventory
      </Link>
      
      <Link to="/report" style={buttonStyle}>
        Go to Reports
      </Link>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  display: 'inline-block',
  margin: '10px',
  padding: '10px 20px', 
  backgroundColor: 'green', 
  color: 'white',
  textDecoration: 'none',
  textAlign: 'center',
};

export default Dashboard;
