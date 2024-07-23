import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const WishlistItem = ({ item }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardMedia
        component="img"
        height="140"
        image={item.coverImage}
        alt={item.title}
        className="h-48 object-cover"
      />
      <CardContent className="flex-grow">
        <Typography gutterBottom variant="h6" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          By {item.author}
        </Typography>
      </CardContent>
      <Button size="small" color="primary">
        Mark as Read
      </Button>
      <Button size="small" color="secondary">
        Remove
      </Button>
    </Card>
  );
};

export default WishlistItem;
