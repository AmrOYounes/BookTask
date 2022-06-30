import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '../TextField';
import { Grid } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '../checkbox';
import Button from '@mui/material/Button';
import {Formik, Form, useFormikContext} from 'formik';
import * as Yup from 'yup';
import DateTimePicker from '../DatePicker';

const initialValues = {
    Publisher_name: '',
    Establish_date: '',
    Is_working: false,
  };
  
  const validationSchema = Yup.object({
    Publisher_name: Yup.string().required('Required'),
    Establish_date: Yup.date().required('Required'),
  });

 const PublisherDialog = ({publisherDialogState, updateDialogState,handleAddNewPublisher}) => {
   
  return (
    <Dialog open={publisherDialogState} onClose={() => updateDialogState('publisher',false)} fullWidth>
    <DialogTitle>Add new publisher</DialogTitle>
    <DialogContent>
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={ values => {
            console.log(values)
           const {Publisher_name, Establish_date,Is_working } = values;
            handleAddNewPublisher({
                Publisher_name,
                Establish_date,
                Is_working
            })
        }
        
        }
        >
        <Grid container direction='column'>
        <Form>
        <Grid item xs={7}>
        <label>Publisher name</label>
      <TextField
        margin="dense"
        id="Publisher_name"
        name='Publisher_name'
        type="text"
      />
        </Grid>
        <Grid item xs={7}>
        <label>Establish date</label>
       <DateTimePicker name='Establish_date'/>
        </Grid>
         <Grid item xs={7}>
         <Checkbox name='Is_working'  label="Still working ?" />
         </Grid>
      
       
        <DialogActions>
      <Button type='submit'   variant='contained'>Add</Button>
      <Button onClick={() => updateDialogState('publisher',false)}>Cancel</Button>
    </DialogActions>
       
    
{/* <FormControlLabel control={<Checkbox  name='isWorking' checked={isWorking} inputProps={{ 'aria-label': 'controlled' }}
 onChange={handleChange} />} label="Still working ?" /> */}
  </Form>
  </Grid>
  </Formik>
    </DialogContent>
    
  </Dialog>
  )
}

export default PublisherDialog;