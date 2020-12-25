import React, {useState} from 'react'
import { Button } from '@material-ui/core'
import CheckoutSteps from './layout/CheckOutStep'
import { useDispatch,useSelector} from 'react-redux'
import {saveShippingAddress} from '../store/actions/cartAction'
import { useHistory} from 'react-router-dom'

function Shipping() {
    const cart = useSelector(state => state.cart)

    const shippingAddress = cart.shippingAddress ? cart.shippingAddress : null
    
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    const history = useHistory()

    const onSubmit=(e) => {
        e.preventDefault()
        
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }

    return (
        <div style={{  display:'flex',flexDirection:'column',margin:' 2rem auto' ,maxWidth:'500px', height: '90vh' }} >
            <div style={{margin: '0 auto'}}>
                <CheckoutSteps step1 step2 />
            </div>
            
            <h1 style={{marginTop:'1rem'}}>Shipping</h1>

            <form onSubmit={onSubmit} style={{display:'flex',flexDirection:'column',margin:'2rem 0 '}}>

                <>
                    <label >Address</label>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} required type='text' style={{border:'none', backgroundColor:'#d6d6d6', padding:'10px',outline:'none'}} />
                </>

                <>
                    <label >City</label>
                    <input value={city} onChange={(e) => setCity(e.target.value)} required type='text' style={{border:'none', backgroundColor:'#d6d6d6', padding:'10px',outline:'none'}} />
                </>

                <>
                    <label >Postal Code</label>
                    <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required type='text'style={{border:'none', backgroundColor:'#d6d6d6', padding:'10px',outline:'none'}} />
                </>

                <>
                    <label >Country</label>
                    <input value={country} onChange={(e) => setCountry(e.target.value)} required type='text'style={{border:'none', backgroundColor:'#d6d6d6', padding:'10px',outline:'none'}} />
                </>

                <div style={{marginTop:'2rem'}}>
                <Button type='submit' variant='contained'>Continue</Button>  
                </div>
            </form>
            
            

        </div>
    )
}

export default Shipping
