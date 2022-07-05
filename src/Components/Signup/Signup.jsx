import React, {useState} from 'react';
import { Grid, Button, Paper } from '@mui/material';
import {Formik, Form} from 'formik';
import TextField from '../TextField';
import * as Yup from 'yup';
import {signUp} from '../../Actions/APIs/BookAPI';
import {useNavigate} from 'react-router-dom';

const initialValues = {
   email: '',
   password: '',
   cpassword: '',
};

const validationSchema = Yup.object({
   email: Yup.string()
     .email('Invalid email format')
     .required('Required'),
   password: Yup.string().required('No password provided.').min(8,'Password is too short - should be 8 chars minimum.'),
   cpassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
   
 });

function Signup() {
   const navigate = useNavigate();
   //  const [email, setEmail] = useState('');
   //  const [password, setPassword] = useState('');
   //  const [cpassword, setCPassword] = useState('');

  

    const handleSignUp = (values, {resetForm}) => {
      const {email, password, cpassword} = values;
      const params = {
         email,
         password,
         c_password: cpassword,
      }
      
      signUp(params).then(res => {
         resetForm();
         navigate('/login');
      })

    }

  return (
   <Formik
   initialValues={initialValues}
   validationSchema={validationSchema}
   onSubmit={handleSignUp}
   >
   <Form>
   <Grid container justifyContent='center' alignItems='center' sx={{height:'100vh'}}>
  <Grid item xs={6}>
    <Paper elevation={9} sx={{paddingLeft: '30px'}} >
    <Grid>
       <h2>SignUp Form</h2>
    </Grid>
    <Grid item xs={6}>
    <label>email</label>
     <TextField name='email'/>
      </Grid>
 
    <Grid item xs={6}>
    <label>password</label>
     <TextField name='password'  type='password' />
    </Grid>
    <Grid item xs={6}>
    <label>confirm password</label>
     <TextField name='cpassword'  type='password'/>
    </Grid>
    
    
    <Grid item xs={12} textAlign='right' marginTop={10}> 
    <Button variant="contained" type='submit' sx={{minWidth:'120px', margin:' 0 30px 30px 0'}} >Signup</Button>
    </Grid>
    </Paper>
  </Grid>
   </Grid>
   </Form>
   </Formik>
  )
}

export default Signup