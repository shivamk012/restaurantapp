import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import {actionCreators} from '../store/index'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

export default function Cart() {
  const setLogin = useSelector(state=>state.setLogin);
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(setLogin.clientId);
    if(!setLogin.clientId){
      navigate('/Login');
    }
  },[])

  const cart = useSelector(state=>state.cart);
  const [price , setPrice] = useState(0);
  const dispatch = useDispatch();
  console.log(cart);

  const calculatePrice = ()=>{
    let sum = 0;
    let index = 0;
    for(;index < cart.cart.length ; index+=1){
      sum += cart.cart[index].price*cart.cart[index].qty;
    }
    setPrice(sum);
  }

  useEffect(() => {
    let sum = 0;
    let index = 0;
    for(;index < cart.cart.length ; index+=1){
      sum += cart.cart[index].price*cart.cart[index].qty;
    }
    setPrice(sum);
  })



  return (
        <>
        <NavBar/>
        <section className="h-100 gradient-custom">
          <div className="container py-5">
            <div className="row d-flex justify-content-center my-4">
              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-header py-3">
                    <h5 className="mb-0">Your Cart</h5>
                  </div>
                  {cart.cart.map((element)=>{
                    return <div className="card-body">
                    <div className="row">
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                          <img src={element.imageurl}
                            className="w-100" alt="Blue Jeans Jacket" />
                          <a href="#!">
                            <div className="mask" style={{"backgroundColor": "rgba(251, 251, 251, 0.2)"}}></div>
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p><strong>{element.name}</strong></p>
                        <button type="button" className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                          title="Remove item" onClick={()=>{dispatch(actionCreators.deleteItem(element.name , element.qty))}}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>

                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div className="d-flex mb-4" style={{"maxWidth": "300px"}}>
                          <button className="btn btn-primary px-3 me-2"
                            onClick={()=>{dispatch(actionCreators.removeFromCart(element.name))}}>
                            <i className="fas fa-minus"></i>
                          </button>

                          <div className="form-outline">
                            <input id="form1" min="0" name="quantity" value={element.qty} type="number" className="form-control" onChange={calculatePrice}/>
                          </div>

                          <button className="btn btn-primary px-3 ms-2"
                            onClick={()=>{dispatch(actionCreators.addToCart(element.name))}}>
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                      
                        <p className="text-start text-md-center">
                          <strong>Rs{element.price}</strong>
                        </p>
                      </div>
                    </div></div>
                  })}        
                </div> 
              </div>
              <div className="col-md-4">
                    <div className="card mb-4">
                      <div className="card-header py-3">
                        <h5 className="mb-0">Summary</h5>
                      </div>
                      <div className="card-body">
                        <ul className="list-group list-group-flush">
                          <li
                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            Products
                            <span>Rs{price}</span>
                          </li>
                          <li
                            className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                            <div>
                              <strong>Total amount</strong>
                              <strong>
                                <p className="mb-0">(including VAT)</p>
                              </strong>
                            </div>
                            <span><strong>Rs{price}</strong></span>
                          </li>
                        </ul>

                        <Link className="btn btn-primary btn-lg btn-block" to='/checkout'>
                          Go to checkout
                        </Link>
                      </div>
                    </div>
                  </div> 
            </div>
            </div>          
        </section>
        </>
  )
}
