import { combineReducers } from 'redux';

// reducers
import quotationReducer from './quotationReducer';
import productReducer from "./productReducer";

export default combineReducers({
    quotationReducer,
    productReducer
})