import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const BookItem = ({ book }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardMedia
        component="img"
        height="140"
        image={book.coverImage}
        alt={book.title}
        className="h-48 object-cover"
      />
      <CardContent className="flex-grow">
        <Typography gutterBottom variant="h6" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          By {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Read on: {new Date(book.dateRead).toLocaleDateString()}
        </Typography>
      </CardContent>
      <Button size="small" color="primary">
        Edit
      </Button>
    </Card>
  );
};

export default BookItem;
