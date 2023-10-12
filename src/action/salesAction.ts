import { getSale, recordSale } from "../Reducers/salesReducer";
import { AppDispatch } from "../Store/Store";
import { ItemDetail } from "../components/Sales";

export const AddSale =
  (saleObj: ItemDetail) => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        "https://neogassignment-18.professssor.repl.co/sales",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(saleObj),
        }
      );
    const data = await response.json();
    console.log("add sale check ", data)
    if(data?.success){
        dispatch(recordSale(data.data))
    }else{
        throw new Error("error adding the sale to the record")
    }



    } catch(error){

        console.error("internal server error 500", error)
    }
  };

  export const fetchSale =
  () => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        "https://neogassignment-18.professssor.repl.co/sales"
      );
    const data = await response.json();

   
    if(data?.success){
        dispatch(getSale(data?.sales))
    }else{
        throw new Error("error fetching the sale from  the record")
    }

    } catch(error){

        console.error("internal server error 500", error)
    }
  };

