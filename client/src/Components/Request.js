import React, { useEffect } from 'react'
import NavBar from './NavBar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../store/index';

export default function Request() {
    const dispatch = useDispatch();
    const port = process.env.PORT;
    const getOrders = async()=>{
      await axios.get(`https://restaurantweb-app.herokuapp.com:${port}/getRequest`).then(res => {
          // console.log(res.data);
          dispatch(actionCreators.initialiseRequest(res.data));  
        });
      }
      let abc = useSelector(state=>state.request);
      let request = abc.request;
    
    useEffect(() => {
        // console.log(1);
       getOrders();
    }, []);

    return (
    <div> 
        <NavBar/>
        <div>
                <section className="h-100 gradient-custom">
                <div className="container py-5">
                  <div className="row d-flex justify-content-center my-4">
                    <div className="col-md-8">
                      <div className="card mb-4">
                        <div className="card-header py-3">
                            <h5 className="mb-0">Pending Orders</h5>
                        </div>
                        {request.map((element)=>{
                            return <div className='row'>
                              <div className='col mb-lg-0'>
                                <p className='my-auto'><strong>Name:{element.name}</strong></p>
                                <p className='my-auto'><strong>Address:{element.address}</strong></p>
                              </div>
                              <div className='col mb-lg-0'>
                               {element.cart.map((element1)=>{
                                return <div className="card-body">
                                  <div className="row">
                                  
                                    <div className="col  mb-lg-0">
                                      <p><strong>{element1.name}</strong></p>
                                    </div>
              
                                    <div className="col  mb-lg-0">
                                      <p id="form1"  type="number">{element1.qty}</p>
                                    </div>
                                  </div>
                                </div>
                              })}
                            </div>
                        
                        <button type="button" value={element.clientId} className='btn btn-success btn-lg col mb-lg-0 mx-4 my-4' style={{"height" : "50px" , "max-width" : "120px" }} onClick={(e)=>dispatch(actionCreators.updateRequest(e.target.value))}>Accept</button>  
                        <button className='btn btn-danger btn-lg col mb-lg-0 mx-4 my-4' style={{"height" : "50px" , "max-width" : "120px" }}>Decline</button>
                        <hr/>
                        </div>
                      })}
                        
                        </div>
              </div>
            </div>          </div>
        </section>
            </div>
    </div>
  )
}
