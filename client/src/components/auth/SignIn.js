import { FormControl, Button, Card, CardContent, Container, TextField } from '@material-ui/core'
import React, { useState,useEffect } from 'react'
import {connect} from 'react-redux'
import {useDispatch} from 'react-redux'
import { Alert } from '@material-ui/lab';
import Axios from '../../Axios.js'
import { LOGIN_FAIL, LOGIN_SUCCESS } from '../../store/actions'
import { Link,useHistory,useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';

function SignIn(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [notification, setNotification] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [pending, setPending] = useState(true)
    
    const history = useHistory()
    const location = useLocation();
    const dispatch = useDispatch()

    const token = localStorage.getItem('Auth-token')
    const redirect = location.search ? location.search.split('=')[1] : '/'


    const handleSubmit = async(e) => {
        e.preventDefault()
        
        const user = {email, password}

        await Axios.post('/user/login', user)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            setDisabled(true)
        }).catch(err => {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data
            })
            setErrorMessage(err.response.data.msg)
            setNotification(true)
        })
    } 
        
    const removeNotification = () => {
        setNotification(false)
    }

    if(notification) {
        setTimeout( removeNotification, 3000)
    }

    useEffect(() => {
        if(token){
            setTimeout( () => history.push(redirect), 500)
            
        }else {
            setPending(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleSubmit])
    

    if(pending){
        return <div style={{ display:'flex',flexDirection:'column',alignItems:'center',position:'absolute',top:'40%',right:'50%'}}>
            <Spinner  animation="border" variant="primary" />
            <span>Loading...</span>
        </div>
        
    }

    return (
        <div style={{ display: 'grid', placeItems: 'center', width: '100%', height: '90vh', textAlign: 'center' }}>
            <Container maxWidth="sm">
                <Card variant="outlined">
                    <CardContent>
                        <h1>Sign In</h1>

                        {notification && <Alert variant="filled" severity="error">{errorMessage}</Alert>  }

                        <form onSubmit={handleSubmit}>
                            
                            <FormControl fullWidth margin="normal">
                                <TextField variant="outlined" label="Email address" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <TextField variant="outlined"  label="Password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </FormControl>

                            <Button disabled={disabled} type="submit" size="small" variant="contained" color="primary">LOGIN</Button>
                        </form>
                        <div style={{marginTop:'15px'}}>Don't have an account, <Link to="/register">Register here</Link></div>
                    </CardContent>

                </Card>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        error: state.error,
        isAuthenticated: state.auth.isAuthenticated
    }
}


export default connect(mapStateToProps)(SignIn)
