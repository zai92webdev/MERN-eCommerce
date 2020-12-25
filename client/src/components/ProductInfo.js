import React, {useEffect,useState} from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import '../stylesheet/ProductInfo.css'
import { BsArrowLeftShort } from 'react-icons/bs';
import { connect } from 'react-redux';
import { getSingleProduct} from '../store/actions/productAction'
import { addToCart} from '../store/actions/cartAction'
import Rating from '@material-ui/lab/Rating';
import { Button, FormControl, TextareaAutosize } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {useDispatch} from 'react-redux'
import { REVIEW_PRODUCT_SUCCESS,REVIEW_PRODUCT_FAIL} from '../store/actions/'
import Alert from '@material-ui/lab/Alert';
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from '../Axios'



function ProductInfo(props) {
    const { id } = useParams();
    const history = useHistory()
    const [value, setValue] = useState(0)
    const [hover, setHover] = useState(-1);
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const [error, setError] = useState()
    const [severity, setSeverity] = useState()
    const [quantity, setQuantity] = useState(Number)
    const [disabled, setDisabled] = useState(false)


    const labels = {
        1: 'Useless+',
        2: 'Poor+',
        3: 'Ok+',
        4: 'Good+',
        5: 'Excellent+',
    };

    const handler = () => {
        history.push('/')
    }

    useEffect(() => {
        props.getSingleProduct(id)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const onSubmit= (e) => {
        e.preventDefault()
        const username = props.user.username
        const token = localStorage.getItem('Auth-token')
        const rating = value.toString()

        Axios.post('/product/product_review', {rating,comment,username,id}, {headers:{ 'Auth-token': token}})
        .then(res => {
            setError(res.data.msg)
            setSeverity('success')
            dispatch({
                type: REVIEW_PRODUCT_SUCCESS,
                payload: res.data
            })
        }).catch(err => {
            setSeverity('error')
            setError(err.response.data.msg)
            dispatch({
                type: REVIEW_PRODUCT_FAIL,
                payload: err.response.data.msg
            })
        })}

    const myDate = () => {
        const myDates = new Date()
        const  Year = myDates.getFullYear();
        const Month = myDates.getMonth() + 1;
        const day = myDates.getDate();
        return day + '/' + Month + '/' + Year;
    }

    const addToCart =(e) => {
        e.preventDefault()

        props.addToCart(id,quantity+1)
        setQuantity('')
        setDisabled(true)
    }



    if(props.isLoading){
        return <div style={{ display:'flex',flexDirection:'column',alignItems:'center',position:'absolute',top:'40%',right:'50%'}}>
            <Spinner  animation="border" variant="primary" />
            <span>Loading...</span>
        </div>
    }

    return (
        <div className="productInfo">
            <button onClick={handler} className="productInfo__btn">
                <BsArrowLeftShort size='2em' />  BACK
            </button>
            <div className="productInfo__sections">
                <div className="productInfo__sectionA">
                    <div className="productInfo__sectionA__image">
                    <img src={props.product.img} alt="No pic" />
                    </div>

                    <h2>REVIEWS</h2>

                    {props.product.reviews && (props.product.reviews.length > 0) ? 
                        props.product.reviews.map(review =>(
                            <div className="productInfo__sectionA_review" key={review.user}>
                                <span>{review.name}</span>
                                <span><Rating value={review.rating} readOnly /></span>
                                <span>{myDate(review.createdAt)}</span>
                                <span>{review.comment}</span>
                            </div>
                        ))
                        : <span>No Reviews</span>

                    }

                    <div className="productInfo__sectionA_writeReview">
                        <h3>WRITE A CUSTOMER REVIEW</h3>

                    { error ? <Alert severity={severity}>{error}</Alert> : null }

                    {props.isAuthenticated ? 
                    <form onSubmit={onSubmit} style={{display:'flex' ,flexDirection:'column' }}>  
                        <FormControl >
                            <label>Rating</label>
                            <div style={{display:'flex'}}>
                            <Rating name="hover-feedback" value={value} onChange={(e, newValue) => setValue(newValue)} onChangeActive={(e, newHover) => {setHover(newHover)}}/>
                                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box> }
                            </div>
                            
                        </FormControl>

                        <FormControl>
                            <label>Comment</label>
                            <TextareaAutosize required style={{padding:'5px 10px'}} rowsMin={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder='...comment' />
                        </FormControl>

                        <span style={{marginTop:'1rem'}}>
                        <Button type='submit' variant='contained' color='primary'>Submit</Button>
                        </span>
                    
                    </form>   
                        :  
                        <span>Please&nbsp; <Link to='/login'>sign in</Link>&nbsp;to write a review</span>
                        }

                    </div>

                </div>
                <div className="productInfo__sectionB">
                    <h1>{props.product.name}</h1>
                    <h4>
                        <Rating size="medium" name="read-only" value={props.product.rating ? props.product.rating : 0} readOnly />
                        &nbsp; &nbsp;   {props.product.rating} reviews
                    </h4>
                    <h4>Price : ${props.product.price}</h4>
                    <h4>Description: <span style={{fontSize:'1.4rem', color:'#0049',lineHeight:'2rem'}}>{props.product.description}</span></h4>
                </div>
                <div className="productInfo__sectionC">
                    <div className="productInfo__sectionC_content">
                    <h4>Price : </h4>
                    <span> ${props.product.price}</span>
                    </div>

                    <div className="productInfo__sectionC_content">
                    <h4>Status : </h4>
                    {props.product.productCount ? <span>In stock</span>: <span>Out of stock</span>}
                    </div>

                    <form id="myform"  onSubmit={addToCart} className="productInfo__sectionC_content">
                        <h4>Quantity :</h4>
                        <span >
                        {props.product.productCount}
                        </span>
                    </form>

                    <button disabled={disabled} type='submit' form="myform">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

const MapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        product: state.products.productInfo,
        user: state.auth.user,
        isLoading: state.products.isLoading
    }
}

export default connect(MapStateToProps, {getSingleProduct,addToCart})(ProductInfo)
