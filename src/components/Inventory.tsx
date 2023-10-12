import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AddingItems,
  DeleteItems,
  editInventory,
  fetchItems,
} from "../action/inventoryAction";
import { AppDispatch } from "../Store/Store";
import { RootState } from "../Store/Store";
import Dashboard from "./Dashboard";

// interface for inventory data which is required
export interface Inventory {
  _id?: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
}
//interaface for data which is being passed as the edit Object
export interface Edit {
  itemId: string;
  updatedData: {
    name?: string;
    quantity?: number;
    price?: number;
    category?: string;
  };
}

type ButtonType = "add" | "edit";

// interface for data of item whose data is being edited
interface EditInput {
  id?: string;
  name?: string;
  quantity?: number;
  price?: number;
  category?: string;
}

const Inventory: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
//inventory state 
  const inventory = useSelector(
    (state: RootState) => state.inventoryReducer.inventory
  );

  const [itemName, setItemName] = useState<string>("");
  const [itemQuantity, setItemQuantity] = useState<number>();
  const [itemPrice, setItemPrice] = useState<number>();
  const [itemCategory, setItemCategory] = useState<string | undefined>(undefined);
  const [addEditButtonToggle, setAddEditButtonToggle] =
    useState<ButtonType>("add");
  const [editItemId, setEditItemId] = useState<string>("");
  const [editInputDetails, setEditInputDetails] = useState<EditInput>({});
  useEffect(() => {
    dispatch(fetchItems());

    setAddEditButtonToggle("add");
  }, [dispatch]);

  // function to add item to inventory
  const addItemToInventory = (e: React.FormEvent) => {
    e.preventDefault();
    let newItem: Inventory = {
      name: itemName,
      // adding bangs at the end to tell , the values wont ever be undefined
      quantity: itemQuantity!,
      price: itemPrice!,
      category: itemCategory!,
    };
    dispatch(AddingItems(newItem));
    setItemName("");
    setItemQuantity(undefined);
    setItemPrice(undefined);
    setItemCategory("");
  };
// to get the item being edited , so when we update any data the data which is not updated can be readded , workaround since i am using single input form for adding|editing
  function inputDetailTrick(itemId: string) {
    let item = inventory.find((item) => item._id === itemId);
    if (item !== undefined) {
    }
    setEditInputDetails(item!);
  }

  // function to edit|update item detail in inventory
  const handleEditInventory = (e: React.FormEvent, itemId: string) => {
    e.preventDefault();
    let EditObj: Edit = {
      itemId: itemId,
      updatedData: {
        name: itemName || editInputDetails.name,
        quantity: itemQuantity || editInputDetails.quantity,
        price: itemPrice || editInputDetails.price,
        category: itemCategory || editInputDetails.category,
      },
    };

    dispatch(editInventory(EditObj));
    setAddEditButtonToggle("add");
  };


  // to delete the item fom the inventory
  const handleDelete = (itemId: string) => {
    dispatch(DeleteItems(itemId));
  };

  const cardStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column", // Display values in a vertical order
    border: "1px solid #ccc",
    padding: "4px",
    margin: "auto",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>

      <Dashboard/>
      {addEditButtonToggle === "add" ? (
        <h2>Add Item to Inventory</h2>
      ) : (
        <h2>Edit mode enabled , you can edit any property in edit mode</h2>
      )}

      <form
        onSubmit={
          addEditButtonToggle === "add"
            ? (e) => addItemToInventory(e)
            : (e) => handleEditInventory(e, editItemId)
        }
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            required={addEditButtonToggle === "add" ? true : false}
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            required={addEditButtonToggle === "add" ? true : false}
            type="number"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            required={addEditButtonToggle === "add" ? true : false}
            type="number"
            value={itemPrice}
            onChange={(e) => setItemPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            required={addEditButtonToggle === "add" ? true : false}
            type="text"
            value={itemCategory}
            onChange={(e) => setItemCategory(e.target.value)}
          />
        </div>
        <input
          disabled={addEditButtonToggle !== "add"}
          type="submit"
          value="Add to Inventory"
        />
        <input
          disabled={addEditButtonToggle !== "edit"}
          type="submit"
          value="edit the inventory"
        />
      </form>

      <h2>Inventory List</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          overflow: "none",

          padding: "5px",
        }}
      >
        {inventory.length === 0 && "None found"}
        {inventory.map((item, index) => (
          <div key={index} style={cardStyle}>
            <h2 style={{ color: "red" }}>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>
              Category: <span style={{ color: "green" }}>{item.category}</span>
            </p>
            <button
                   style={{color:"white"}}
              onClick={() => handleDelete(item._id!)}
              className="removeButton"
            >
              remove
            </button>
            <button
            style={{color:"white"}}
              onClick={() => {
                setAddEditButtonToggle("edit");
                setEditItemId(item._id!);
                inputDetailTrick(item._id!);
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
