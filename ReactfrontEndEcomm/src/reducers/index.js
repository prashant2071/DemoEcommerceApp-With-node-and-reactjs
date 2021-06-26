import { combineReducers } from "redux";
import { productReducer } from "./product.red";

export default combineReducers({
    product:productReducer
})