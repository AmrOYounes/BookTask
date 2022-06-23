import { Grid, TextField, Button } from '@mui/material';
import React,{useState} from 'react';
import {LoginFunc} from '../../Actions/APIs/BookAPI';
import { useNavigate} from "react-router-dom";
import './login.style.scss';

function Login() {
    let navigate = useNavigate();

    console.log('ggggggg');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const  handleChange = e => {
        const {name, value} = e.target;
        if( name === 'email') {
            setEmail(value);
        }else{
            setPassword(value);
        }
    }

    const handleLogin = () => {
        const params = {
            email,
            password
        }
        LoginFunc('/login', params).then( res => {
            localStorage.setItem('access-token',res.accessToken);
            // console.log(res);
            navigate('/');
        })
    }

  return (
   <Grid container justifyContent='center'>
       <Grid  item xs={12} textAlign='center' >
       <h1>Login Page</h1>
       </Grid>
  
  <Grid container flexDirection='column' paddingLeft={20}>
    <Grid item xs={6}>
       <label>email</label>
      <TextField name='email' variant="outlined" fullWidth onChange={handleChange} />
      </Grid>
 
    <Grid item xs={6}>
    <label>password</label>
     <TextField name='password' variant="outlined" fullWidth type='password' onChange={handleChange} />
    </Grid>
  </Grid>
 
    <Grid item xs={12} textAlign='right' marginRight={23} marginTop={10}> 
    <Button variant="contained" onClick={handleLogin} >Login</Button>
    </Grid>
   </Grid>
   
  )
}

export default Login