import { Grid, Button, Paper } from '@mui/material';
import TextField from '../TextField';
import React,{useState, useEffect} from 'react';
import {LoginFunc} from '../../Actions/APIs/BookAPI';
import { useNavigate} from "react-router-dom";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import { Navigate, Outlet } from "react-router-dom";
import './login.style.scss';

const initialValues = {
    email: '',
    password: '',
};

const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    password: Yup.string().required('No password provided.').min(8,'Password is too short - should be 8 chars minimum.')
    
  });

function Login({UpdateAuthState, isAuth}) {
  const [error, setError] = useState(false);

    let navigate = useNavigate();
console.log(isAuth)
    useEffect(()=> {
         if(isAuth){
         return  navigate('/');
         }
    },[isAuth])

    // console.log('ggggggg');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
   
    // const  handleChange = e => {
    //     const {name, value} = e.target;
    //     if( name === 'email') {
    //         // setEmail(value);
    //     }else{
    //         // setPassword(value);
    //     }
    // }

    const handleLogin = values => {
         console.log(values)
         const {email, password} = values;
        const params = {
            email,
            password
        }
        LoginFunc('/login', params).then( res => {
          UpdateAuthState(true);
          localStorage.setItem('access-token',res.accessToken);
            // console.log(res);
            return navigate('/');
        }).catch(err =>{
          setError(true)
        })
    }

    const handleNavigate = () => {
        return navigate('/register');
    }


  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleLogin}
   >
    <Form>
   <Grid container justifyContent='center' alignItems='center' sx={{height:'100vh'}}>
  <Grid item xs={6}>
  
    <Paper elevation={9} sx={{paddingLeft: '30px'}} >
    <Grid>
       <h2>Login Form</h2>
    </Grid>
    <Grid item xs={6}>
       <label>email</label>
      {/* <Field name='email' id='email' variant="outlined" fullWidth type='text' as={TextField} /> */}
      <TextField name="email" id="email"/>
      </Grid>
 
    <Grid item xs={6}>
    <label>password</label>
     <TextField name='password' id='password' type='password'/>
     {error && <div className='error'>Wrong email or password</div> }
     
    </Grid>
    
    <Grid item xs={12} textAlign='right' marginTop={10}> 
    <Button variant="contained" onClick={handleNavigate} sx={{minWidth:'120px', marginBottom:'30px'}} >Go Signup</Button>
    <Button variant="contained"  type='submit'  sx={{minWidth:'120px',margin: '10px 50px 40px 20px'}}>Login</Button>
    </Grid>
    </Paper>
  </Grid>
   </Grid>
   </Form>
   </Formik>
  )
}

export default Login