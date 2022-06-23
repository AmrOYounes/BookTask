import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const  PrivateRoute = ({isAuth}) => {
    console.log('ddddddd');
    const isAuthenticated = localStorage.getItem('access-token');
  return  isAuthenticated ? <Outlet/> : <Navigate to="/login" />;
  
}

export default PrivateRoute
 

 