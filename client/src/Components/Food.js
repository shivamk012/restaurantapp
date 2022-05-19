import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {actionCreators} from '../store/index'

export default function Food(props) {
  const dispatch = useDispatch();
  const setLogin = useSelector(state=>state.setLogin);
  const navigate = useNavigate();
  const handleClick = ()=>{
    if(!setLogin.clientId){
      navigate('/Login');
    }
    else{
      dispatch(actionCreators.addToCart(props.name));
    }
  }

  return (
    <div className='my-3'>
        <div className="card" style={{"width": "18rem"}}>
            <img className="card-img-top" src={props.imageurl} style={{"height" : "300px"}}/>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <div className="container">
                  <div className="row"> 
                  <button className="btn btn-primary col" onClick={handleClick}>Add to Cart</button>
                  <p className="col h5" style={{"textAlign" : "right"}}>Rs {props.price}</p>
            </div></div></div>
        </div>
    </div>
  )
}
