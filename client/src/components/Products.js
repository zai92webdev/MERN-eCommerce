import React, {useEffect} from 'react'
import '../stylesheet/Products.css'
import Product from './Product'
import { connect } from 'react-redux'
import { getAllProduct} from '../store/actions/productAction'
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';

function Products(props) {


    useEffect(() => {
        props.getAllProduct()

           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const Products = (props.fetchProducts && props.fetchProducts.length > 0) ? props.fetchProducts.map(products => ({
        id: products._id,
        img: products.img,
        name: products.name,
        rating: products.rating,
        price: products.price
    })) : null


    if(props.isLoading){
        return <div style={{ display:'flex',flexDirection:'column',alignItems:'center',position:'absolute',top:'60%',right:'50%'}}>
            <Spinner  animation="border" variant="primary" />
            <span>Loading...</span>
        </div>
    }else {

        return (
            <div className="products">
    
                {Products && Products.map(data =>(
                    <div key={data.id}>
                        <Product id={data.id} imgUrl={data.img} name={data.name} review={data.rating} price={data.price} />   
                    </div>
                    
                ))}
    
            </div>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        fetchProducts: state.products.product,
        isLoading: state.products.isLoading
    }
}

export default connect(mapStateToProps, {getAllProduct})(Products)
