import React from 'react'
import {
  Link
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { actionCreators } from '../store/index';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const setLogin = useSelector(state=>state.setLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const port = process.env.PORT;
  let button1;
  let cartButton;
  let addNewItem;
  let confirmRequest;
  
  const cart = useSelector(state=>state.cart);
  const Logout = async()=>{
    const userCart = cart.cart;
    console.log(userCart);
    await axios.post(`https://restaurantweb-app.herokuapp.com:${port}/updateCart` , {
      clientId : setLogin.clientId,
      cart : userCart
    }).then((res)=>{
      dispatch(actionCreators.logOutSession());
      dispatch(actionCreators.emptyCart());
      navigate('/');
      
    })  
  }

  if(!setLogin.clientId){
    button1 = <Link className="btn btn-success my-2 my-sm-0 text-align-center" to='/Login'>Login</Link>;
  }
  else{
    button1 = <button className="btn btn-danger my-2 my-sm-0" onClick={Logout}>Logout</button>;
    cartButton = <Link to={setLogin.clientId === null ? '/Login' : '/Cart'}><i className="fas fa-shopping-cart"></i></Link>;
    if(setLogin.isAdmin) {
      addNewItem = <Link className="btn btn-secondary my-2 my-sm-0" to='/addNewProduct'>Add New Food Product</Link>
      // console.log({requestLen});
      confirmRequest = <div>
                          <Link className="btn btn-secondary my-2 my-sm-0" to='/confirmRequest'>
                          New Orders
                          </Link>
                        </div>
    }
  }
  return (
    // <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{"minHeight" : "50px" , "background-color":"#474546"}}>
    //     <p className="navbar-brand font-weight-bold text-danger mx-2" style={{"letter-spacing" : "1px" , "fontSize" : "40px"}} href="#">FoodStop</p>

    //     <div className="collapse navbar-collapse " id="navbarSupportedContent" style={{"border-left": "2px solid #6b6568" , "fontSize" : "30px"}}>
    //       <ul className="navbar-nav mr-auto">
    //         <li className="nav-item active">
    //           <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
    //         </li>
    //         {button1}
    //         {cartButton}
    //         {addNewItem}
    //         {confirmRequest}
    //       </ul>
    //       </div>
    //   </nav>

<nav className="navbar navbar-expand-lg navbar-light bg-light" style={{"font-size" : "25px"}}>
  <div className="container-fluid">
    <button
      className="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <div className="navbar-brand mt-2 mt-lg-0">
        <img
          src="data:image/png;base64,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"
          style={{"max-width" : "200px"}}
          alt="MDB Logo"
          loading="lazy"
        />
      </div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li></ul>
    </div>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
        <li className="nav-item mx-2 mt-1">
          {button1}
        </li>
        <li className="nav-item mx-2 mt-1">
          {addNewItem}
        </li>
        <li className="nav-item mx-2 mt-1">
          {confirmRequest}
        </li>
      </ul>
    <div className="d-flex align-items-center">
      <div className="text-reset mt-1 mx-2" href="#">
        {cartButton}
      </div>

      {/* <div className="dropdown">
        
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuLink"
        >
          <li>
            <a className="dropdown-item" href="#">Some news</a>
          </li>
          <li>
            <a className="dropdown-item" href="#">Another news</a>
          </li>
          <li>
            <a className="dropdown-item" href="#">Something else here</a>
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <a
          className="dropdown-toggle d-flex align-items-center hidden-arrow"
          href="#"
          id="navbarDropdownMenuAvatar"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            className="rounded-circle"
            height="25"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          />
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuAvatar"
        >
          <li>
            <a className="dropdown-item" href="#">My profile</a>
          </li>
          <li>
            <a className="dropdown-item" href="#">Settings</a>
          </li>
          <li>
            <a className="dropdown-item" href="#">Logout</a>
          </li>
        </ul>
      </div> */}
    </div>
  </div>
</nav>

  )
}

