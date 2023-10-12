import "./App.css";

import { Link, Route, Routes } from "react-router-dom";
import Sales from "./components/Sales";
import Reports from "./components/Reports";
import Dashboard from "./components/Dashboard";
import Inventory from "./components/Inventory";

function App() {
  return (
    <div style={{ width: "100vw" }}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/report" element={<Reports />} />
      </Routes>
    <Link to ="https://github.com/professssor/businessInventory-redux-typescript-vitejs">
      <h3 style={{textAlign:"center"}}>GITHUB</h3>
    </Link>
    </div>
  );
}

export default App;
