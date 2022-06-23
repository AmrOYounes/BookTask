import React, {useState} from 'react';
import { Grid, TextField, Button } from '@mui/material';
import {signUp} from '../../Actions/APIs/BookAPI';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    const handleChange = e => {
     const {name, value} = e.target;
     switch(name){
         case 'email': 
            setEmail(value);
         break;
         case 'password' :
            setPassword(value);
            break;
         case 'cpassword' :
            setCPassword(value);
            break;   
     }
    }

    const handleSignUp = () => {
      const params = {
         email,
         password,
         c_password: cpassword,
      }

      signUp(params).then(res => {
         setEmail('');
         setPassword('');
         setCPassword('');
      })

    }

  return (
    <Grid container justifyContent='center' alignItems='center' className='signup-container'>
    <Grid item xs={12} md={6}>
     <h1>SignUp Page</h1>
     <label>email</label>
     <TextField name='email' value={email} variant="outlined" fullWidth onChange={handleChange} />
     <label>password</label>
     <TextField name='password' value={password} variant="outlined" fullWidth type='password' onChange={handleChange} />
     <label>confirm password</label>
     <TextField name='cpassword' value={cpassword} variant="outlined" fullWidth type='password' onChange={handleChange} />
    </Grid>
    <Grid item xs={12} textAlign='right' marginTop={10} marginRight={35}> 
    <Button variant="contained" onClick={handleSignUp}>SignUp</Button>
    </Grid>
   </Grid>
  )
}

export default Signup