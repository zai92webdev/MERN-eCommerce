import { REMOVE_CART_ITEM, ADD_CART_ITEM,CLEAR_CART_ITEMS,FETCH_CART_ITEM,CART_SAVE_PAYMENT_METHOD,CART_SAVE_SHIPPING_ADDRESS } from '../actions/index'

const initialState = {
    cartItems : [],
    new_cartItem : {},
    shippingAddress : {}
}

export default function cartReducer (state = initialState, action) {  
    switch(action.type) {
        case FETCH_CART_ITEM:
            return {
                ...state,
                cartItems: action.payload
            }

        case ADD_CART_ITEM :
            const item = action.payload  

            const existItem = state.cartItems.find(bug => bug.productID === item.productID)

            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(bug => bug.productID === existItem.productID ? item : bug )
                }
            }else {
                return {
                    ...state,
                    new_cartItem: item,
                    cartItems: [...state.cartItems, item]
                }
            }

        case REMOVE_CART_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter(bug => bug.productID !== action.payload)
            }

        case CLEAR_CART_ITEMS:
            return {
                cartItems: [],
                new_cartItem : {},
                shippingAddress : {}
            }
        
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        
        default:
            return state
    }
}