import React from 'react'
import { useDispatch } from 'react-redux';
import {actionCreators} from '../store/index'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
export default function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const setLogin = useSelector(state=>state.setLogin);
    const [firstName,setfirstName] = useState(setLogin.firstName);
    const [lastName,setlastName] = useState(setLogin.lastName);
    const [emailId,setemailId] = useState(setLogin.emailId);
    const [state,setstate] = useState(setLogin.state);
    const [city,setcity] = useState(setLogin.city);
    const [pinCode,setpinCode] = useState(setLogin.pinCode);
    const [address,setaddress] = useState(setLogin.address);
    const [card,setCard] = useState('credit');
    const cart = useSelector(state=>state.cart);
    const userCart = cart.cart;

    const CheckOut = async()=>{
        dispatch(actionCreators.emptyCart());
        const port = process.env.PORT;
        await axios.post(`https://restaurantweb-app.herokuapp.com:${port}/requestOrder` , {
            clientId : setLogin.clientId,
            name : setLogin.firstName+' '+setLogin.lastName,
            address : setLogin.address,
            cart : userCart
        }).then((res)=>{
            console.log(res);
            if(res.data.acknowledged) {
                navigate('/');
            }
        }).catch(err=>{
            console.log(err);
        })
    }


  return (
      <div>
          <NavBar/>
      <div className="container" style={{"margin":"auto"}}>
    <div className="row">
        <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">First name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="" value={firstName} required onChange={(e)=>setfirstName(e.target.value)}/>
                        <div className="invalid-feedback"> Valid first name is required. </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="lastName">Last name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="" value={lastName} required onChange={(e)=>setlastName(e.target.value)}/>
                        <div className="invalid-feedback"> Valid last name is required. </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email </label>
                    <input type="email" className="form-control" id="email" placeholder="you@example.com" value={emailId} onChange={(e)=>setemailId(e.target.value)}/>
                    <div className="invalid-feedback"> Please enter a valid email address for shipping updates. </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="address">Address</label>
                    <input type="text" value={address} className="form-control" id="address" placeholder="1234 Main St" required onChange={(e)=>setaddress(e.target.value)}/>
                    <div className="invalid-feedback"> Please enter your shipping address. </div>
                </div>
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <label htmlFor="country">State</label>
                        <input type="text" value={state} className="form-control" id="state" required onChange={(e)=>setstate(e.target.value)}/>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="state">City</label>
                        <input type="text" value={city} className="form-control" id="city" required onChange={(e)=>setcity(e.target.value)}/>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="zip">PinCode</label>
                        <input type="text" className="form-control" id="zip" placeholder="" required value={pinCode} onChange={(e)=>setpinCode(e.target.value)}/>
                    </div>
                </div>
                <h4 className="mb-3">Payment</h4>
                <div className="d-block my-3">
                    <div className="custom-control custom-radio">
                        <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" value="credit" checked={card === "credit"} onChange={(e)=>setCard(e.target.value)} required/>
                        <label className="custom-control-label" htmlFor="credit">Credit card</label>
                    </div>
                    <div className="custom-control custom-radio">
                        <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" value="debit" checked={card === "debit"} onChange={(e)=>setCard(e.target.value)} />
                        <label className="custom-control-label" htmlFor="debit">Debit card</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="cc-name">Name on card</label>
                        <input type="text" className="form-control" id="cc-name" placeholder="" required/>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="cc-number">Credit card number</label>
                        <input type="text" className="form-control" id="cc-number" placeholder="" required/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="cc-expiration">Expiration</label>
                        <input type="text" className="form-control" id="cc-expiration" placeholder="" required/>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="cc-cvv">CVV</label>
                        <input type="text" className="form-control" id="cc-cvv" placeholder="" required/>
                    </div>
                </div>
                <button className="btn btn-primary btn-lg btn-block" onClick={CheckOut}>Continue to checkout</button>
        </div>
    </div>
</div>
</div>
  )
}
