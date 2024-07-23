import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static" className="bg-primary-900">
      <Toolbar className="justify-between">
        <Typography
          variant="h6"
          component={Link}
          to="/"
          className="text-white no-underline"
        >
          Book Tracker
        </Typography>
        <div>
          <Button color="inherit" component={Link} to="/books">
            Books
          </Button>
          <Button color="inherit" component={Link} to="/wishlist">
            Wishlist
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
