import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { actionCreators } from '../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';

export default function NewProduct() {
    const[productName , setProductName] = useState('');
    const[productPrice , setProductPrice] = useState(0);
    const[productImage , setProductImage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const port = process.env.PORT;

    const productDetails = {
        name : productName,
        price : productPrice,
        imageurl : productImage
    }

    const addNewItem = async()=>{
        await axios.post(`https://restaurantweb-app.herokuapp.com:${port}/addNewProduct` , productDetails).then((res)=>{
            dispatch(actionCreators.addNewProduct(productDetails));
            navigate('/');
        });
    }

    const resetAll = ()=>{
        setProductImage('');
        setProductName('');
        setProductPrice('');
    }

    return (
    <>
    <NavBar/>
    <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-50">
            <div className="col">
                <div className="card card-registration my-4">
                    <div className="row g-0">
                        <div className="col-xl-6 d-none d-xl-block">
                        <img src="https://minutes.co/wp-content/uploads/2019/08/product-launch.jpg"
                            className="img-fluid h-100"/>
                        </div>
                        <div className="col-xl-6">
                            <div className="card-body p-md-5 text-black my-4">
                                    <div className="form-outline">
                                    <label className="form-label my-4" htmlFor="form3Example1m">Product Name</label>
                                    <input type="text" id="form3Example1m" className="form-control form-control-lg" value={productName} onChange={(e)=>setProductName(e.target.value)} required/>
                                    
                                </div>
                                    <div className="form-outline">
                                    <label className="form-label my-4" htmlFor="form3Example1m">Product Price</label>
                                    <input type="text" id="form3Example1m" className=" form-control form-control-lg" value={productPrice} onChange={(e)=>setProductPrice(e.target.value)} required/>
                                </div>
                        
                                    <div className="form-outline">
                                    <label className="form-label my-4" htmlFor="form3Example1m">Product Image Url(Optional)</label>
                                    <input type="text" id="form3Example1m" className="form-control form-control-lg" value={productImage} onChange={(e)=>setProductImage(e.target.value)}/>
                                    </div>
                                <div className="d-flex justify-content-end pt-3">
                                    <button type="button" className="btn btn-light btn-lg" onClick={resetAll}>Reset all</button>
                                    <button type="button" className="btn btn-warning btn-lg ms-2" onClick={addNewItem}>Submit form</button>
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
