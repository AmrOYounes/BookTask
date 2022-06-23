import React from 'react';
import PrivateRoute from '../ProvateRoute';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../Login';
import Signup from '../Signup';
import Home from '../../Pages/Home';
import BookSearch from '../BookSearch';
import BookReserve from '../BookReserve';
import PurchaseHistory from '../PurchaseHistory';

const Routing = ({isAuth}) =>  {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute isAuth={isAuth}/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/booksearch" element={<BookSearch/>} />
          <Route path="/BookReserve" element={<BookReserve/>} />
         <Route path="/PurchaseHistory" element={<PurchaseHistory/>} />
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Signup/>} />
      </Routes>
    </Router>
  )
}

export default Routing