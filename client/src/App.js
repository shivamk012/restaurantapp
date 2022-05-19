import React from 'react'
import './App.css';

import Home from './Components/Home'
import Register from './Components/Register'
import Login from './Components/Login';
import Cart from './Components/Cart';
import Product from './Components/NewProduct'
import Checkout from './Components/Checkout'
import Request from './Components/Request'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

export default function App() {

  return (
    <div>
      <Router>
      
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/Register' element={< Register />}></Route>
        <Route exact path='/Login' element={< Login />}></Route>
        <Route exact path='/Logout' element={< Login />}></Route>
        <Route exact path='/Cart' element={< Cart />}></Route>
        <Route exact path='/checkout' element={< Checkout />}></Route>
        <Route exact path='/addNewProduct' element={< Product />}></Route>
        <Route exact path='/confirmRequest' element={< Request />}></Route>
      </Routes>
    </Router>
    </div>
  )
}
