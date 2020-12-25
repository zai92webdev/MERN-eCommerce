import React from 'react'
import '../stylesheet/Products.css'
import { Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating';


function Product({ id, imgUrl, name, review, price }) {

    return (
        <div className="product">
            <div className="product__card">

                <div className='product__cardImage'>
                <img src={imgUrl ? imgUrl : null} alt={name} />
                </div>

                <Link to={`/product/${id}`} className="link" >
                    <h5>{name}</h5>
                </Link>

                <div className='stars'>
                    <Rating size="small" name="read-only" value={review} readOnly />
                    <span style={{paddingBottom:'5px'}}>reviews</span>
                </div>
                
                <h3>${price} </h3>
            </div>


        </div>
    )
}

export default Product
