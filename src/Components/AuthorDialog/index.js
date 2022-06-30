import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '../TextField';
import { Grid } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {Formik, Form, useFormikContext} from 'formik';
import Select from '../Select';


import * as Yup from 'yup';
import DateTimePicker from '../DatePicker';

const initialValues = {
    fName: '',
    mName: '',
    lName: '',
    birthDate: '',
    country: '',
    deathDate: '',
    website: '',
  };
  
  const validationSchema = Yup.object({
    fName: Yup.string().required('Required'),
    mName: Yup.string().required('Required'),
    lName: Yup.string().required('Required'),
    birthDate: Yup.date().required('Required'),
    country: Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required()
      }),
    deathDate: Yup.date().required('Required'),
    website: Yup.string().required('Required'),
  });


 const AuthorDialog = ({authorDialogState, updateDialogState, countries, handleAddAuthor}) => {

  return (
    <Dialog open={authorDialogState} onClose={() => updateDialogState('author',false)} fullWidth>
    <DialogTitle>Add new Author</DialogTitle>
    <DialogContent>
       <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={ values => {
            handleAddAuthor(values);
        }}
       >
        <Form>
      <Grid container justifyContent='center' spacing={2}>
      <Grid item xs={4}>
      <label>First name</label>
      <TextField
        margin="dense"
        id="fName"
        name='fName'
        type="text"
         
      />
      </Grid>
      <Grid item xs={4}>
      <label>Middle name</label>
      <TextField
        margin="dense"
        id="mName"
        name='mName'
        type="text"
      />
      </Grid>

      <Grid item xs={4}>
      <label>Last name</label>
      <TextField
        margin="dense"
        id="lName"
        name='lName'
        type="text"
      />
      </Grid>
      </Grid>

      <Grid container justifyContent='center' spacing={2}>
      <Grid item xs={6}>
      <label>Birth of  date</label>
      <DateTimePicker name='birthDate'/>
  {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
  <Stack spacing={3}>
    <DesktopDatePicker
      inputFormat="yyyy-MM-dd"
      value={birthDate}
      onChange={(newValue)=>handleChangeDate(newValue,'birthDate')}
      renderInput={(params) => <TextField {...params} />}
    />
  </Stack>
</LocalizationProvider> */}
      </Grid>
      <Grid item xs={6}>
        <label>Country of residance</label>
        <Select   options={countries} name='country' />
      {/* <Select styles={customStyles} options={countries} onChange={ (newValue)=>handleChangeSelectedValue(newValue,'country')}/> */}
      </Grid>
      </Grid>
  
  <Grid container justifyContent='center' spacing={2}>
   <Grid item xs={6} marginTop={1}>
    <label>Death date</label>
    <DateTimePicker name='deathDate'/>
   {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
  <Stack spacing={3}>
    <DesktopDatePicker
      
      inputFormat="yyyy-MM-dd"
      value={deathDate}
      onChange={(newValue)=>handleChangeDate(newValue,'deathDate')}
      renderInput={(params) => <TextField {...params} />}
    />
  </Stack>
</LocalizationProvider> */}
   </Grid>
   <Grid item xs={6}>
   <label>Offical website</label>
      <TextField
        margin="dense"
        id="website"
        name='website'
        type="text"
        
      />
    </Grid>
  </Grid>
  <DialogActions>
      <Button  variant='contained' type='submit'>Add</Button>
      <Button onClick={() => updateDialogState('author',false)}>Cancel</Button>  
    </DialogActions>
  </Form>
  </Formik>
    </DialogContent>
    
  </Dialog>

  )
}

export default AuthorDialog;