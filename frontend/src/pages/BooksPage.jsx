import React, { useState } from "react";
import { Typography, Button, Dialog, DialogContent } from "@mui/material";
import Layout from "../components/layout/Layout";
import BookList from "../components/books/BookList";
import BookForm from "../components/books/BookForm";
import useBooks from "../hooks/useBooks";

const BooksPage = () => {
  const { books, addBook } = useBooks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleAddBook = (bookData) => {
    addBook(bookData);
    handleCloseDialog();
  };

  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Books
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add New Book
      </Button>
      <BookList books={books} />
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <BookForm onSubmit={handleAddBook} />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default BooksPage;
