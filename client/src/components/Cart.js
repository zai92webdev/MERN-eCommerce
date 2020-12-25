import React from 'react'
import '../stylesheet/Cart.css'
import { useHistory } from 'react-router-dom'
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import {connect} from 'react-redux'
import { removeCart,addToCart} from '../store/actions/cartAction'


function Cart(props) {
    const history = useHistory()

    const checkout = () => {
        history.push('/login?redirect=shipping')  
    }

    const deleteBtn =(e) => {
        props.removeCart(e.currentTarget.value)
    }

    const decrement =(id,qty) => {
        props.addToCart(id, --qty)
    }

    const increment =(id, qty) => {
        props.addToCart(id,++qty)
    }



    const cartItems = props.cart.cartItems ? props.cart.cartItems : null
    const cartTotal = cartItems.reduce((accumulator, cartItem) => cartItem.quantity + accumulator, 0)

    const num = cartItems.reduce((accumulator, cartItem) => (cartItem.price*cartItem.quantity) + accumulator, 0)
    const cartTotalPrice = Math.round(num * 100) / 100


    return (
        <div className="cart">
            <div className="cart__sectionA">
                <h2>SHOPPING CART</h2>
                <TableContainer>
                <Table>
                    <TableBody>
                    {props.cart.cartItems && props.cart.cartItems.map(cartItem => (
        
                        <TableRow key={cartItem.productID} >
                            <TableCell><img src={cartItem.image} alt="" height='100px' width='100px'/></TableCell>
                            <TableCell><span>{cartItem.name}</span></TableCell>
                            <TableCell><span>${cartItem.price}</span></TableCell>
                            <TableCell>
                                <div className='cartButton'>
                                <Button color='primary' disabled={cartItem.quantity ===1 ? true : false} onClick={() => {decrement(cartItem.productID,cartItem.quantity)}} variant='contained'>-</Button>
                                
                                <span>{cartItem.quantity}</span>

                                <Button color='primary' disabled={cartItem.quantity === cartItem.productCount ? true : false} 
                                onClick={() => {increment(cartItem.productID,cartItem.quantity)}} variant='contained'>+</Button>
                                </div>
                            </TableCell>
                            <TableCell>
                                <IconButton value={cartItem.productID} onClick={deleteBtn}>
                                    <DeleteForeverTwoToneIcon  />
                                </IconButton>
                            </TableCell>
                        </TableRow>
    
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>

            <div className="cart__sectionB">
                <h3>SUBTOTAL ({cartTotal}) ITEMS</h3>

                    <h4>${cartTotalPrice}</h4>

                <button onClick={checkout}>PROCEED TO CHECKOUT</button>
            </div>
        </div>
    )
}

const mapStateToProps=(state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, {removeCart,addToCart})(Cart)
