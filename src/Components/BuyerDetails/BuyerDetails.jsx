import React ,{useState} from 'react';
import { Grid, TextField} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';




const BuyerDetails = ({handledisableTab, handleSelectTab, handleFillOrderInfo ,reservedBook }) => { 
   const [buyerName, setBuyerName] = useState(reservedBook.buyerName || '');
   const [buyerAdress, setBuyerAddress] = useState(reservedBook.buyerAdress || '');
   const[phone,setPhone] = useState(reservedBook.phone || '');
   const[nationalId, setNationalID] = useState(reservedBook.nationalId || '');
   const[purchaseDate, setPurchaseDate] = useState(reservedBook.purchaseDate || null);

   const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        switch(name) {
          case 'buyerName':
            setBuyerName(value);
            break;
          case 'buyerAdress': 
          setBuyerAddress(value);
          break;
        case 'buyerPhone':
          setPhone(value);
          break;
        case 'nationalID':
          setNationalID(value);  
          break;
        }
       
   }
    const hanldeSave = () => {
      const formatedDate = format(purchaseDate,'yyyy-MM-dd');
      console.log(formatedDate);
      const data = {
        buyerName,
        buyerAdress,
        phone,
        purchaseDate: formatedDate,
        nationalId,
      }
            handledisableTab('paymentTab');
            handleFillOrderInfo(data);
            handleSelectTab(2)
    }
  return (
    <Grid container>

    <Grid item xs={12} marginBottom={4} marginTop={10}>
            <Grid container justifyContent='center'>
            <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
              <label>Buyer name </label> 
              </Grid>
              <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
              <TextField  value={buyerName}  onChange={handleChange}  id="outlined-basic"    name='buyerName' fullWidth variant="outlined"/>
           </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} marginBottom={4} >
            <Grid container justifyContent='center'>
            <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
              <label>Buyer address </label> 
              </Grid>
              <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
              <TextField value={buyerAdress}   onChange={handleChange} id="outlined-basic"    name='buyerAdress' fullWidth variant="outlined"/>
           </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} marginBottom={4}>
            <Grid container justifyContent='center'>
            <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
              <label>Buyer Phone No. </label> 
              </Grid>
              <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
              <TextField value={phone} onChange={handleChange}   id="outlined-basic"    name='buyerPhone' fullWidth variant="outlined"/>
           </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} marginBottom={4}>
            <Grid container justifyContent='center'>
            <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
              <label>Purchase date </label> 
              </Grid>
              <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <DesktopDatePicker
            inputFormat="yyyy-MM-dd"
            value={ purchaseDate  || null}
              onChange={(date)=> {
                setPurchaseDate(date);
              }}
              renderInput={(params) => <TextField  {...params} />}
            />
          </Stack>
        </LocalizationProvider>
           </Grid>
            </Grid>
          </Grid>


          <Grid item xs={12} marginBottom={4} >
            <Grid container justifyContent='center'>
            <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
              <label>National ID </label> 
              </Grid>
              <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
              <TextField  value={nationalId}  onChange={handleChange} id="outlined-basic"    name='nationalID' fullWidth variant="outlined"/>
           </Grid>
            </Grid>
          </Grid>
    
    
          <Grid item xs={12} marginBottom={10}>
            <Grid container justifyContent='center'>
            <Button variant="contained"  onClick={hanldeSave} >Save and continue</Button>
            </Grid>
          </Grid>
    
        </Grid>
  )
}

export default BuyerDetails;

