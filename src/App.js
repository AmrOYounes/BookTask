import React, {useState, useEffect} from "react";
import Routing from './Components/Routing';
import './App.scss';

function App() {
  const [isAuth, setIsAuth] = useState(false);
   const UpdateAuthState = value => {
    setIsAuth(value);
   }

  useEffect( () => {
    const token = localStorage.getItem('access-token');
    setIsAuth(!!token);
  
  },[]);

  return (
    

       <Routing isAuth={isAuth} UpdateAuthState={UpdateAuthState}/>
       
   
  );
}

export default App;
