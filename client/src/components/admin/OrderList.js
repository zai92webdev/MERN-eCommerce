import React, {useEffect} from 'react'
import {  Table, TableCell, TableContainer, TableHead,TableBody, TableRow,Button} from '@material-ui/core'
import {connect,useDispatch} from 'react-redux'
import { getOrderList } from '../../store/actions/orderActions'
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';



function OrderList(props) {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getOrderList())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const orders = props.order ? props.order.order : null

    const orderDetail =(e) => {
        const id = e.currentTarget.value

        history.push(`/order/${id}`)
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

    

        return (
            <div style={{ display:'flex',flexDirection:'column',maxWidth:'1400px', minHeight:'80vh',margin:'3rem auto'}}>
                <h1>ORDERS</h1>
    
                <TableContainer style={{marginTop:'2rem'}}>
                    <Table>
                        <TableHead>
                            <TableRow >
                            <TableCell>ID</TableCell>
                            <TableCell>USERNAME</TableCell>
                            <TableCell>DATE</TableCell>
                            <TableCell>TOTAL</TableCell>
                            <TableCell>PAID</TableCell>
                            <TableCell>DELIVERED</TableCell>     
                            <TableCell>Actions</TableCell>     
                            </TableRow>
                        </TableHead>
                        <TableBody>

                
                        
                        {orders.length > 0 ? orders.map(order =>(
                            <TableRow key={order._id}>
                            
                            <TableCell><div>{order._id}</div></TableCell>
                            <TableCell><div>{order.user.username}</div></TableCell>
                            <TableCell><div>{myDate(order.createdAt)}</div></TableCell>
                            <TableCell><div>${order.itemsPrice}</div></TableCell>
                            <TableCell><CloseIcon /></TableCell>
                            <TableCell><CloseIcon /></TableCell>
                            <TableCell>
                                <Button  value={order._id} onClick={orderDetail} variant='contained'>Details</Button>
                            </TableCell>
                            </TableRow>

                        )) : null } 
                        
    
    
                        
                    
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }

}


const mapStateToProps=(state) => {
    return {
        order: state.order,
        isLoading : state.order.isLoading,
    }
}

export default connect(mapStateToProps, null)(OrderList)
