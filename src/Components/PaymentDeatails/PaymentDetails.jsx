import React, {useState} from 'react';
import Select from 'react-select';
import {Button, Grid,TextField,InputAdornment} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {addNewOrder} from '../../Actions/APIs/BookAPI';
import { ToastContainer, toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
import "react-toastify/ReactToastify.min.css";

import 'react-toastify/dist/ReactToastify.css';

 
 const PaymentDetails = ({reservedBook, handleFillOrderInfo,resetBookFields, handleSelectTab}) => {
    const [paymentMethod, setPaymnetMethod] = useState({label: reservedBook.paymentMethod, value: reservedBook.paymentMethod});
    const [numberOfUnits, setNumberOfUnits] = useState(reservedBook.numberOfUnits);
    const[showError, setShowError] = useState(false);

console.log(reservedBook);
let navigate = useNavigate();

const options = [
    { label: 'Cash', value: 'Cash'},
    { label: 'Credit Card', value: 'Credit Card'},
    { label: 'Paypal', value: 'Paypal'},
]
const hanldeReserve = () => {

    handleFillOrderInfo({
        paymentMethod: paymentMethod.label,
        numberOFUnits: numberOfUnits,
        totalPrice: numberOfUnits*reservedBook.Unit_price,
    });
    const params = {
         Book_id: reservedBook.Book_id.label,
         numberOfUnits: reservedBook.numberOFUnits,
         buyerName: reservedBook.buyerName, 
         buyerAdress: reservedBook.buyerAdress,
         phone: reservedBook.phone,
         purchaseDate: reservedBook.purchaseDate,
         nationalId: reservedBook.nationalId,
         paymentMethod: paymentMethod.label,
         totalPrice: numberOfUnits*reservedBook.Unit_price,
    }
    resetBookFields();
    
    addNewOrder(params).then(res=> {
      toast("accomplish Successfully");
      navigate('/purchaseHistory')
    });

    

}
const handleChangePayment = (value) => {
    console.log(value)
    setPaymnetMethod(value);
}

const handleChange = (e) => {
    const {value} = e.target;
    if( (+value) < 0 || (+value) > +(reservedBook.Available_units)){
        setNumberOfUnits('');
        setShowError(true);
    }else{
        // console.log(value)
        setNumberOfUnits(value);
        setShowError(false);
    }
   
}
  return (
    <Grid container>

{/* <Grid  justifyContent='center' item xs={2}>  </Grid> */}


<Grid item xs={12} marginBottom={4} >
            <Grid container justifyContent='center'>
            <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
              <label>Payment method </label> 
              </Grid>
              <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
              <Select value={paymentMethod } name='paymentMethod' options={options} onChange={(newValue) =>handleChangePayment(newValue)} />
           </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} marginBottom={4} >
            <Grid container justifyContent='center'>
            <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
              <label>Number of units </label> 
              </Grid>
              <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
              <TextField onChange={handleChange}   value={numberOfUnits}  id="outlined-basic"    name='numberOfUnits' fullWidth variant="outlined"/>
           </Grid>
            </Grid>
          </Grid>

          {
        showError && (  <Grid item xs={12} marginBottom={3}>
            <Grid container justifyContent='center'>
            <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
              </Grid>
              <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
              <span>should be greater than zero  and less than availalbe units({reservedBook.Available_units})</span>
           </Grid>
            </Grid>
          </Grid> )
      }

<Grid item xs={12} marginBottom={3}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
          <label>Unit Price </label> 
          </Grid>
          <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
          <TextField  disabled value={reservedBook.Unit_price}  className='gray-background'   id="outlined-basic"  name='unitPrice' fullWidth variant="outlined" type='number'
          InputProps={{endAdornment:(
            <InputAdornment position="start">
            <AttachMoneyIcon />
          </InputAdornment>
          )}}
          />
       </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} marginBottom={3}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
          <label>Total Price </label> 
          </Grid>
          <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
          <TextField value={reservedBook.totalPrice|| numberOfUnits*reservedBook.Unit_price}  disabled className='gray-background'   id="outlined-basic"  name='totalPrice' fullWidth variant="outlined" type='number'
          InputProps={{endAdornment:(
            <InputAdornment position="start">
            <AttachMoneyIcon />
          </InputAdornment>
          )}}
          />
       </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} marginBottom={10}>
            <Grid container justifyContent='center'>
            <Button variant="contained"  onClick={hanldeReserve} >Reserve book</Button>
            </Grid>
          </Grid>
          <ToastContainer position="bottom-right" newestOnTop />
    </Grid>
  )
}

export default PaymentDetails;