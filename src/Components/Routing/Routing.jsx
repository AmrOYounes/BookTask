import React from 'react';
import PrivateRoute from '../ProvateRoute';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../Login';
import Signup from '../Signup';
// import Home from '../../Pages/Home';
import Book from '../book';
import BookSearch from '../BookSearch';
import BookReserve from '../BookReserve';
import PurchaseHistory from '../PurchaseHistory';
import ResponsiveAppBar from '../Appbar';


const Routing = ({isAuth, UpdateAuthState}) =>  {
  return (
    <Router>
      {isAuth && (<ResponsiveAppBar UpdateAuthState={UpdateAuthState}/>)}
      <Routes>
        <Route path="/" element={<PrivateRoute isAuth={isAuth}/>}>
          <Route path="/" element={<Book/>} />
          <Route path="/booksearch" element={<BookSearch/>} />
          <Route path="/BookReserve" element={<BookReserve/>} />
          <Route path="/BookReserve/:id" element={<BookReserve />} />
         <Route path="/PurchaseHistory" element={<PurchaseHistory/>} />
        </Route>
        <Route path="/login" element={<Login UpdateAuthState={UpdateAuthState} isAuth={isAuth}/>} />
        <Route path="/register" element={<Signup/>} />
        <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
      </Routes>
    </Router>
  )
}

export default Routing