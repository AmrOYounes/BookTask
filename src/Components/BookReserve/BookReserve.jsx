import React,{useState,useEffect} from 'react';
import { Grid } from '@mui/material';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BookDetails from '../BookDetails';
import BuyerDetails from '../BuyerDetails';
import PaymentDetails from '../PaymentDeatails';
import { useParams } from "react-router-dom";
import {getBookByIdOrTitle} from '../../Actions/APIs/BookAPI';
import 'react-tabs/style/react-tabs.scss';



const BookReserve = () => {
  const {id} = useParams();
  const [buyerTab, setBuyerTab] = useState(true);
  const [paymentTab, setPaymentTab] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [reservedBook, setReservedBook] = useState({});
  
  const resetBookFields = ()=> {
  //   const temp = reservedBook;
  //  for( let key in temp){
  //   reservedBook[key] = ''
  //  }
  //  temp['Book_id'] = {label: '', value: ''};
   setReservedBook({
    ...reservedBook,
    numberOFUnits: '',
   })
  }

  // const getBookInformation = () => {

  // }

  useEffect(()=>{
    getBookByIdOrTitle({BOOK_id: id }).then(result => {
      const book = result.data[0];
      setReservedBook({
        ...reservedBook,
        Book_id: {label: `${book.Book_id}` },
        Book_title:  {label: `${book.Book_title}`},
        publisher: book.publisher.Publisher_name,
        Publish_date: book.Publish_date,
        author: `${book.author.First_name} ${book.author.Last_name}`,
        Available_units: book.Available_units,
        Unit_price: book.Unit_price,
        numberOFUnits: '',
      });
   })
    
    
  },[])


 

  const handledisableTab = (name) => {
     if(name === 'buyerTab') {
      setBuyerTab(false)
     }
     else{
      setPaymentTab(false)
     }
  }

  const handleSelectTab = (index) => {
    setTabIndex(index)
  }

  const handleFillOrderInfo = (info) => {
    const temp = {...reservedBook, ...info}
    setReservedBook(temp);
  }

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={6}  sx={{marginTop:'70px'}}>
      <Tabs selectedIndex={tabIndex} onSelect={handleSelectTab}>
    <TabList>
      <Tab>Book details</Tab>
      <Tab disabled={buyerTab} style={{marginLeft:'40px'}}>Buyer details</Tab>
      <Tab disabled={paymentTab} style={{marginLeft:'40px'}}>Payment details</Tab>
    </TabList>

    <TabPanel>
     <BookDetails id={id} reservedBook={reservedBook} handleFillOrderInfo={handleFillOrderInfo} handledisableTab={handledisableTab} handleSelectTab={handleSelectTab}/>
    </TabPanel>
    <TabPanel>
     <BuyerDetails reservedBook={reservedBook} handledisableTab={handledisableTab} handleFillOrderInfo={handleFillOrderInfo} handleSelectTab={handleSelectTab}/>
    </TabPanel>
    <TabPanel>
      <PaymentDetails resetBookFields={resetBookFields} reservedBook={reservedBook} handleFillOrderInfo={handleFillOrderInfo} handleSelectTab={handleSelectTab}/>
    </TabPanel>
  </Tabs>
      </Grid>
   
    </Grid>
  )
}

export default BookReserve;
