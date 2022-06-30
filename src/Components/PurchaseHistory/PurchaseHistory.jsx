import React,{useState} from 'react';
import {Button, Grid,TextField} from '@mui/material';
import Select from 'react-select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';
import {orderSearch,ordersExPORT} from '../../Actions/APIs/BookAPI';
import OrderTable from '../OrderTable';

const PurchaseHistory = () => {
    const filterOptions = [
        {label:'Any', value:'Any'},
        {label:'Book title', value:'Book title'},
        {label:'Book Publisher', value:'Book Publisher'},
        {label:'Book Author', value:'Book Author'},
        {label:'Buyer name', value:'Buyer name'},
      ] ;
      const [orders, setOrders] = useState([]);
      const [searchWord, setSearchWord] = useState('');
      const [purchaseDate, setPurchaseDate] = useState(null);
      const[filter, sertFilter] = useState('');
      const [rowsPerPage, setRowPerPage] = useState(4);
      const [count, setCount] = useState(0)

console.log(purchaseDate)
      const handleChnage = e => {
        const {value} = e.target;
        setSearchWord(value);
        console.log(value);
      }
      const handleChangeFilter = newValue => {
        console.log(newValue);
        sertFilter(newValue)
      }
      
      const handleChangePage = page => {
        const params = {
          purchaseDate,
          search_by_word: searchWord,
          column_filter: filter.label,
          page: page,
        }
        orderSearch(params).then( res => {
          setOrders(res.data.data);
          setCount(res.data.total);
       
        })
      }

      const handleSearch = (event ,page=1) => {
        event.preventDefault();
        const params = {
          purchaseDate,
          search_by_word: searchWord,
          column_filter: filter.label,
          page: page,
        }
        console.log(params);
        orderSearch(params).then( res => {
          setOrders(res.data.data);
          setCount(res.data.total);
       
        })
      }

      const handleExport = (type) => {
        console.log(type)
        const  fileTypes = {
           PDF: 'pdf',
           CSV: 'csv',
           XLSX: 'xlsx',
        }
        const fileName = 'books';
        const token = localStorage.getItem('access-token');
        const config = {
           headers: {
              responseType: 'blob',
              Authorization: `bearer ${token}`,
           },
           params: {
              search_by_word: searchWord,
              column_filter: filter.label,
              type,
           }
           
         }
         const anchor = document.createElement('a');
         document.body.appendChild(anchor);
         console.log(fileTypes[type]);
         ordersExPORT(config).then(res => {
           console.log(res)
           const objectUrl = window.URL.createObjectURL(new Blob([res.data]));
           anchor.href = objectUrl;
           anchor.download =  `${fileName}.${fileTypes[type]}`;
           anchor.click();
     
          });
          
       }

     

  return (
    <Grid container justifyContent='center'>
      <form style={{width:'100%'}} onSubmit={ (e)=>handleSearch(e)}>
      <Grid container justifyContent='center'>
    <Grid item xs={12} textAlign='center' marginBottom={10}> Purchase history</Grid>
    <Grid item xs={9}>

      <Grid container justifyContent='center' spacing={4} marginBottom={5}>
         <Grid item xs={2}>Search By word</Grid>
         <Grid item xs={8}>
         <TextField  required id="outlined-basic"  onChange={handleChnage}  name='search' fullWidth variant="outlined"/>
         </Grid>
      </Grid>

      <Grid container justifyContent='center' spacing={4} marginBottom={5}>
         <Grid item xs={2}>Purchase Date</Grid>
         <Grid item xs={8}>
         <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
        inputFormat="yyyy-MM-dd"
          value={ purchaseDate || null}
        //   value={publishDate}
          onChange={(date)=> {setPurchaseDate(format(date,'yyy-MM-dd'))}}
          renderInput={(params) => <TextField sx={{backgroundColor:'gray'}} {...params} />}
        />
      </Stack>
    </LocalizationProvider>
         </Grid>
      </Grid>

    
      <Grid container justifyContent='center' spacing={4}>
         <Grid item xs={2}/>   
         <Grid item xs={4}>
          <Button variant='contained' type='submit'  fullWidth >Search</Button>
         </Grid>
         <Grid item xs={4}/>
          
      </Grid>

    </Grid>
    <Grid  justifyContent='center' item xs={2}> 
     {/* <Select  options={filterOptions} onChange={(newValue) =>handleChangeFilter(newValue)} /> */}
     <Select  options={filterOptions} onChange={(newValue) =>handleChangeFilter(newValue)}/>
     </Grid>
    
     </Grid>
     </form>
  {orders.length > 0 && (
    <Grid container marginTop={10}>
    <Grid item xs ={12} textAlign='right'>
     <span>Export as </span>
     <Button  sx={{margin:'5px 5px'}} variant='contained' onClick={()=> handleExport('PDF')}>PDF</Button>
     <Button  sx={{margin:'5px 5px'}}variant='contained' onClick={()=> handleExport('CSV')}>CSV</Button>
     <Button  sx={{margin:'5px 5px'}}variant='contained' onClick={()=> handleExport('XLSX')}>EXCEL</Button>
  </Grid>
    <OrderTable orders={orders} count={count} rowsPerPage={rowsPerPage} handleSearch={handleChangePage}/>
    </Grid>
  )}
     
  </Grid>
  )
}

export default PurchaseHistory;
