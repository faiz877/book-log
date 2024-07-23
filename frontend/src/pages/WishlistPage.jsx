import React, { useState } from "react";
import { Typography, Button, Dialog, DialogContent } from "@mui/material";
import Layout from "../components/layout/Layout";
import WishlistList from "../components/wishlist/WishlistList";
import WishlistForm from "../components/wishlist/WishlistForm";
import useWishlist from "../hooks/useWishlist";

const WishlistPage = () => {
  const { wishlistItems, addWishlistItem } = useWishlist();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleAddWishlistItem = (itemData) => {
    addWishlistItem(itemData);
    handleCloseDialog();
  };

  return (
    <Layout>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Wishlist
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add to Wishlist
      </Button>
      <WishlistList wishlistItems={wishlistItems} />
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogContent>
          <WishlistForm onSubmit={handleAddWishlistItem} />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default WishlistPage;
