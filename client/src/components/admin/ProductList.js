import React,{useEffect} from 'react'
import {  Table, TableCell, TableContainer, TableHead,TableBody, TableRow, IconButton, Button} from '@material-ui/core'
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { red,blue } from '@material-ui/core/colors';
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux'
import {useDispatch} from 'react-redux'
import Axios from '../../Axios'
import { CREATE_PRODUCT_SUCCESS } from '../../store/actions/'
import { returnErrors } from '../../store/actions/errorAction'
import { getAllProduct,deleteProduct} from '../../store/actions/productAction'


function ProductList(props) {
    const history = useHistory()
    const dispatch = useDispatch()  

    useEffect(() => {
        props.getAllProduct()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const createProduct = () => {
    // create product

    const token = localStorage.getItem('Auth-token')

    Axios.post('/product/create',{}, { headers: {"Auth-token": token} } )
    .then( res => {
        // setID(res.data.product.id)
        history.push(`/admin/${res.data.product.id}/edit`)
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: res.data
        })
        
    }).catch( err=> {
        dispatch(returnErrors(err.response.data, err.response.status))
    })}

    const deleteBtn=(e) => {
        props.deleteProduct(e.currentTarget.id)
    }

    const handler =(e) => {
        history.push(`/admin/${e.currentTarget.id}/edit`)
    }

    
    if(props.isLoading){
        return <div style={{ display:'flex',flexDirection:'column',alignItems:'center',position:'absolute',top:'40%',right:'50%'}}>
            <Spinner  animation="border" variant="primary" />
            <span>Loading...</span>
        </div>
        
    }else{

        return (
        <div style={{ display:'flex',flexDirection:'column',maxWidth:'1200px', minHeight:'80vh',margin:'3rem auto'}}>
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <h1>PRODUCT</h1> 
                <Button onClick={createProduct} variant='contained'>
                    Create Product
                </Button>
        
            </div>

            <TableContainer style={{marginTop:'2rem'}}>
                <Table>
                    <TableHead>
                        <TableRow >
                        <TableCell>ID</TableCell>
                        <TableCell>PRODUCT NAME</TableCell>
                        <TableCell>PRICE</TableCell>
                        <TableCell>CATEGORY</TableCell>
                        <TableCell>BRAND</TableCell>
                        <TableCell>ACTION</TableCell>     
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    {props.product && props.product.map(product =>(
                        <TableRow key={product._id}>
                        
                        <TableCell><div>{product._id}</div></TableCell>
                        <TableCell><div>{product.name}</div></TableCell>
                        <TableCell><div>$ {product.price}</div></TableCell>
                        <TableCell><div>{product.category}</div></TableCell>
                        <TableCell><div>{product.brand}</div></TableCell>
                        <TableCell>
                            <IconButton id={product._id} style={{ color: blue[800]}} size='small' onClick={handler}>
                                <BorderColorIcon  />
                            </IconButton>   
                            <IconButton id={product._id} style={{ color: red[800]}} size='small' onClick={deleteBtn}>
                                <DeleteForeverTwoToneIcon />
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
    }

    
}


const mapStateToProps = (state) => {
    return{
        product: state.products.product,
        isLoading: state.products.isLoading
    }
}

export default connect(mapStateToProps,{getAllProduct,deleteProduct})(ProductList)
