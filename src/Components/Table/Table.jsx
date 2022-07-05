import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { Link, NavLink } from "react-router-dom";
import { Button, Grid } from "@mui/material";

const BookTable = ({ books, count, rowsPerPage, handleSearch }) => {
  const [page, setPage] = useState(1);
  const handleChangePage = (event, value) => {
    setPage(value);
    handleSearch(value);
  };

  const getTags = (tags) => {
    const temp = [];
    tags.forEach((tag, index) => {
      temp.push(tag.Tag_name);
    });
    return temp.join();
  };
  return (
    <Grid container justifyContent="center">
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Publisher</TableCell>
              <TableCell align="right">Publish Date</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">Tags</TableCell>
              <TableCell align="right">Availalbe Units</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Reserve</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book.Book_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {book.Book_id}
                </TableCell>
                <TableCell align="right">{book.Book_title}</TableCell>
                <TableCell align="right">
                  {book.publisher.Publisher_name}
                </TableCell>
                <TableCell align="right">{book.Publish_date}</TableCell>
                <TableCell align="right">
                  {book.author.First_name + "" + book.author.Last_name}
                </TableCell>
                <TableCell align="right">{getTags(book.tag)}</TableCell>
                <TableCell align="right">{book.Available_units}</TableCell>
                <TableCell align="right">{book.Unit_price}</TableCell>
                <TableCell align="right">
                  {" "}
                  <Button
                    disabled={+book.Available_units ? false : true}
                    variant="contained"
                  >
                    <Link to={`/BookReserve/${book.Book_id}`}>Reserve</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(count / rowsPerPage)}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
        />
      </Stack>
    </Grid>
  );
};
export default BookTable;
