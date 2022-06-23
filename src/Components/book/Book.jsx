import { Grid, TextField, InputAdornment  } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import {NavLink} from 'react-router-dom';
import DialogTitle from '@mui/material/DialogTitle';
import {getPublishers, addPublisher,getAuthors, getCountries, addAuthor,addBook} from '../../Actions/APIs/BookAPI';
import './book.style.scss';
import { format } from 'date-fns';

const customStyles = {
  control: base => ({
    ...base,
    height: 55,
    minHeight: 35
  })
};

function Book() {
    const [bookPublisher, setBookPublisher] = useState([]);
    const[bookTags, setBookTags] = useState([]);
    const [bookAuthor, setBookAuthor] = useState([]);
    const [establishDate, setEstablishDate] = useState(null);
    const [publisherName, setPublisherName] = useState('');
    const [isWorking, setIsWorking] = useState(false);
    const [bookfile, setBookFile] = useState(null);
    const [publisherDialog, setPublisherDialog] = React.useState(false);
    const [publishDate, setPublishDate] = useState(null);
    const[availableUnits, setAvailableUnits] = useState(null);
    const[unitPrice, setUnitPrice] = useState(null);
    const [selectedPublisher, setSelectedPublisher] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [bookId, setBookId] = useState(null);
    const[bookTitle, setBookTitle] = useState('');
    const [authorDialog, setAuthorDialog] = React.useState(false);
    const[firstName, setFirstName]= useState('');
    const[middleName, setMiddleName]= useState('');
    const[lastName, setLastName]= useState('');
    const[birthDate, setBirthDate] = useState(null);
    const[deathDate, setDeathDate] = useState(null);
    const[countries, setCountries] = useState([]);
    const[website, setWebsite] = useState([]);
    const[selectedCountry, setSelectedCountry] = useState('');

    const handleClickOpen = (dialogName) => {
         if(dialogName === 'publisherDialog') {
          setPublisherDialog(true);
         }
         else{
          setAuthorDialog(true)
         }
    }

   const  handleAddNewPublisher = () => {
        const publisherParams = {
          Publisher_name: publisherName,
          Establish_date: establishDate,
          Is_working: isWorking
        }
        console.log(publisherParams);
        addPublisher(publisherParams).then( res => {
          handleClose('publisherDialog');
          getPublishers().then(res=>{
            return res.data.map(publisherObject => ({label: publisherObject.Publisher_name, value: publisherObject.Publisher_name}))
          }).then( response => {
            setBookPublisher(response);
          })
          console.log(res);
        })
    }

    const  handleAddAuthor = () => {
      const authorData = {
        First_name: firstName,
        Middle_name: middleName,
        Last_name: lastName,
        Birth_date: birthDate,
        Country_of_residence: selectedCountry,
        Death_date: deathDate,
        Offical_website: website
      }

      addAuthor(authorData).then(res=> console.log(res));
      handleClose('authorDialog')
      getAuthors().then(res=>{
        return res.data.map(authorObject => ({label: `${authorObject.First_name} ${authorObject.Last_name}`, value: `${authorObject.First_name} ${authorObject.Last_name}`}))
      }).then( response => {
        setBookAuthor(response);
      });
      console.log(authorData);
    }
    
    const handleClose = (dialogName) => {
      console.log(dialogName);
      if(dialogName === 'publisherDialog'){
        setPublisherDialog(false)
      }else{
        setAuthorDialog(false);
      }
    }

    const handleChange = (e) => {
      console.log(e);
      // console.log(e.target.value)
      const { name, value, checked } = e.target;
      switch(name) {
        case 'publisherName' :
          console.log(name,value)
          setPublisherName(value);
          break;
        case 'isWorking':
          console.log(checked);
          setIsWorking(checked);
          break;
        case 'fName' : 
          setFirstName(value);
          break;
        case 'mName' : 
          setMiddleName(value);
          break;
          case 'lName' : 
            setLastName(value);
            break;
          case 'website' :
            setWebsite(value);    
            break;
          case 'availableUnits':
            setAvailableUnits(value);
            break;  
          case 'unitPrice' :
            setUnitPrice(value);
            break;  
          case 'bookId': 
          setBookId(value);
          break;
         case 'bookTitle' : 
         setBookTitle(value);
         break; 
      }
     
    }

  const   handleChangeDate = (newValue, name) => {
      console.log(newValue, name);
      const formatedDate = format(newValue,'yyyy-MM-dd');
       switch(name){
        case 'birthDate':
        setBirthDate(formatedDate);
        break;
       case 'deathDate':
        setDeathDate(formatedDate);
        break;
       }
    }

    const handleChangeSelectedValue = (newValue, name ) => {
      console.log(newValue,name)
        switch(name){
          case 'country' :
            setSelectedCountry(newValue.label);
            break;
          case 'bookPublisher': 
          setSelectedPublisher(newValue.label);  
          break;
         case 'bookAuthor': 
         setSelectedAuthor(newValue.label);
         break; 
        }
    }

    const handleChangeEstablishTime =  newValue => {
       const formatedDate = format(newValue,'yyyy-MM-dd');
       console.log(formatedDate);
      setEstablishDate(formatedDate);
      console.log(newValue);
    }

    const handleChangePublishDate = newValue => {
      const formatedDate = format(newValue,'yyyy-MM-dd');
      console.log(formatedDate);
      setPublishDate(formatedDate);
    }

    const handleSubmitBook = () => {
      const formData = new FormData();
      formData.append('Available_units',availableUnits);
      formData.append('Book_author', selectedAuthor);
      formData.append('Book_id',bookId);
      formData.append('Book_path',bookfile);
      formData.append('Book_publisher',selectedPublisher);
      formData.append('Book_title',bookTitle);
      formData.append('Publish_date',publishDate);
      formData.append('Unit_price',unitPrice);
      formData.append('tags', bookTags.join())

      addBook(formData).then( res => {
         setBookId('');
         setBookTitle('');
         setPublishDate(null);
         setBookTags([]);
         setAvailableUnits('');
         setUnitPrice('')
      });
      
    }

    const hanldeFileUpload = (e) => {
        let file = e.target.files[0];
        console.log(file);
        setBookFile(file);
    }
    const handleTags = (tags) => {
      console.log(tags);
       setBookTags(tags);
    }
    useEffect( ()=> {
       
      getCountries().then( res => {
        return res.map(country => ({label: country.name.common, value: country.name.common}))
      }).then( response => {
        console.log(response);
        setCountries(response);
      })

      getPublishers().then(res=>{
        return res.data.map(publisherObject => ({label: publisherObject.Publisher_name, value: publisherObject.Publisher_name}))
      }).then( response => {
        setBookPublisher(response);
      });

      getAuthors().then(res=>{
        return res.data.map(authorObject => ({label: `${authorObject.First_name} ${authorObject.Last_name}`, value: `${authorObject.First_name} ${authorObject.Last_name}`}))
      }).then( response => {
        setBookAuthor(response);
      });
     
    },[])
     
  return (
    <Grid container justifyContent='center'  className='book-container'>
        
        {/* Publisher dialig  */}
        <Dialog open={publisherDialog} onClose={() => handleClose('publisherDialog')}>
        <DialogTitle>Add new publisher</DialogTitle>
        <DialogContent>
           <label>Publisher name</label>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name='publisherName'
            type="text"
            fullWidth
            variant='outlined'
            onChange={ handleChange}
          />
           <label>Establish date</label>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          
          inputFormat="yyyy-MM-dd"
          value={establishDate}
          onChange={handleChangeEstablishTime}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
    <FormControlLabel control={<Checkbox  name='isWorking' checked={isWorking} inputProps={{ 'aria-label': 'controlled' }}
     onChange={handleChange} />} label="Still working ?" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddNewPublisher}  variant='contained'>Add</Button>
          <Button onClick={() => handleClose('publisherDialog')}>Cancel</Button>
        </DialogActions>
      </Dialog>



        {/* Author Dialog */}
      <Dialog open={authorDialog} onClose={() => handleClose('authorDialog')} fullWidth>
        <DialogTitle>Add new Author</DialogTitle>
        <DialogContent>
           
          <Grid container justifyContent='center' spacing={2}>
          <Grid item xs={4}>
          <label>First name</label>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name='fName'
            type="text"
            fullWidth
            variant='outlined'
            onChange={ handleChange}
          />
          </Grid>
          <Grid item xs={4}>
          <label>Middle name</label>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name='mName'
            type="text"
            fullWidth
            variant='outlined'
            onChange={ handleChange}
          />
          </Grid>

          <Grid item xs={4}>
          <label>Last name</label>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name='lName'
            type="text"
            fullWidth
            variant='outlined'
            onChange={handleChange}
          />
          </Grid>
          </Grid>

          <Grid container justifyContent='center' spacing={2}>
          <Grid item xs={6}>
          <label>Birth of  date</label>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          inputFormat="yyyy-MM-dd"
          value={birthDate}
          onChange={(newValue)=>handleChangeDate(newValue,'birthDate')}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <label>Country of residance</label>
          <Select styles={customStyles} options={countries} onChange={ (newValue)=>handleChangeSelectedValue(newValue,'country')}/>
          </Grid>
          </Grid>
      
      <Grid container justifyContent='center' spacing={2}>
       <Grid item xs={6}>
        <label>Death date</label>
       <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          
          inputFormat="yyyy-MM-dd"
          value={deathDate}
          onChange={(newValue)=>handleChangeDate(newValue,'deathDate')}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
       </Grid>
       <Grid item xs={6}>
       <label>Offical website</label>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name='website'
            type="text"
            fullWidth
            variant='outlined'
            onChange={ handleChange}
          />
        </Grid>
      </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddAuthor}  variant='contained'>Add</Button>
          <Button onClick={() => handleClose('authorDialog')}>Cancel</Button>
        </DialogActions>
      </Dialog>



      <Grid item xs={12} textAlign='center' className='header-title'>
      <h3>ADD NEW BOOK</h3>
      </Grid>
      <Grid item xs={12} marginBottom={3} marginTop={10}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={1} style={{maxWidth:'114px'}}>
          <label>Book ID </label> 
          </Grid>
          <Grid item xs={8} md={4} style={{maxWidth:'470px'}} >
          <TextField id="outlined-basic" value={bookId} label="Outlined" name='bookId' fullWidth variant="outlined" onChange={handleChange}  />
       </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} marginBottom={3}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={1} style={{maxWidth:'114px'}}>
          <label>Book title </label> 
          </Grid>
          <Grid item xs={8} md={4} style={{maxWidth:'470px'}} >
          <TextField id="outlined-basic" label="Outlined" name='bookTitle' value={bookTitle} fullWidth variant="outlined" onChange={handleChange} />
       </Grid>
        </Grid>
      </Grid>
      
        <Grid item xs={12} marginBottom={3}>
          <Grid container justifyContent='center'>  
          <Grid item xs={3} md={1} style={{maxWidth:'114px'}}>
          <label>Book Publisher </label> 
          </Grid>
       <Grid item   xs={7} md={3}style={{maxWidth:'400px'}} >
       <Select styles={customStyles} options={bookPublisher} onChange={ (newValue)=>handleChangeSelectedValue(newValue,'bookPublisher')} />
       </Grid>
       <Grid item xs={1}   style={{maxWidth:'70px'}}>
       <IconButton aria-label="delete" onClick={()=> handleClickOpen('publisherDialog')}>
        <AddCircleOutlineIcon />
      </IconButton>
       </Grid>
       </Grid>

        </Grid>
       
        <Grid item xs={12} marginBottom={3}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={1} style={{maxWidth:'114px'}}>
          <label>Publish date </label> 
          </Grid>
          <Grid item xs={8} md={4} style={{maxWidth:'470px'}} >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          
          inputFormat="yyyy-MM-dd"
          value={publishDate}
          onChange={handleChangePublishDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
       </Grid>
        </Grid>
      </Grid>
           
      <Grid item xs={12} marginBottom={3}>
          <Grid container justifyContent='center'>  
          <Grid item xs={3} md={1} style={{maxWidth:'114px'}}>
          <label>Book Author </label> 
          </Grid>
       <Grid item xs={7} md={3} style={{maxWidth:'400px'}} >
       <Select styles={customStyles} options={bookAuthor} onChange={ (newValue)=>handleChangeSelectedValue(newValue,'bookAuthor')} />
       </Grid>
       <Grid item xs={1} style={{maxWidth:'70px'}}>
       <IconButton aria-label="delete" onClick={()=> handleClickOpen('authorDialog')}>
        <AddCircleOutlineIcon />
      </IconButton>
       </Grid>
       </Grid>
        </Grid>  

        <Grid item xs={12} marginBottom={3}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={1} style={{maxWidth:'114px'}}>
          <label>Book PDF </label> 
          </Grid>
          <Grid item xs={8} md={4} style={{maxWidth:'470px'}} >
           <input type="file" name="Book" id="book-pdf" onChange={hanldeFileUpload}/>
       </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} marginBottom={3}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={1} style={{maxWidth:'114px'}}>
          <label>Book tags </label> 
          </Grid>
          <Grid item xs={8} md={4} style={{maxWidth:'470px'}} >
           <TagsInput   value={bookTags}  onChange={handleTags}/>
       </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} marginBottom={3}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={1} style={{maxWidth:'114px'}}>
          <label>Available Units </label> 
          </Grid>
          <Grid item xs={8} md={4} style={{maxWidth:'470px'}} >
          <TextField id="outlined-basic"  fullWidth variant="outlined" type='number' name='availableUnits' onChange={handleChange}  value={availableUnits} />
       </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} marginBottom={3}>
        <Grid container justifyContent='center'>
        <Grid item xs={3} md={1} style={{maxWidth:'114px'}}>
          <label>Unit Price </label> 
          </Grid>
          <Grid item xs={8} md={4} style={{maxWidth:'470px'}} >
          <TextField  value={unitPrice} onChange={handleChange} id="outlined-basic"  name='unitPrice' fullWidth variant="outlined" type='number'
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
        <Button variant="contained" onClick={handleSubmitBook}>Submit book</Button>
        </Grid>
      </Grid>

      <Button variant='contained'>
      <NavLink to='/booksearch'>Search</NavLink>
      </Button>
     
      
    </Grid>
  )
}

export default Book;