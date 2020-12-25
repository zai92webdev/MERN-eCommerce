import { combineReducers} from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import productReducer from './productReducer'
import cartReducer from './cartReducer'
import orderReducer from './orderReducers'


const rootReducer = combineReducers ({
    error: errorReducer,
    auth : authReducer,
    products : productReducer,
    cart : cartReducer,
    order : orderReducer
})

export default rootReducer