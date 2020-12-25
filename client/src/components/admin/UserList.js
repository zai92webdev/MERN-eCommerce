import React,{ useEffect} from 'react'
import {  Table, TableCell, TableContainer, TableHead,TableBody, TableRow} from '@material-ui/core'
import { connect } from 'react-redux'
import { getInfoAllUser, deleteUser } from '../../store/actions/authAction'
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { green,red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';

function UserList(props) {
    const history = useHistory()
    const users = props.users

    useEffect(() => {
        props.getInfoAllUser()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    
    const usersInfo =  (users && users.length) ? users.map( user => ({
        isAdmin : user.isAdmin,
        username: user.username,
        email: user.email,
        id: user._id
    })) : null


    const handler = (e) => {
        const id = e.currentTarget.id
        history.push(`/admin/user/${id}`)
    }

    const deleteBtn = (e) => {
        const deleteUser = window.confirm('Are you sure want to delete the user')
    
        if(deleteUser){
            const userID = e.currentTarget.id
            props.deleteUser(userID)
        }
        
    }

    if(props.isLoading){
        return <div style={{ display:'flex',flexDirection:'column',alignItems:'center',position:'absolute',top:'40%',right:'50%'}}>
            <Spinner  animation="border" variant="primary" />
            <span>Loading...</span>
        </div>
        
    }


        return (
        <div style={{ display:'flex',flexDirection:'column',maxWidth:'1200px', minHeight:'80vh',margin:'2rem auto'}}>
            <h1>USERS</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>User ID</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell>Action</TableCell>    
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersInfo && usersInfo.map(user =>(
                            <TableRow key={user.id}>
                            <TableCell><div>{user.id}</div></TableCell>
                            <TableCell><div>{user.username}</div></TableCell>
                            <TableCell><div>{user.email}</div></TableCell>
                            <TableCell>
                                <div>{user.isAdmin ? <span style={{color:'green',fontWeight:'bolder',fontSize:'1.1rem'}}>
                                    yes</span> : <span>no</span> }
                                </div>
                            </TableCell> 
                            <TableCell>
                                <div>
                                    <IconButton size='small' id={user.id} onClick={handler}>
                                        <BorderColorIcon  style={{ color: green[800]}} />
                                    </IconButton>
                                
                                    <IconButton  size='small' id={user.id} onClick={deleteBtn}>
                                        <DeleteForeverTwoToneIcon style={{ color: red[800]}} />
                                    </IconButton>
                                
                                </div>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
    

    
}


const mapStateToProps = (state) => {
    return{
        users: state.auth.users,
        isLoading: state.auth.isLoading
    }
}

export default connect(mapStateToProps, {getInfoAllUser,deleteUser})(UserList)
