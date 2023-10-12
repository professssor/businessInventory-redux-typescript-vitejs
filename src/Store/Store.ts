import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "../Reducers/inventoryReducer";
import salesReducer from "../Reducers/salesReducer";

const store = configureStore({
  // configuration details
  reducer: {
    inventoryReducer,
    salesReducer,

    // so these are like the slices in the store , which are stored as key value pair  , in which the key is the name of your state
    //and value is the reducer instance (set of functions to perform on thatstate)organized via reducer object
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // it another optional paramter which can be added to configure store object , with a purpose of introducing middleeware into the redux ecosystem , which enables us to perform the middleware functin before it reaches the reduce fnctin ,
  //better if async operation are used to fetch the data to be passed to the reducer function of the state
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
