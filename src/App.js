import React, {useState, useEffect} from "react";
import Routing from './Components/Routing';
import './App.scss';

function App() {
  const token = localStorage.getItem('access-token');
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
   setIsAuth(!!token);
   if( !!token){
     
   }
  },[])

  return (
    
    <div className="App">
       <Routing isAuth={isAuth}/>
      {/* <Login/>
      <Signup/> */}
     {/* <Book/> */}
    </div>
  );
}

export default App;
