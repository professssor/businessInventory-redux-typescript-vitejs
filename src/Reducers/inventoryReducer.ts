import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Inventory, } from "../components/Inventory";

type initialStateType = {
  inventory: Inventory[];
  
};

const initialState: initialStateType = {
  inventory: [],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Inventory>) => {
        state.inventory.push(action.payload);
    },
    removeItems: (state, action: PayloadAction<string>) => {
      state.inventory = state.inventory.filter((item) => item._id !== action.payload);
  
    },
    clearInventory: (state) => {
      state.inventory = [];
    },
     fetchInventory:(state, action:PayloadAction<Inventory[]>)=> {
     state.inventory = action.payload;
    },

    editItem:(state, action:PayloadAction<Inventory[]>)=>{
      state.inventory= action.payload

  
    }
  },  
});

export const { addItem, removeItems, clearInventory,editItem,fetchInventory } = inventorySlice.actions;

export default inventorySlice.reducer;
