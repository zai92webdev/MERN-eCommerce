import React, { useEffect} from 'react'
import '../../stylesheet/Navbar.css'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link,useHistory } from 'react-router-dom';
import {connect} from 'react-redux'
import { loadUser, logout } from '../../store/actions/authAction'
import Avatar from '@material-ui/core/Avatar';
import { Dropdown,DropdownButton} from 'react-bootstrap'
import { Badge, IconButton } from '@material-ui/core';


function Navbar(props) {
    const history = useHistory()

    const cartItems = props.cart.cartItems ? props.cart.cartItems : null
    const cartTotal = cartItems.reduce((accumulator, cartItem) => cartItem.quantity + accumulator, 0) 

    useEffect(() => {
        props.loadUser();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const logout=()=>{
        props.logout()
        history.push('/login')
    }

    return (
        <div className="navbar">
            <div className="navbar__container">

            <Link to="/" className="navbar__left">
                <h1>e-Shop</h1>
            </Link>

            <div className="navbar__right">
                <div className="navbar__rightIcon">
                    <IconButton size='small' onClick={() => history.push('/cart')} className="navbar__rightIcon__cart">
                        <Badge badgeContent={ cartTotal }  color="secondary"  >
                        <AiOutlineShoppingCart size='2rem'/>  
                        </Badge>
                    </IconButton>
                </div>

                <span style={{marginRight:'20px', marginLeft:'5px'}}>Cart</span>


                { !props.isLoading 
                ? ( 
                    props.isAuthenticated ?
                        <div className="navbar__rightIcon">
                            <div style={{marginRight:'6px'}}>
                                <Avatar src={props.auths.user.avatar ? props.auths.user.avatar : null} /> 
                            </div>
                            
                            <div className="navbar__dropdown">
                            { props.isAuthenticated ? 
                                    (
                                        <>
                                        <DropdownButton size='md' variant='secondary' id="nav-dropdown" title={<span className='navbar__dropdownTitle'>{props.auths.username}</span>} >
                                            <Dropdown.Item  onClick={()=> history.push('/profile')} >Profile</Dropdown.Item>
                                            <Dropdown.Item onClick={logout} >Logout</Dropdown.Item>
                                            
                                            { props.isAdmin ?
                                            <>
                                                <Dropdown.Divider />
                                                <Dropdown.Item onClick={()=> history.push('/admin/userlist')} style={{color:'green'}}> Users</Dropdown.Item>
                                                <Dropdown.Item onClick={()=> history.push('/admin/productlist')} style={{color:'green'}} >Products</Dropdown.Item>
                                                <Dropdown.Item onClick={()=> history.push('/admin/orderlist')} style={{color:'green'}} >Orders</Dropdown.Item>
                                            </>
                                            : null
                                        }
                                            </DropdownButton>   
                                        </>

                                    )

                                    : null}
                            
                            </div>
                        </div>
                            : <div style={{display:'flex'}}>
                            <Link to="/login" className="navbar__rightIcon">
                            <span>Sign In</span>
                        </Link>
        
                        <Link to="/register" className="navbar__rightIcon">
                            <span style={{marginRight:'10px' ,marginLeft:'10px',borderLeft: '1px solid gray',height:'20px'}}></span>
                            <span>Register</span>
                        </Link>
                        </div>         
                
                ) : null}


            </div>

            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return{
    auths: state.auth,
    error:state.error,
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin,    
    isLoading: state.auth.isLoading,
    cart: state.cart
    }
}


export default connect(mapStateToProps,{loadUser,logout})(Navbar)
