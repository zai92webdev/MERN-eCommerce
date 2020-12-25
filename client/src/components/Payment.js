import React, {useState} from 'react'
import { Button } from '@material-ui/core'
import CheckoutSteps from './layout/CheckOutStep'
import { useDispatch,useSelector} from 'react-redux'
import { savePaymentMethod } from '../store/actions/cartAction'
import {useHistory} from 'react-router-dom'

function Payment() {
    const [ checked, setChecked] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const cart = useSelector(state =>state.cart)
    const { shippingAddress} = cart

    if(!shippingAddress.address){
        history.push('/shipping')
    }


    const onSubmit = (e) => {
        e.preventDefault()
        if(checked) {
            dispatch(savePaymentMethod('PayPal'))
            history.push('placeorder')
        }else {
            window.confirm('Please submit your type of payment method before proceed')
        }
        
    }

    return (
        <div style={{  display:'flex',flexDirection:'column',margin:' 2rem auto' ,maxWidth:'500px', height: '90vh' }} >
            <div style={{margin: '0 auto'}}>
                <CheckoutSteps step1 step2 step3 />
            </div>
            
            <h1 style={{marginTop:'1rem'}}>PAYMENT METHOD</h1>

            <form onSubmit={onSubmit} style={{display:'flex',flexDirection:'column',margin:'2rem 0 '}}>
            <h5>SELECT METHOD</h5>

                <div style={{display:'flex',alignItems:'center'}}>
                    <input type='checkbox' checked={checked} onChange={(e) => setChecked(e.target.checked)}  />
                    <label style={{marginLeft:'10px',marginBottom:'0'}}>PayPal or Credit Card</label>
                </div>


                <div style={{marginTop:'2rem'}}>
                <Button type='submit' variant='contained'>Continue</Button>  
                </div>
            </form>
            
            

        </div>
    )
}

export default Payment
