import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import Layout from '../components/layout/Layout';
import useBooks from '../hooks/useBooks';
import useWishlist from '../hooks/useWishlist';

const HomePage = () => {
  const { books } = useBooks();
  const { wishlistItems } = useWishlist();

  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Book Tracker
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Books Read
              </Typography>
              <Typography variant="h3">{books.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Books in Wishlist
              </Typography>
              <Typography variant="h3">{wishlistItems.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;