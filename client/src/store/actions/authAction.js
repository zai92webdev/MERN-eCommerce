import Axios from '../../Axios'
import {returnErrors} from './errorAction'

import { 
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGOUT_SUCCESS,
    USER_LIST_SUCCESS,
    USER_LIST_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_REQUEST,
    CLEAR_CART_ITEMS
} from './index'

//Check token & load user //get info user
export const loadUser = () =>(dispatch,getState) => {
    //User loading
    dispatch({type : USER_LOADING})

    Axios.get('/user/info', tokenConfig(getState))
    .then(res =>{
        dispatch({
        type: USER_LOADED,
        payload: res.data
    })}).catch(err => {
        dispatch({ type: AUTH_ERROR})
        dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const getInfoAllUser = () => (dispatch,getState) => {
    //User List Request
    dispatch({type: USER_LIST_REQUEST})

    Axios.get('/user/all_info', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: USER_LIST_SUCCESS,
            payload:res.data
        })
            
    }).catch(err =>{
        dispatch({ type: AUTH_ERROR})
        dispatch(returnErrors(err.response.data, err.response.status))
        
    })
}

export const deleteUser = (id) => (dispatch,getState) => {
    // user delete request
    dispatch({ type: USER_DELETE_REQUEST})

    //delete
    Axios.delete(`/user/delete/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload:res.data
        })
    }).catch(err =>{
        dispatch({ type: AUTH_ERROR})
        dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const updateUser = (username,avatar) => (dispatch,getState) => {
    //loading request
    dispatch({
        type: USER_UPDATE_REQUEST
    })

    // Update Username
    Axios.patch('/user/update',{username,avatar}, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
    })
}



export const logout = () => dispatch => {
    localStorage.removeItem('cartItems')
    localStorage.removeItem('paymentMethod')
    localStorage.removeItem('shippingAddress')

    dispatch({
        type : CLEAR_CART_ITEMS
    })
    dispatch ({
        type: LOGOUT_SUCCESS
    })
}


export const tokenConfig = getState => {
 //Get token from localStorage
const token = getState().auth.token

    
 //Headers
const config = {
    headers: {
        "Content-type": "Application/json"
    }
}

 //If token, add to headers
if(token) {
    config.headers['Auth-token'] = token

}
    return config;
}