import React, {useEffect} from 'react'
import Navbar from './components/layout/Navbar'
import Products from './components/Products'
import ProductInfo from './components/ProductInfo'
import Cart from './components/Cart'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Shipping from './components/Shipping'
import Payment from './components/Payment'
import PlaceOrder from './components/PlaceOrder'
import Profile from './components/Profile'
import CreateProduct  from './components/admin/CreateProduct'
import OrderList from './components/admin/OrderList'
import UserList from './components/admin/UserList'
import EditUser from './components/admin/EditUser'
import ProductList from './components/admin/ProductList'
import DetailOrder from './components/DetailOrder'
import ProtectedRoute from './protected.route'
import { useDispatch} from 'react-redux'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { updateCart } from './store/actions/cartAction'

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(updateCart())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  function PageNotFound() {
    return (
      <div style={{ display: 'grid', placeItems: 'center', height: '80vh' }}>
        <h1>Page not Found ...</h1>
      </div>
    )
  }


  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>

          <Route exact path="/">
            <Products />
          </Route>

          <Route exact path="/cart" component={Cart} />

          <Route exact path="/login" component={SignIn} />
          
          <Route exact path="/register" component={SignUp} />

          <Route exact path="/product/:id" component={ProductInfo} />

          {/* protected route */}
          <ProtectedRoute exact path="/profile" component={Profile} />

          <ProtectedRoute exact path="/shipping" component={Shipping} />
      
          <ProtectedRoute exact path="/payment" component={Payment} />
  
          <ProtectedRoute exact path="/placeorder" component={PlaceOrder} />
          <ProtectedRoute exact path="/order/:id" component={DetailOrder} />



          {/* Admin */}
          <ProtectedRoute exact path="/admin/userlist" component={UserList} />
          <ProtectedRoute exact path="/admin/orderlist" component={OrderList} />
          <ProtectedRoute exact path="/admin/:id/edit" component={CreateProduct} />
          <Route exact path="/admin/user/:id" component={EditUser} />
          <ProtectedRoute exact path="/admin/productlist" component={ProductList} />

          {/* Page not found */}
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
