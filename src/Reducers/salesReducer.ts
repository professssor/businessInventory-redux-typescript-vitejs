import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemDetail } from "../components/Sales";


// Define the initial state for the sales feature
type initialStateType = {
  salesHistory: ItemDetail[];
};

const initialState: initialStateType = {
  salesHistory: [],
};

// Define the structure of a sales record
// export interface SalesHistory {
//   itemName: string;
//   itemQuantity: number;
//   itemPrice: number;
//   totalRevenue: number;
//   date: Date
//   // You may add more properties as needed
// }

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    // to add new sale 
    recordSale: (state, action: PayloadAction<ItemDetail>) => {
      state.salesHistory.push(action.payload);
    },
    // to fetch the sale array
    getSale: (state, action: PayloadAction<ItemDetail[]>) => {
      state.salesHistory = action.payload;
    },
    // to clear any sale 
    clearSalesHistory: (state) => {
      state.salesHistory = [];
    },
  },
});

export const { recordSale, clearSalesHistory,getSale} = salesSlice.actions;

export default salesSlice.reducer;
