import React from 'react'
import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = ({component: Component, ...rest}) => {
    const token = localStorage.getItem('Auth-token')

    return (
            <Route {...rest} render= {(props) => {

                if(token){
                    return <Component {...props} />
                    
                }else {
                    return (
                        <Redirect to={
                            {
                                pathname: '/',
                                state: {
                                    from: props.location
                                }
                            }
                        } />
                    )
                }
            }} />
        )
    }

export default ProtectedRoute