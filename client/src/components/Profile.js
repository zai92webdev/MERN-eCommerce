import React,{useState, useEffect ,useRef} from 'react'
import {useHistory} from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { updateUser } from '../store/actions/authAction'
import Axios from '../Axios'
import { Alert } from '@material-ui/lab';
import {Tabs, Tab} from 'react-bootstrap'
import {  Table, TableCell, TableContainer, TableHead,TableBody, TableRow} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { getMyOrderList } from '../store/actions/orderActions'




function Profile(props) {
    const [disabled, setDisabled] = useState(true)
    const [username, setUserName] = useState('')
    const [avatar, setAvatar] = useState('')
    const uploadRef = useRef()
    const dispatch = useDispatch()
    const history = useHistory()

    const [message, setMessage] = useState('')
    const [notification, setNotification] = useState(false)
    const [severity, setSeverity] = useState('')

    useEffect(() => {
        dispatch(getMyOrderList())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const orders = props.order ? props.order : null
    const OrderArray = orders.order    

    const onSubmit = async (e) => {
        e.preventDefault()

        if(!avatar){
            const avatar = props.user.avatar
            props.updateUser(username,avatar)
        }else {
            props.updateUser(username,avatar)
        }

        
        setDisabled(true)
    }

    const edit = () => {
        setDisabled(false)
        setUserName(props.state.username)
    }

    const uploadBtn=() => {
        uploadRef.current.click()
    }

    const onChange =async (e) => {
        const file = (e.target.files[0])

        const data = new FormData()
        data.append('file', file)
        await Axios.post('/api/upload_avatar', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            setAvatar(res.data.url)
            setMessage('Upload Success')
            setSeverity('success')
            setNotification(true)
        }).catch(err => {
            setMessage(err.response.data.msg)
            setSeverity('error')
            setNotification(true)
        })
    }

    const removeNotification = () => {
        setNotification(false)
        setMessage('')
        setSeverity('')
    }

    if(notification) {
        setTimeout( removeNotification, 4000)
    }

    const myDate = () => {
        const myDates = new Date()
        const  Year = myDates.getFullYear();
        const Month = myDates.getMonth() + 1;
        const day = myDates.getDate();
        return day + '-' + Month + '-' + Year;
    }

    if(props.isLoading){
        return <div style={{ display:'flex',flexDirection:'column',alignItems:'center',position:'absolute',top:'40%',right:'50%'}}>
            <Spinner  animation="border" variant="primary" />
            <span>Loading...</span>
        </div>

        
    }else {

        if(props.orderIsLoading) {
            return <div style={{ display:'flex',flexDirection:'column',alignItems:'center',position:'absolute',top:'40%',right:'50%'}}>
            <Spinner  animation="border" variant="primary" />
            <span>Loading...</span>
        </div>
        }else{

            return (
                <div style={{ display:'flex',flexDirection:'column',maxWidth:'900px', minHeight:'80vh',margin:'0 auto',position:'relative'}}>
    
                    <div style={{position:'absolute',top:'9rem',right:'39%',zIndex: '100'}}>
                        {notification && <Alert variant="filled" severity={severity}>{message ? message : 'Error, please try again '}</Alert>  }
                    </div>
    
                    <div style={{margin:'1rem 0',display:'flex'}}>
                        <h1>PROFILE</h1>
                    </div>
    
                    <Tabs transition={false}>
                        <Tab eventKey="My Profile" title="My Profile">
                        
                    <Card>
                    <Card.Body>
                        <Card.Title>
                            Edit Profile
                        </Card.Title>
    
                    <div style={{margin:'0 auto',display:'flex',flexDirection:'column',alignItems:'center', padding:'1rem 0'}}>
                        <img alt='' src={avatar ? avatar : props.user.avatar} width="200" height="200" style={{objectFit:'contain',border:'1px solid #bfbfbf', borderRadius:'5px',marginBottom:'0.5rem',padding:'5px'}}/> 
                        <input hidden type='file' ref={uploadRef} onChange={onChange}  />
    
                        <div>
                            <IconButton size='small' onClick={uploadBtn}>
                                <PhotoCamera color='primary' size='2rem'  />
                            </IconButton> 
                        </div>
                        
                        <span>Upload Image</span>
                    </div>
    
                        <Form id='myform' onSubmit={onSubmit}>
                            <Form.Group >
                                <Form.Label>Username</Form.Label>
                                <Form.Control disabled={disabled}  placeholder={ props.state.username  } value={username} onChange={e => setUserName(e.target.value)} />
                            </Form.Group>
        
                            <Form.Group >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control disabled  placeholder={props.user.email}  />
                            </Form.Group>
                        </Form>
        
                        <div style={{display:'flex',justifyContent:'flex-end'}}>
                            <Button onClick={edit} style={{marginRight:'1rem'}}>
                                Edit
                            </Button>
        
                            <Button type='submit' form="myform" disabled={disabled}>
                                Update
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
    
                </Tab>
                    <Tab eventKey="My Orders" title="My Orders">
            
                    <Card>
                    <Card.Body>
                        <Card.Title>
                            My Orders
                        </Card.Title>
    
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell> ID</TableCell>
                            <TableCell>DATE</TableCell>
                            <TableCell>TOTAL</TableCell>
                            <TableCell>PAID DATE</TableCell>
                            <TableCell>DELIVERED</TableCell>
                            <TableCell>DETAIL</TableCell>    
                            </TableRow>
                        </TableHead>
                        <TableBody>
    
                            { OrderArray.length > 0 ? OrderArray.map(order=>(
                            <TableRow key={order._id}>
                                <TableCell><div>{order._id}</div></TableCell>
                                <TableCell><div>{myDate(order.createdAt)}</div></TableCell>
                                <TableCell><div>${order.itemsPrice}</div></TableCell>
                                <TableCell>
                                    <CloseIcon />
                                </TableCell>
                                <TableCell>
                                    <CloseIcon />
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => history.push(`/order/${order._id}`)}>
                                        Details
                                    </Button>
                                </TableCell>    
                            </TableRow>
                            )) : null }
    
                        </TableBody>
                    </Table>
                </TableContainer>
    
                    </Card.Body>
                </Card>
    
                    </Tab>
                        
                </Tabs>
    
            
                </div>
            )
        }

    }


}


const mapStateToProps = (state) => {
    return{
        user: state.auth.user,
        state: state.auth,
        isLoading: state.auth.isLoading,
        orderIsLoading: state.order.isLoading,
        order : state.order
    }
}

export default connect(mapStateToProps,{updateUser})(Profile)
