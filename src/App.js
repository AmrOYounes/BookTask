import React, {useState, useEffect} from "react";
import Routing from './Components/Routing';
import axios from "axios";
// import ResponsiveAppBar from './Components/Appbar';
import './App.scss';
function App() {
  axios.defaults.headers.common = {Authorization: `Bearer ${localStorage.getItem('access-token')}`};
  const [isAuth, setIsAuth] = useState(false);
   const UpdateAuthState = value => {
    setIsAuth(value);
   }

  useEffect( () => {
    const token = localStorage.getItem('access-token');
    setIsAuth(!!token);
  
  },[isAuth]);

  return (
         <>
      {/* {isAuth && (<ResponsiveAppBar/>)} */}
     <Routing isAuth={isAuth} UpdateAuthState={UpdateAuthState}/>
         </>
       
      
  );
}

export default App;
