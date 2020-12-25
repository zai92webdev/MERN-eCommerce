import { FormControl, Button, Card, CardContent, Container, TextField } from '@material-ui/core'
import Axios from '../../Axios'
import React, { useState,useEffect } from 'react'
import {connect} from 'react-redux'
import { useDispatch} from 'react-redux'
import { REGISTER_FAIL, REGISTER_SUCCESS } from '../../store/actions'
import { Alert } from '@material-ui/lab';
import { Link, useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUp(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [notificationError, setNotificationError] = useState(false)
    const [notificationSuccess, setNotificationSuccess] = useState(false)
    const [pending, setPending] = useState(true)
    
    const dispatch = useDispatch()
    const token = localStorage.getItem('Auth-token')
    const history = useHistory()

    useEffect(() => {
        if(token) {
            history.push('/')
        }else {
            setPending(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault()

        const registerUser = {username,email, password,confirmPassword}

        Axios.post('/user/register', registerUser)
        .then(res =>{
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            setSuccessMessage(res.data.msg)
            setNotificationSuccess(true)
        }).catch( err => {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data
            })
            setErrorMessage(err.response.data.msg)
            setNotificationError(true)
        })

        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    const removeNotification = () => {
        setNotificationError(false)
        setNotificationSuccess(false)
    }

    if(notificationError || notificationSuccess ) {
        setTimeout( removeNotification, 4000)
    }


    if(pending){
        return <div style={{ display:'flex',flexDirection:'column',alignItems:'center',position:'absolute',top:'40%',right:'50%'}}>
            <Spinner  animation="border" variant="primary" />
            <span>Loading...</span>
        </div>
        
    }
    
    return (
        <div style={{ display: 'grid', placeItems: 'center', width: '100%', height: '90vh', textAlign: 'center' }}>
            <Container maxWidth="sm">

                <Card variant="outlined" >
                    <CardContent>
                        <h1>Sign Up</h1>
                        {notificationError && <Alert variant="filled" severity="error">{errorMessage}</Alert>}
                        {notificationSuccess && <Alert variant="filled" severity="success">{successMessage}. Please sign in to continue</Alert>}
                        <form onSubmit={handleSubmit} style={{ padding: '1rem 1rem' }}>

                            <FormControl fullWidth margin="normal">
                                <TextField variant="outlined" label="Username"  value={username} onChange={(e) => { setUsername(e.target.value) }} />
                            </FormControl>

                            <FormControl fullWidth margin="normal">                            
                                <TextField variant="outlined" label="Email address" type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </FormControl>

                            <FormControl fullWidth margin="normal">                                
                                <TextField variant="outlined" label="Password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </FormControl>

                            <FormControl fullWidth margin="normal">                                
                                <TextField variant="outlined" label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                            </FormControl>
                            

                            <Button type="submit" size="small" variant="contained" color="primary">Register</Button>
                        </form>
                        <div style={{marginTop:'5px'}}>Already have an account, <Link to="/login">Sign in here</Link></div>
                    </CardContent>

                </Card>
            </Container>

        </div >
    )
}

const mapStateToProps = state => ({
    
})



export default connect(mapStateToProps)(SignUp)
