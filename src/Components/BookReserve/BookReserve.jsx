import { Grid } from '@mui/material';
import React,{useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BookDetails from '../BookDetails';
import BuyerDetails from '../BuyerDetails';
import PaymentDetails from '../PaymentDeatails';
import 'react-tabs/style/react-tabs.scss';



const BookReserve = () => {
  const [buyerTab, setBuyerTab] = useState(true);
  const [paymentTab, setPaymentTab] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [reservedBook, setReservedBook] = useState({});

  const handledisableTab = (name) => {
     if(name === 'buyerTab') {
      setBuyerTab(false)
     }
     else{
      setPaymentTab(false)
     }
  }

  const handleSelectTab = (index) => {
    console.log(index);
    setTabIndex(index)
  }

  const handleFillOrderInfo = (info) => {
    const temp = {...reservedBook, ...info}
    console.log(temp)
    setReservedBook(temp);
  }

  return (
    <Grid container justifyContent='center'>
      <Grid item xs={6}>
      <Tabs selectedIndex={tabIndex} onSelect={handleSelectTab}>
    <TabList>
      <Tab>Book details</Tab>
      <Tab disabled={buyerTab} style={{marginLeft:'40px'}}>Buyer details</Tab>
      <Tab disabled={paymentTab} style={{marginLeft:'40px'}}>Payment details</Tab>
    </TabList>

    <TabPanel>
     <BookDetails reservedBook={reservedBook} handleFillOrderInfo={handleFillOrderInfo} handledisableTab={handledisableTab} handleSelectTab={handleSelectTab}/>
    </TabPanel>
    <TabPanel>
     <BuyerDetails reservedBook={reservedBook} handledisableTab={handledisableTab} handleFillOrderInfo={handleFillOrderInfo} handleSelectTab={handleSelectTab}/>
    </TabPanel>
    <TabPanel>
      <PaymentDetails reservedBook={reservedBook} handleFillOrderInfo={handleFillOrderInfo}/>
    </TabPanel>
  </Tabs>
      </Grid>
   
    </Grid>
  )
}

export default BookReserve;
