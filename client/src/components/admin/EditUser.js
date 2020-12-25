import { Button, FormControlLabel } from '@material-ui/core'
import React,{ useState,useEffect } from 'react'
import { connect } from 'react-redux'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory,useParams } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox';
import { loadUser,getInfoAllUser } from '../../store/actions/authAction'
import Axios from '../../Axios'
import { useDispatch,useSelector } from 'react-redux'
import { UPDATE_USER_ROLE_FAIL,UPDATE_USER_ROLE_SUCCESS } from '../../store/actions';
import { Alert } from '@material-ui/lab';


function EditUser(props) {
    const history = useHistory()
    const [checked, setChecked] = useState(false);
    const [editUser, setEditUser] = useState([])

    const  slug  = useParams()
    const dispatch = useDispatch()
    const users = useSelector(state => state.auth.users)

    const [errorMessage, setErrorMessage] = useState('')
    const [notification, setNotification] = useState(false)
    const [severity, setSeverity] = useState('')

    useEffect(() => {
        props.getInfoAllUser()

        const unsubscribe = () => {
            if(users.length !== 0) {
                users.forEach(user => {
                    if(user._id === slug.id){
                        setEditUser(user)
                        setChecked(user.isAdmin)
                    }
                })
            }else {
                history.push('/admin/userlist')
            }
        }
        
        return unsubscribe()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleChange=(e) => {
        setChecked(e.target.checked);
    }

    const Update=(e)=> {
        e.preventDefault()

        const id = slug.id
        const token = localStorage.getItem('Auth-token')

        Axios.patch(`/user/update_role/${id}`, {isAdmin: checked ? true : false}, {headers: {'Auth-token': token}} )
        .then( res => {
            dispatch({
                type : UPDATE_USER_ROLE_SUCCESS,
                payload : res.data
            })
            setErrorMessage(res.data.msg)
            setSeverity('success')
            setNotification(true)
        }).catch( err => {
            dispatch({
                type : UPDATE_USER_ROLE_FAIL,
                payload : err.response.data
            })
            setErrorMessage(err.response.data.msg)
            setSeverity('error')
            setNotification(true)
        })
        
    }

    const removeNotification = () => {
        setNotification(false)
    }

    if(notification) {
        setTimeout( removeNotification, 2000)
    }

    return (
        <div style={{ display:'flex',flexDirection:'column',maxWidth:'700px', minHeight:'80vh',margin:'2rem auto'}}>

            <div onClick={() => history.push('/admin/userlist')}>
            <Button  variant='contained'>
                <ArrowBackIcon />
                Back
            </Button>   
            </div>

            <div style={{marginTop:'3rem',marginLeft:'4rem'}}>
                <h1>Edit User</h1> 
                {notification && <Alert variant="filled" severity={severity}>{errorMessage}</Alert>  }
                <form onSubmit={Update} style={{marginTop:'2rem'}} >
                    <h3 style={{marginBottom:'1rem'}}>
                        Name
                    </h3>
                    <Button size='large' disableRipple fullWidth variant='contained' color='primary'>
                        {editUser.username}
                    </Button>
                    <h3 style={{marginBottom:'1rem',marginTop:'2rem'}}>
                        Email Address
                    </h3>
                    <Button disableRipple fullWidth variant='contained' color='primary'>
                        {editUser.email}
                    </Button>
                    

                    <div style={{display:'flex', flexDirection:'column',width:'10rem',marginTop:'2rem'}}>
                        <FormControlLabel
                            label='is Admin'
                            control={ <Checkbox  checked={checked} onChange={handleChange}
                            inputProps={{ 'aria-label': 'primary checkbox' }}/>}
                        />
                
                    <Button type="submit" style={{marginTop:'2rem'}} variant='contained' color='secondary'>Update</Button>  
                    </div>
                    
                </form>
                

            </div>
            
            
        
        </div>
    )
}


export default connect(null, {loadUser, getInfoAllUser})(EditUser)
