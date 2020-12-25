import Axios from '../../Axios'
import { 
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST
    ,CREATE_ORDER_SUCCESS,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    LIST_ORDER_REQUEST,
    LIST_ORDER_SUCCESS,
    LIST_ORDER_FAIL,
    MY_LIST_ORDER_REQUEST,
    MY_LIST_ORDER_SUCCESS,
    MY_LIST_ORDER_FAIL
} from './index'

export const createOrder = ({cartShippingAddress,cartItems,cartPaymentMethod,cartTotalPrice}) => (dispatch) => {

    dispatch({type : CREATE_ORDER_REQUEST})

    const token = localStorage.getItem('Auth-token')

    Axios.post('/order', ({cartShippingAddress,cartItems,cartPaymentMethod,cartTotalPrice}) ,{headers : { 'Auth-token' : token}})
    .then(res => {
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload : err.response.data.msg
        })
    })
}

export const getOrderDetails = (id) => (dispatch) => {

    dispatch({type : ORDER_DETAILS_REQUEST})

    const token = localStorage.getItem('Auth-token')

    Axios.get(`/order/${id}` ,{headers : { 'Auth-token' : token}})
    .then(res => {
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: ORDER_DETAILS_FAIL ,
            payload : err.response.data
        })
    })
}

export const getMyOrderList = (id) => (dispatch) => {
    
    dispatch({type : MY_LIST_ORDER_REQUEST})

    const token = localStorage.getItem('Auth-token')

    Axios.get('/order/myorder', {headers : { 'Auth-token' : token}})
    .then(res => {

        dispatch({
            type: MY_LIST_ORDER_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: MY_LIST_ORDER_FAIL ,
            payload : err.response.data
        })
    })
}


export const getOrderList = (id) => (dispatch) => {

    dispatch({type : LIST_ORDER_REQUEST})

    const token = localStorage.getItem('Auth-token')

    Axios.get('/order/orderlist', {headers : { 'Auth-token' : token}})
    .then(res => {

        dispatch({
            type: LIST_ORDER_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: LIST_ORDER_FAIL ,
            payload : err.response.data
        })
    })
}




