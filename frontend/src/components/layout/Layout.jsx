import React from "react";
import { Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container component="main" className="flex-grow py-8">
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
