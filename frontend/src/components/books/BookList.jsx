import React from "react";
import { Grid, Typography } from "@mui/material";
import BookItem from "./BookItem";

const BookList = ({ books }) => {
  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Your Books
      </Typography>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <BookItem book={book} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BookList;
