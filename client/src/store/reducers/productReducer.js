import {
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    PRODUCT_LOADED,
    PRODUCT_LOADING,
    ALL_PRODUCT_LOADED,
    ALL_PRODUCT_LOADING,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    REVIEW_PRODUCT_SUCCESS,
    REVIEW_PRODUCT_FAIL,
    REVIEW_PRODUCT_LOADING
} from '../actions'

const initialState = {
    product: [],
    productInfo: {},
    msg: null,
    id: null,
    isLoading: false
}


export default function product(state= initialState, action) {
    switch(action.type) {
        case ALL_PRODUCT_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case ALL_PRODUCT_LOADED:
            return {
                ...state,
                product: action.payload,
                isLoading: false
            }
        case PRODUCT_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case PRODUCT_LOADED:
            return {
                ...state,
                isLoading: false,
                productInfo: action.payload
                
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                msg: action.payload.msg,
                id: action.payload.product.id
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                productInfo: action.payload.product,
                msg: action.payload.msg,
                id: action.payload.id
            }
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                msg: action.payload
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                msg: action.payload.msg,
                product: state.product.filter(bug => bug._id !== action.payload.id)
            }
        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                msg:action.payload.msg
            }

        case REVIEW_PRODUCT_LOADING:
            return {
                isLoading: true
            }
        case REVIEW_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                msg: action.payload.msg
            }
        case REVIEW_PRODUCT_FAIL:
            return {
                ...state,
                isLoading:false,
                msg: action.payload
            }
        default:
            return state
    }

}