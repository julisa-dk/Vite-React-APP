import {createStore, applyMiddleware, compose, combineReducers } from "redux";

//it's middleware, because we use inside in action async function to get data from server, 
//that why we use it for hendle this type of action
import thunk from "redux-thunk";  

import { productsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

//define initialState
const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //can send all info to chrome

//create the store. Store accept multipale parameters
const store = createStore(
    combineReducers({
       products: productsReducer,
       cart: cartReducer,
    }),
   initialState,
   composeEnhancer(applyMiddleware(thunk))
);
export default store;