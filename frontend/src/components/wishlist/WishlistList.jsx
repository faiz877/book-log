import React from 'react';
import { Grid, Typography } from '@mui/material';
import WishlistItem from './WishlistItem';

const WishlistList = ({ wishlistItems }) => {
  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Your Wishlist
      </Typography>
      <Grid container spacing={3}>
        {wishlistItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <WishlistItem item={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WishlistList;