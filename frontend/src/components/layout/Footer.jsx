import React from "react";
import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 mt-auto">
      <Typography variant="body2" color="textSecondary" align="center">
        © {new Date().getFullYear()} Book Tracker. All rights reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
