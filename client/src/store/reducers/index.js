import {combineReducers} from "redux";
import loginReducer from './loginReducers'
import cartReducer from './cartReducers'
import request from './Request'

const reducers = combineReducers({
    setLogin : loginReducer,
    cart : cartReducer,
    request : request
})

export default reducers;