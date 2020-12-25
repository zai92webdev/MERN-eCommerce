
import { ADD_CART_ITEM,REMOVE_CART_ITEM,FETCH_CART_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from './index'
import Axios from '../../Axios'

export const addToCart = (id,quantity) => async (dispatch,getState) => {

    //get product
    const { data} = await Axios.get(`/product/product_info/${id}`)
    dispatch({
        type : ADD_CART_ITEM,
        payload : {
            productID: data._id,
            name: data.name,
            image: data.img,
            price: data.price,
            productCount : data.productCount,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeCart = (id) => (dispatch,getState) => {

    dispatch({
        type: REMOVE_CART_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const updateCart = () => dispatch => {

    const cart = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : null
    if(cart) {
        dispatch({
            type: FETCH_CART_ITEM,
            payload: cart
        })
    }
}

export const saveShippingAddress = (data) => (dispatch) => {

    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}