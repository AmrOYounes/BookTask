
import { Grid, TextField, InputAdornment  } from '@mui/material';
import React, {useState, useEffect,useRef } from 'react';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Select from 'react-select';
import Button from '@mui/material/Button';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {getBookByIdOrTitle} from '../../Actions/APIs/BookAPI';
import './bookDetails.stye.scss';
 
 const BookDetails = ({handledisableTab, handleSelectTab, handleFillOrderInfo, reservedBook}) => {
    const dateElement = useRef();
    const[book, setBook] = useState(reservedBook);
    const[bookIDs, setBookIDs] = useState([]);
    const[bookTitles, setBookTitles] = useState([]);
    const[selectedId, setSelectedID] = useState('');
    const[selectedTitle, setSelectedTitle] = useState('');
    const[searchById, setSearchById] = useState('');
    const[searchByTitle, setSearchByTitle] = useState('');
    const[numberOfUnits, setNumberOfUnits] = useState('');
    const[showError, setShowError] = useState(false);
   
    const handleChange = (e)=> {
      console.log(e.target.value);
       const {name, value, id} = e.target; 
       if(name === 'bookId' && value !== '') {
        setSearchById(value);
        getBookByIdOrTitle({ BOOK_id: value}).then(res => {
           const modifiedBooks = res.data.map(book => ({...book, label: `${book.Book_id}`}))
           setBookIDs(modifiedBooks);
        })
       }
       else if (name === 'numberOFUnits'){
        console.log(+value);
        console.log(typeof(+book.Available_units));
        console.log((book.Available_units));
        
        if( (+value) < 0 || (+value) > +(book.Available_units)){
            setNumberOfUnits('');
            setShowError(true);
        }else{
            console.log(value)
            setNumberOfUnits(value);
            handleFillOrderInfo({numberOfUnits: value})
            setShowError(false);
        }
       }
     }

          const handleselect = (event, value) => {
            // console.log(value);
            if(value === null){
                setBook({Book_publisher:'',Publish_date: null, Book_author: '',Available_units: '',Unit_price: ''});
                
            }else{
                setBook(value);
                console.log(value)
            }
           
          }

          const hanldeSave = () => {
            if(searchById !== '' && numberOfUnits !== ''){
            const bookReserved = {...book, numberOfUnits }
            handledisableTab('buyerTab');
            handleFillOrderInfo(bookReserved);
            handleSelectTab(1);

          }
        }
      

  return (
    <Grid container>

<Grid item xs={12} marginBottom={3} marginTop={10}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
          <label>Book ID </label> 
          </Grid>
          <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
          <Autocomplete
          onChange={handleselect}
          id="autoCompleteIds"
          options={bookIDs}
          sx={{ width: 300 }}
          defaultValue={{label: book.Book_id ?book.Book_id : ''}}
         renderInput={(params) => <TextField  name='bookId' onChange={handleChange} {...params} label="search by ID" />}
    />
       </Grid>
        </Grid>
      </Grid>

      {/* <Grid item xs={12} marginBottom={3}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
          <label>Book title </label> 
          </Grid>
          <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
          <Autocomplete
          id="combo-box-demo"
          options={bookIDs}
          sx={{ width: 300 }}
         renderInput={(params) => <TextField  name='bookTitle' onChange={handleChange} {...params} label="search by ID" />}
    />
       </Grid>
        </Grid>
      </Grid> */}
      
      <Grid item xs={12} marginBottom={3}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
          <label> Book Publisher </label> 
          </Grid>
          <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
          <TextField  id="outlined-basic"  value={book.Book_publisher} name='bookPublisher' fullWidth variant="outlined"  className='gray-background'  />
       </Grid> 
        </Grid>
      </Grid>
       
        <Grid item xs={12} marginBottom={3}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
          <label>Publish date </label> 
          </Grid>
          <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
        ref={dateElement}
        inputFormat="yyyy-MM-dd"
          value={ book.Publish_date || null}
        //   value={publishDate}
          onChange={(date)=> {
              
          }}
          renderInput={(params) => <TextField sx={{backgroundColor:'gray'}} {...params} />}
        />
      </Stack>
    </LocalizationProvider>
       </Grid>
        </Grid>
      </Grid>
           
      <Grid item xs={12} marginBottom={3}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
          <label> Book Author </label> 
          </Grid>
          <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
          <TextField value={book.Book_author} className='gray-background' id="outlined-basic"  name='bookAuthor' fullWidth variant="outlined"   />
       </Grid>
        </Grid>
      </Grid> 

      

      {/* <Grid item xs={12} marginBottom={3}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={1} style={{maxWidth:'114px'}}>
          <label>Book tags </label> 
          </Grid>
          <Grid item xs={8} md={4} style={{maxWidth:'470px'}} >
           <TagsInput   value={bookTags}  onChange={handleTags}/>
       </Grid>
        </Grid>
      </Grid> */}
      <Grid item xs={12} marginBottom={3}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
          <label>Available Units </label> 
          </Grid>
          <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
          <TextField value={book.Available_units} className='gray-background' id="outlined-basic"  fullWidth variant="outlined" type='number' name='availableUnits'   />
       </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} marginBottom={3}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
          <label>Unit Price </label> 
          </Grid>
          <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
          <TextField  value={book.Unit_price} className='gray-background'   id="outlined-basic"  name='unitPrice' fullWidth variant="outlined" type='number'
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
          <label> Number of units </label> 
          </Grid>
          <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
          <TextField  value={reservedBook.numberOfUnits} type='number' onChange={handleChange}  id="outlined-basic"   name='numberOFUnits' fullWidth variant="outlined"   />
       </Grid>
        </Grid>
      </Grid> 
      {
        showError && (  <Grid item xs={12} marginBottom={3}>
            <Grid container justifyContent='center'>
            <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
              </Grid>
              <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
              <span>should be greater than zero  and less than availalbe units</span>
           </Grid>
            </Grid>
          </Grid> )
      }
    

      <Grid item xs={12} marginBottom={10}>
        <Grid container justifyContent='center'>
        <Button variant="contained" onClick={hanldeSave} >Save and continue</Button>
        </Grid>
      </Grid>

    </Grid>
  )
}

export default BookDetails;
