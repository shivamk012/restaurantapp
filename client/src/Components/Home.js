import React, { useEffect } from 'react'
import axios from 'axios';
import Food from './Food'
import NavBar from './NavBar'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {actionCreators} from '../store/index';

export default function Home() {
    const [food , setFood] = useState([]); 
    // const setLogin = useSelector(state => state.setLogin);
    const dispatch = useDispatch();
    const port = process.env.PORT;
    useEffect(() => {
        axios.get(`https://restaurantweb-app.herokuapp.com:${port}/getFood`).then(res => {
            setFood(res.data);
            dispatch(actionCreators.initialiseProducts(res.data));  
        });
        // eslint-disable-next-line
    },[])
    
  return (
    <div>
      <div>
            <NavBar/>
            <div className="container">
            <div className="row my-4">
                {food.map((element)=>{
                return <div className='col-sm' key={element.name}>
                    <Food name={element.name} imageurl={element.imageurl} price={element.price}/>
                    </div>
                })}
            </div>
            </div>
            </div> 
    </div>
  )
}

