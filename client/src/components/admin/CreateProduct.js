import { Button, FormControl, TextareaAutosize, TextField } from '@material-ui/core'
import React,{useState ,useRef,useEffect} from 'react'
import { connect,useDispatch } from 'react-redux'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useHistory,useParams } from 'react-router-dom'
import { deleteProduct,getSingleProduct,updateProduct} from '../../store/actions/productAction'
import {PRODUCT_LOADED} from '../../store/actions'
import { returnErrors} from '../../store/actions/errorAction'
import Axios from '../../Axios'
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';


function CreateProduct(props) {
    const [file, setFile] = useState('')

    const myInput = useRef();
    const history = useHistory()
    const slug = useParams()
    const dispatch = useDispatch()

    const [productName, setProductName] = useState('') 
    const [price, setPrice] = useState('')
    const [brand, setBrand] = useState('')
    const [stock, setStock] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [pending, setPending] = useState(false)


    useEffect(() => {
    setPending(true)

    Axios.get(`/product/product_info/${slug.id}`)
    .then(res => {
        dispatch({
            type: PRODUCT_LOADED,
            payload: res.data
        })
    
        if( res.data._id === slug.id) {
            setProductName(res.data.name)
            setPrice(res.data.price)
            setBrand(res.data.brand)
            setStock(res.data.productCount)
            setCategory(res.data.category)
            setDescription(res.data.description)
            setFile(res.data.img)
        }
        setPending(false)
    }).catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status))
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const onChange = async(e) => {

        const file = (e.target.files[0])
        
        const data = new FormData()
        data.append('file', file)
        await Axios.post('/api/upload_product', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            setFile(res.data.url)
        }).catch(err => {
            console.log(err.response.data)
        })}

    const handler =() => {
        myInput.current.click()
    }

    const onSubmit= (e) => {
        e.preventDefault()

        const savedProduct =({
            id: slug.id,
            name: productName,
            price: price,
            brand: brand,
            productCount: stock,
            img: file,
            category: category,
            description: description
        })

        props.updateProduct(savedProduct)
        setDisabled(true)
    }

    const deleteBtn =() => {
        props.deleteProduct(slug.id)
        history.push('/admin/productlist')
    }


    if(pending){
        return <div style={{ display:'flex',flexDirection:'column',alignItems:'center',position:'absolute',top:'40%',right:'50%'}}>
            <Spinner  animation="border" variant="primary" />
            <span>Loading...</span>
        </div>
    }

    return (
        <div style={{ display:'flex',flexDirection:'column',maxWidth:'900px', minHeight:'80vh',margin:'0 auto'}}>
            <div style={{marginTop:'1rem',marginBottom:'-0.5rem',display:'flex', justifyContent:'space-between',alignItems:'center'}}>
                <h1>EDIT PRODUCT</h1>

                    <Button onClick={() => history.push('/admin/productlist')} size='small' variant='contained' >
                        BACK
                    </Button>
                </div>

            <form  onSubmit={onSubmit} style={{display:'flex',flexDirection:'column'}}>

                <FormControl style={{marginTop:'1.5rem'}}>
                <label style={{marginBottom:'0.5rem'}}>Product Name</label>
                <TextField helperText="Max not more than 30" inputProps={{maxLength: 45}} disabled={disabled} size='small' value={productName} onChange={e => setProductName(e.target.value)} variant="outlined" />   
                
                </FormControl>
            
                <FormControl size='small' style={{marginTop:'1rem'}} >
                <label style={{marginBottom:'0.5rem'}}>Price</label>
                <div>
                <TextField disabled={disabled} size='small' value={price} onChange={e => setPrice(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment>,}}variant="outlined"/>   
                </div>
                </FormControl>
                
                <FormControl style={{marginTop:'1rem'}}>
                <label style={{marginBottom:'0.5rem'}}>Image</label>
                <TextField disabled={disabled} size='small' value={file} variant="outlined"  /> 

                <div style={{display:'flex', justifyContent:'flex-start', marginTop:'0.5rem'}}>
                    <span style={{paddingRight:'65px',paddingLeft:'25px', backgroundColor:'#e6e6e6'}}>
                        Choose File   
                    </span>

                <Button disabled={disabled} onClick={handler} size='small' variant='contained' color='primary'>
                    BROWSE    
                </Button>   
                <input hidden ref={myInput} onChange={onChange} type='file'  />
                </div>
                </FormControl>
        
                <FormControl style={{marginTop:'1rem'}}>
                <label style={{marginBottom:'0.5rem'}}>Brand</label>
                <TextField disabled={disabled} size='small' value={brand} onChange={e => setBrand(e.target.value)} variant="outlined" />    
                </FormControl>

                <FormControl style={{marginTop:'1rem'}}>
                <label style={{marginBottom:'0.5rem'}}>Count in Stock</label>
                <TextField disabled={disabled} size='small' value={stock} onChange={e => setStock(e.target.value)} variant="outlined" />    
                </FormControl>

                <FormControl style={{marginTop:'1rem'}}>
                <label style={{marginBottom:'0.5rem'}}>Category</label>
                <TextField disabled={disabled} size='small' value={category} onChange={e => setCategory(e.target.value)} variant="outlined" />    
                </FormControl>

                <FormControl style={{marginTop:'1rem'}}>
                <label style={{marginBottom:'0.5rem'}}>Description</label>
                <TextareaAutosize disabled={disabled} style={{fontSize:'1rem', padding:'0.5rem'}} rowsMin={2} id="filled-basic" value={description} placeholder={description} 
                onChange={e => setDescription(e.target.value)} variant="filled" />

                </FormControl>
    
                <div style={{marginTop:'1.5rem', display:'flex',justifyContent:'space-around'}}>
                    
                    <Button  variant='contained' color='primary' onClick={ () => setDisabled(false)}  >
                        Edit
                    </Button>
                    <Button disabled={disabled} variant='contained' color='secondary' type='submit'>
                        UPDATE
                    </Button>
                    <Button disabled={disabled} onClick={deleteBtn}   variant='contained'  >
                        DELETE
                    </Button>
                </div>
            </form>
    
        </div>
    )
}


const mapStateToProps = (state) => {
    return{
        users: state.auth,
        product: state.products.productInfo,
        error: state.error

    }
}

export default connect(mapStateToProps, {deleteProduct,getSingleProduct,updateProduct})(CreateProduct)
