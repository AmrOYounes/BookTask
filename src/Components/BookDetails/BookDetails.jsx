
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
import {Link} from 'react-router-dom';
import './bookDetails.stye.scss';
 
 const BookDetails = ({handledisableTab, handleSelectTab, handleFillOrderInfo, reservedBook,id}) => {
   
    const dateElement = useRef();
     console.log(reservedBook)
    const[Book, setBook] = useState(reservedBook);
    const[bookIDs, setBookIDs] = useState([]);
    const[selectedId, setSelectedID] = useState({});
    const[searchById, setSearchById] = useState('');
    const[numberOfUnits, setNumberOfUnits] = useState('');
    const[showError, setShowError] = useState(false);
   console.log(Book,id);
     

  //  useEffect(()=> {
  //   console.log(id, searchById)
  //   getBookByIdOrTitle({ BOOK_id: id }).then(res => {
  //   const book = res.data[0];
  //   console.log(book)
  //   setBook({
  //       Book_id: {label: book.Book_id },
  //       publisher: book.publisher.Publisher_name,
  //       Publish_date: book.Publish_date,
  //       author: `${book.author.First_name} ${book.author.Last_name}`,
  //       Available_units: book.Available_units,
  //       Unit_price: book.Unit_price,
  //       numberOFUnits: '',
  //     });
  //  })
  
  // },[]);
   

  const onInputChange = (e,value) => {
   console.log(e,value)
   setBook({
    ...Book,
    Book_id: {label: value}
   })
   setSearchById(value);
   if(value){
   getBookByIdOrTitle({ BOOK_id: value}).then(res => {
      const modifiedBooks = res.data.map(book => ({ ...book, label: `${book.Book_id}`}))
      console.log(modifiedBooks)
      setBookIDs(modifiedBooks);
   })
  }
    }

    const handleChange = (e)=> {
      console.log(e.target.value);
       const {name, value, id} = e.target; 
        if( (+value) < 0 || (+value) > +(reservedBook.Available_units)){
            setNumberOfUnits('');
            setShowError(true);
        }else{
            console.log(value)
            // setNumberOfUnits(value);
            setBook({
              ...Book,
              numberOFUnits: value
            })
            handleFillOrderInfo({numberOFUnits: value})
            setShowError(false);
        }
       
     }

          const handleselect = (event, value) => {
            console.log(value);
            const book = value;
            setSelectedID(value)
            // setBook(value)
                // setBook(value);
                // console.log(value)
                handleFillOrderInfo({
                  Book_id: {label: book.Book_id },
                  publisher: book.publisher.Publisher_name,
                  Publish_date: book.Publish_date,
                  author: `${book.author.First_name} ${book.author.Last_name}`,
                  Available_units: book.Available_units,
                  Unit_price: book.Unit_price,
                  numberOFUnits: '',
                });
               
          }

          const hanldeSave = () => {
            console.log(reservedBook.numberOfUnits);
            if(reservedBook.numberOFUnits ){
            const bookReserved = {...Book, numberOfUnits }
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
          getOptionLabel={(bookIDs) => bookIDs.label}
          options={bookIDs}
          onInputChange={onInputChange}
          sx={{ width: 300 }}
          // value={selectedId || ''}
          defaultValue={{label: id}}
         renderInput={(params) => <TextField   {...params} label="search by ID" />}
    />
       </Grid>
        </Grid>
      </Grid>

      {/* <Grid item xs={12} marginBottom={3} marginTop={10}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
          <label>Book Title </label> 
          </Grid>
          <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
          <Autocomplete
          onChange={handleselect}
          id="autoCompleteIds"
          getOptionLabel={(bookIDs) => bookIDs.label}
          options={bookIDs}
          onInputChange={onInputChange}
          sx={{ width: 300 }}
          // value={selectedId || ''}
          defaultValue={{label: id}}
         renderInput={(params) => <TextField   {...params} label="search by ID" />}
    />
       </Grid>
        </Grid>
      </Grid> */}

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
          <TextField value={reservedBook.publisher}  id="outlined-basic"   name='bookPublisher' fullWidth variant="outlined"  className='gray-background'  />
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
          value={ reservedBook.Publish_date || null}
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
          <TextField value={reservedBook.author} className='gray-background' id="outlined-basic"  name='bookAuthor' fullWidth variant="outlined"   />
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
          <TextField  value={reservedBook.Available_units} className='gray-background' id="outlined-basic"  fullWidth variant="outlined" type='number' name='availableUnits'   />
       </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} marginBottom={3}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={3} style={{maxWidth:'114px'}}>
          <label>Unit Price </label> 
          </Grid>
          <Grid item xs={8} md={6} style={{maxWidth:'470px'}} >
          <TextField   value={reservedBook.Unit_price} className='gray-background'   id="outlined-basic"  name='unitPrice' fullWidth variant="outlined" type='number'
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
          <TextField  value={reservedBook.numberOFUnits} type='number' onChange={handleChange}  id="outlined-basic"   name='numberOFUnits' fullWidth variant="outlined"   />
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
        <Link to='/booksearch'><Button variant='contained'sx={{marginLeft:'30px'}} >Back to search</Button></Link>
        </Grid>
      </Grid>

    </Grid>
  )
}

export default BookDetails;
