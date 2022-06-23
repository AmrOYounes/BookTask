import React, {useState} from 'react';
import {Button, Grid,TextField} from '@mui/material';
import Select from 'react-select';
import {bookSearch} from '../../Actions/APIs/BookAPI';
import {NavLink} from 'react-router-dom';
import BookTable from '../Table';
import {exportData} from '../../Actions/APIs/BookAPI';
 const BookSearch = () => {
  const filterOptions = [
    {label:'Any', value:'Any'},
    {label:'Book title', value:'Book title'},
    {label:'Book Publisher', value:'Book Publisher'},
    {label:'Book Author', value:'Book Author'},
    {label:'tags', value:'tags'},
  ]
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowPerPage] = useState(4);
  const [count, setCount] = useState(0)
  const[search, setSearch] = useState('');
  const[unitStart, setUnitStart] = useState('');
  const[unitEnd, setUnitEnd] = useState('');
  const[priceStart, setPriceStart] = useState('');
  const[priceEnd, setPriceEnd] = useState('');
  const[filter, sertFilter] = useState('');


  const handleChange = (e)=>{
   const {name, value} = e.target;
   switch(name){
      case 'search' :
         setSearch(value);
         break;

      case 'unit_start': 
      setUnitStart(value);
      break;

      case 'unit_end':
         setUnitEnd(value);
         break;

      case 'price_start':
         setPriceStart(value);
         break;
      case 'price_end':
         setPriceEnd(value);
         break;
   }
  }

  const handleChangeFilter = (newValue) => {
   console.log(newValue);
   sertFilter(newValue.label)
  }

  const handleSearch = (page=1) => {
   console.log('fff')
    const params = {
      search_by_word: search,
      column_filter: filter,
      unit_start: unitStart,
      unit_end: unitEnd,
      price_start: priceStart,
      price_end: priceEnd,
      page: page,
    }

    bookSearch(params).then(res => {
      setData(res.data.data);
      setCount(res.data.total);
    });
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
         search_by_word: search,
         column_filter: filter,
         unit_start: unitStart,
         unit_end: unitEnd,
         price_start: priceStart,
         price_end: priceEnd,
         type,
      }
      
    }
    const anchor = document.createElement('a');
    document.body.appendChild(anchor);
    console.log(fileTypes[type]);
     exportData(config).then(res => {
      console.log(res)
      const objectUrl = window.URL.createObjectURL(new Blob([res.data]));
      anchor.href = objectUrl;
      anchor.download =  `${fileName}.${fileTypes[type]}`;
      anchor.click();

     });
     
  }

  return (
  <Grid container justifyContent='center'>
    <Grid item xs={12} textAlign='center' marginBottom={10}> Search for a book</Grid>
    <Grid item xs={9}>

      <Grid container justifyContent='center' spacing={4} marginBottom={5}>
         <Grid item xs={2}>Search By word</Grid>
         <Grid item xs={8}>
         <TextField id="outlined-basic" onChange={handleChange}  name='search' fullWidth variant="outlined"/>
         </Grid>
      </Grid>

      <Grid container justifyContent='center' spacing={4} marginBottom={5}>
         <Grid item xs={2}>Available Units</Grid>
         <Grid item xs={4}>
         <TextField id="outlined-basic"  onChange={handleChange} placeholder='Start with'  name='unit_start' fullWidth variant="outlined"/>
         </Grid>
         <Grid item xs={4}>
         <TextField id="outlined-basic" onChange={handleChange} placeholder='End with'   name='unit_end' fullWidth variant="outlined"/>
         </Grid>
      </Grid>

      <Grid container justifyContent='center' spacing={4} marginBottom={5}>
         <Grid item xs={2}>Unit Price</Grid>
         <Grid item xs={4}>
         <TextField id="outlined-basic" onChange={handleChange} placeholder='Start with'  name='price_start' fullWidth variant="outlined"/>
         </Grid>
         <Grid item xs={4}>
         <TextField id="outlined-basic"  onChange={handleChange} placeholder='End with'  name='price_end' fullWidth variant="outlined"/>
         </Grid>
      </Grid>
      <Grid container justifyContent='center' spacing={4}>
         <Grid item xs={2}/>   
         <Grid item xs={4}>
          <Button variant='contained' onClick={() => handleSearch()} fullWidth >Search</Button>
         </Grid>
         <Grid item xs={4}/>
          
      </Grid>

    </Grid>
    <Grid  justifyContent='center' item xs={2}>  <Select  options={filterOptions} onChange={(newValue) =>handleChangeFilter(newValue)} /></Grid>
   
    {data.length > 0 && (
      <Grid item xs={12} marginTop={20}> 
      <Grid item xs ={12} textAlign='right'>
         <span>Export as </span>
         <Button variant='contained' onClick={()=> handleExport('PDF')}>PDF</Button>
         <Button variant='contained' onClick={()=> handleExport('CSV')}>CSV</Button>
         <Button variant='contained' onClick={()=> handleExport('XLSX')}>EXCEL</Button>
      </Grid>
      
     <BookTable books={data} count={count} rowsPerPage={rowsPerPage} handleSearch={handleSearch}/>
      </Grid>
    )}
   
   <Grid item xs={12} textAlign='center' marginTop={40}>
      <Button variant='contained'>
      <NavLink to='/BookReserve'>ReserveBook</NavLink>
      </Button>
   </Grid>
  </Grid>
  )
}

export default BookSearch;