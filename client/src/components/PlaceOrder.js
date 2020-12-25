import React, {useEffect,useState} from 'react'
import CheckOutSteps from './layout/CheckOutStep'
import '../stylesheet/PlaceOrder.css'
import {connect,useDispatch} from 'react-redux'
import { Link,useHistory } from 'react-router-dom'
import { createOrder } from '../store/actions/orderActions'
import { Alert } from '@material-ui/lab';
import { CREATE_ORDER_RESET,CLEAR_CART_ITEMS} from '../store/actions'



function PlaceOrder(props) {
    const [disabled,setDisabled] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()

    const errorMsg = props.order.error ? props.order.error : null

    const cartItems = props.cart.cartItems ? props.cart.cartItems : null
    const cartPaymentMethod = props.cart.cartItems ? props.cart.paymentMethod : null
    const cartShippingAddress = props.cart.cartItems ? props.cart.shippingAddress : null

    const num = cartItems.reduce((accumulator, cartItem) => (cartItem.price*cartItem.quantity) + accumulator, 0)
    const cartTotalPrice = Math.round(num * 100) / 100

    const placeOrder = () => {
        props.createOrder({cartShippingAddress,cartItems,cartPaymentMethod,cartTotalPrice})
    }

    const { success, order} = props.order

    useEffect(() => {
        
        if(success) {
            setDisabled(true)
            history.push(`/order/${order._id}`)
            dispatch({type: CREATE_ORDER_RESET})
            dispatch({type: CLEAR_CART_ITEMS})
            localStorage.removeItem('cartItems')
            localStorage.removeItem('paymentMethod')
            localStorage.removeItem('shippingAddress')
        
        }
        // eslint-disable-next-line
    }, [success])


    return (
        <div className='placeorder'>
            <div className='placeorder__checkoutstep' >
                <CheckOutSteps step1 step2 step3 step4/>
            </div>

            <div className='placeorder__content'>
                <div className='placeorder__sectionA'>
                    <div className='placeorder__sectionA__content'>
                        <h3>SHIPPING</h3>
                        <span>Address : {cartShippingAddress.address}, {cartShippingAddress.city}, {cartShippingAddress.postalCode}, {cartShippingAddress.country}</span>
                    </div>

                    <div className='placeorder__sectionA__content'>
                        <h3>PAYMENT METHOD</h3>
                        {cartPaymentMethod ? <span> Method : {cartPaymentMethod}</span> : <span>Please fill in your payment method before proceed.. <Link to='/payment'> Go to payment method here </Link></span>  }
                        
                    </div>

                    <div className='placeorder__sectionA__content'>
                        <h3>ORDER ITEMS</h3>

                        { cartItems && cartItems.map(item =>(
                            <div className='placeorder__sectionA__contentCart' key={item.productID}>
                                <img src={item.image} alt={item.name} height='80px' width='80px'/>
                                <span>{item.name}</span>
                                <span>
                                    {item.quantity} X ${item.price} = ${item.quantity*item.price}
                                </span>
                            </div>
                        )) }

                    </div>

                </div>

                <div className='placeorder__sectionB'>
                    <h3>ORDER SUMMARY</h3>

                    <div className='placeorder__sectionB__item'>
                        <span>Items :</span>
                        <span> ${cartTotalPrice}</span>
                    </div>
                    
                    <div className='placeorder__sectionB__item'>
                        <span>Shipping :</span>
                        <span> $0</span>
                    </div>

                    <div className='placeorder__sectionB__item'>
                        <span>Tax :</span>
                        <span> $0</span>
                    </div>
                    
                    <div className='placeorder__sectionB__item'>
                        <span>Total :</span>
                        <span> ${cartTotalPrice}</span>
                    </div>

                    <button disabled={disabled} onClick={placeOrder}>PLACE ORDER</button>
                    {errorMsg &&  <Alert variant="filled" severity="error">{errorMsg}</Alert>  }
                </div>

            </div>
            

        </div>
    )
}

const mapStateToProps=(state) => {
    return {
        cart: state.cart,
        order: state.order,
        orderCreate : state.order.order
    }
}

export default connect(mapStateToProps, {createOrder})(PlaceOrder)


