import Axios from '../../Axios'
import {
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL, 
    PRODUCT_LOADED,
    PRODUCT_LOADING,
    ALL_PRODUCT_LOADED,
    ALL_PRODUCT_LOADING,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL
} from './index'
import {returnErrors} from './errorAction'


export const getAllProduct = () => dispatch => {
    dispatch({type: ALL_PRODUCT_LOADING})

    Axios.get('/product/all_product')
    .then(res => {
        dispatch({
            type: ALL_PRODUCT_LOADED,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const getSingleProduct = (id) => dispatch => {
    dispatch({type: PRODUCT_LOADING})

    Axios.get(`/product/product_info/${id}`)
    .then(res => {
        dispatch({
            type: PRODUCT_LOADED,
            payload: res.data
        })
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const updateProduct = ({id,name,price,brand,img,productCount,category,description}) => dispatch => {

    const token = localStorage.getItem('Auth-token')

    Axios.patch(`/product/update/${id}`, {name,price,brand,img,productCount,category,description} ,{headers: {'Auth-token': token}})
    .then( res => {
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: res.data
        })
    }).catch( err => {
        dispatch(returnErrors(err.response.data, err.response.status))
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: err.response.data
        })
    })

}

export const deleteProduct = (id) => dispatch => {

    const token = localStorage.getItem('Auth-token')


    Axios.delete(`/product/delete/${id}`,{headers: {'Auth-token': token}})
    .then( res => {
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        
        dispatch({ type: DELETE_PRODUCT_FAIL, payload: err.response.data})
        dispatch(returnErrors(err.response.data, err.response.status))
    })
}