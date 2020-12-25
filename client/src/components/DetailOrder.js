import React, {useEffect} from 'react'
import '../stylesheet/Cart.css'
import {connect,useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import { removeCart,addToCart} from '../store/actions/cartAction'
import { getOrderDetails } from '../store/actions/orderActions'
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet/DetailOrder.css'


function DetailOrder(props) {
    const { id } = useParams()
    const dispatch =  useDispatch()

    useEffect(() => {
        dispatch(getOrderDetails(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const order =  props.order ? props.order.order :  null
    
    if(props.isLoading){
        return <div style={{ display:'flex',flexDirection:'column',alignItems:'center',position:'absolute',top:'40%',right:'50%'}}>
            <Spinner  animation="border" variant="primary" />
            <span>Loading...</span>
        </div>
    }else {

        if(order) {
            return (
                <div className="detailOrder">
                    <h1>ORDER {id}</h1>
    
                    <div className='detailOrder__container'>
                        
                        <div className='detailOrder__sections'>
                            <div className='detailOrder__sectionA'>
                                <h3>SHIPPING</h3>
                                <span>Name : {order.user ? order.user.username : null}</span>
                                <span>Email : {order.user ? order.user.email : null}</span>
                            
                                { order.shippingAddress && <span>Address : {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</span>}
                                
                                <h6>NOT DELIVERED</h6>
                            </div>
    
                            <div className='detailOrder__sectionB'>
                                <h3>PAYMENT METHOD</h3>
                                <span>Method : {order.paymentMethod}</span>
                                <h6>NOT PAID</h6>
                            </div>
    
                            <div className='detailOrder__sectionC'>
                                <h3>ORDER ITEMS</h3>
    
                                { order.orderItems && order.orderItems.map(item =>(
                                <div className='detailOrder__sectionC__content' key={item.productID}>
                                    <img src={item.image} alt={item.name} height='50px' width='50px'/>
                                    <span>{item.name}</span>
                                    <span>
                                        {item.quantity} X ${item.price} = ${item.quantity*item.price}
                                    </span>
                                </div>
                            )) }
                            </div>
    
                        </div>
                
                        <div className='detailOrder__summary'>
                            <h3>ORDER SUMMARY</h3>
                                    <div className='detailOrder__summary__content'>
                                        <span>Items</span>
                                        <span>${order.itemsPrice}</span>
                                    </div>
                                    <div className='detailOrder__summary__content'>
                                        <span>Shipping</span>
                                        <span>$0</span>
                                    </div>
                                    <div className='detailOrder__summary__content'>
                                        <span>Tax</span>
                                        <span>$0</span>
                                    </div>
                                    <div className='detailOrder__summary__content'>
                                        <span>Total</span>
                                        <span>${order.itemsPrice}</span>
                                    </div>
                                
                            <button>Click to procced with Payment</button>
                            
                        </div>
    
                    </div>
    
                    
                </div>
            )   
        }else {
            return <span>No Order exist...Back to Homepage</span>
        }
    }
}

const mapStateToProps=(state) => {
    return {
        order: state.order,
        isLoading : state.order.isLoading,
        userInfo: state.auth.user
    }
}

export default connect(mapStateToProps, {removeCart,addToCart})(DetailOrder)
