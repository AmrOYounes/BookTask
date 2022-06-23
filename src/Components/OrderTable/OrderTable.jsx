import React,{useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { Button, Grid } from '@mui/material';


const OrderTable = ({orders, count, rowsPerPage, handleSearch}) => {
  console.log(orders);
  const [page, setPage] = useState(1);
  const  handleChangePage = (event, value) => {
   console.log(value)
   setPage(value);
   handleSearch(value);
    }
  return (
    <Grid container justifyContent='center'> 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Book title</TableCell>
            <TableCell align="right">Publisher</TableCell>
            <TableCell align="right">Purchase Date</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Purchased Units</TableCell>
            <TableCell align="right">Total Cost</TableCell>
            <TableCell align="right">Buyer name</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.Book_id}
              </TableCell>
              <TableCell align="right">{order.book.Book_title}</TableCell>
              <TableCell align="right">{order.book.Book_publisher}</TableCell>
              <TableCell align="right">{order.purchaseDate}</TableCell>
              <TableCell align="right">{order.book.Book_author}</TableCell>
              <TableCell align="right">{order.numberOfUnits}</TableCell>
              <TableCell align="right">{order.totalPrice}</TableCell>
              <TableCell align="right">{order.buyerName}</TableCell>
              <TableCell align="right"> TOB</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Stack spacing={2}>
    <Pagination count={Math.ceil(count/rowsPerPage)} page={page} variant="outlined" shape="rounded" onChange={handleChangePage} />
  </Stack>
  </Grid>
  )
}

export default OrderTable ;
