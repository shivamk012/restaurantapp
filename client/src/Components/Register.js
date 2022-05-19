import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {actionCreators} from '../store/index'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const [firstName , setFirstName] = useState('');
  const [lastName , setlasName] = useState('');
  const [address , setAddress] = useState('');
  const [State , setState] = useState('');
  const [city , setCity] = useState('');
  const [pinCode , setpinCode] = useState(0);
  const [isAdmin , setAdmin] = useState('');
  const [emailId , setEmail] = useState('');
  const [password , setPass] = useState('');

  const Reset = ()=>{
    setFirstName('');
    setlasName('');
    setAddress('');
    setState('');
    setCity('');
    setpinCode('');
    setAdmin('');
    setEmail('');
    setPass('');
}

  const registerUser = async ()=>{
    let userDetails = {
      firstName : firstName,
      lastName : lastName,
      emailId : emailId,
      password : password,
      state : State,
      city : city,
      address : address,
      pinCode : pinCode,
      isAdmin : (isAdmin === "true"),
      cart : [],
    };
    const port = process.env.PORT;

    await axios.post(`https://restaurantweb-app.herokuapp.com:${port}/setUser` , userDetails).then((res)=>{
        console.log(res.data.insertedId);
        dispatch(actionCreators.setToken({
            _id : res.data.insertedId,
            firstName : firstName,
            lastName : lastName,
            emailId : emailId,
            state : State,
            city : city,
            address : address,
            pinCode : pinCode,
            isAdmin : isAdmin,
        }));
        dispatch(actionCreators.initialiseCart([]));
        navigate('/');
    }).catch(err => {
      console.log(err);
    });
  }
  
  return (
      <>
      <NavBar/>
    <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
                <div className="card card-registration my-4">
                <div className="row g-0">
                    <div className="col-xl-6 d-none d-xl-block">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpOJO7X2q6uqZ_Z99WgDosHOigQPOy-lwjSy5C3AZ2FzXbQ7frAwuKDUH5Ueso9dUigXc&usqp=CAU"
                         className="img-fluid h-100"/>
                    </div>
                    <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">

                        <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="form-outline">
                            <input type="text" id="form3Example1m" className="form-control form-control-lg" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                            <label className="form-label" htmlFor="form3Example1m">First name</label>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="form-outline">
                            <input type="text" id="form3Example1n" className="form-control form-control-lg" value={lastName} onChange={(e)=>setlasName(e.target.value)}/>
                            <label className="form-label" htmlFor="form3Example1n">Last name</label>
                            </div>
                        </div>
                        </div>

                        <div className="form-outline mb-4">
                        <input type="text" id="form3Example8" className="form-control form-control-lg" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                        <label className="form-label" htmlFor="form3Example8">Address</label>
                        </div>

                        <div className="form-outline mb-4">
                        <input type="text" id="form3Example90" className="form-control form-control-lg" value={pinCode} onChange={(e)=>setpinCode(e.target.value)}/>
                        <label className="form-label" htmlFor="form3Example90">Pincode</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="text" id="form3Example90" className="form-control form-control-lg" value={State} onChange={(e)=>setState(e.target.value)}/>
                            <label className="form-label" htmlFor="form3Example90">State</label>
                        </div>
                        
                        <div className="form-outline mb-4">
                            <input type="text" id="form3Example90" className="form-control form-control-lg" value={city} onChange={(e)=>setCity(e.target.value)} />
                            <label className="form-label" htmlFor="form3Example90">City</label>
                        </div>

                        <div className="d-md-flex justify-content-start align-items-center mb-4 py-2" >

                        <h6 className="mb-0 me-4">Administrator: </h6>

                        <div className="form-check form-check-inline mb-0 me-4">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="yesAdmin"
                             value={"true"} onChange={(e)=>setAdmin(e.target.value)}/>
                            <label className="form-check-label" htmlFor="yesAdmin">Yes</label>
                        </div>

                        <div className="form-check form-check-inline mb-0 me-4">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="notAdmin"
                            value={"false"} onChange={(e)=>setAdmin(e.target.value)} />
                            <label className="form-check-label" htmlFor="notAdmin">No</label>
                        </div>

                        </div>

                        <div className="form-outline mb-4">
                        <input type="text" id="form3Example97" className="form-control form-control-lg" value={emailId} onChange={(e)=>setEmail(e.target.value)}/>
                        <label className="form-label" htmlFor="form3Example97">Email ID</label>
                        </div>

                        <div className="form-outline mb-4">
                        <input type="text" id="form3Example97" className="form-control form-control-lg" value={password} onChange={(e)=>setPass(e.target.value)}/>
                        <label className="form-label" htmlFor="form3Example97">Password</label>
                        </div>

                        <div className="d-flex justify-content-end pt-3">
                        <button type="button" className="btn btn-light btn-lg" onClick={Reset}>Reset all</button>
                        <button type="button" className="btn btn-warning btn-lg ms-2" onClick={registerUser}>Submit form</button>
                        </div>

                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
  )
}
