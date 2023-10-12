
import {  Edit, Inventory } from "../components/Inventory";
import { addItem, editItem, fetchInventory, removeItems } from "../Reducers/inventoryReducer";
import { AppDispatch } from "../Store/Store";


export const AddingItems =
  (inventoryObject: Inventory)=> async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        "https://neogassignment-18.professssor.repl.co/inventory",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inventoryObject),
        }
      );
      const data = await response.json();

      if (data?.data) {
        dispatch(addItem(data.data));
      }
    } catch (error) {
      console.error("Error adding item to inventory", error);
    }
  };


export const fetchItems=()=>async(dispatch:AppDispatch)=>{
  
  try{const response =  await fetch ("https://neogassignment-18.professssor.repl.co/inventory");
    const data= await response.json();

    if(data.data){
   dispatch(fetchInventory(data.data));
    }
 
  }catch (error){
    console.error("Error fetching items from inventory", error)

  }

}
export const DeleteItems =
  (itemId:string)=> async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        "https://neogassignment-18.professssor.repl.co/inventory",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({itemId}),
        }
      );
      const data = await response.json();

 
      if(data.success){
dispatch(removeItems(itemId));
      }
    else{console.error("error deleting the item from list ")}
      
    } catch (error) {
      console.error("internal sever error 500 ", error);
    }
  };



  export const editInventory=(editObj:Edit)=>async(dispatch:AppDispatch)=>{

try{
   const response = await fetch(
        "https://neogassignment-18.professssor.repl.co/inventory/edit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editObj),
        }
      );
      const data = await response.json();
      if(data?.data){
        console.log("before state disptact step", data)
        dispatch(editItem(data.data))
      }
}

catch (error) {
      console.error("internal sever error 500 ", error);
    }


}