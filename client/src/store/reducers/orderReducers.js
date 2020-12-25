import { CREATE_ORDER_FAIL,CREATE_ORDER_SUCCESS,CREATE_ORDER_REQUEST, ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_REQUEST,CREATE_ORDER_RESET,LIST_ORDER_REQUEST,LIST_ORDER_SUCCESS ,LIST_ORDER_FAIL ,MY_LIST_ORDER_REQUEST,MY_LIST_ORDER_SUCCESS ,MY_LIST_ORDER_FAIL } from '../actions/index'


const initialState = {
    order : [],
    orderItems: [],
    shippingAddress: {},
    isLoading: true,

}

export default function order(state=initialState, action) {
    switch(action.type) {
        case CREATE_ORDER_REQUEST :
            return {
                isLoading: true
            }
        
        case CREATE_ORDER_SUCCESS:
            return {
                isLoading: false,
                success: true,
                order: action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                isLoading:false,
                error : action.payload
            }

        case CREATE_ORDER_RESET:
            return {
                order: []
            }

        case ORDER_DETAILS_REQUEST:
            return {
                isLoading: true
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                isLoading:false,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                isLoading: false,
                error: action.payload
            }
        case LIST_ORDER_REQUEST:
            return {
                isLoading: true
            }
    
        case LIST_ORDER_SUCCESS:
            return {
                isLoading:false,
                order: action.payload
            }
    
        case LIST_ORDER_FAIL:
            return {
                isLoading: false,
                error: action.payload
            }

        case MY_LIST_ORDER_REQUEST:
            return {
                isLoading: true
            }
        
        case MY_LIST_ORDER_SUCCESS:
            return {
                isLoading:false,
                order: action.payload
            }
        
        case MY_LIST_ORDER_FAIL:
            return {
                isLoading: false,
                error: action.payload
                }
        default:
        return state
    }
    
}