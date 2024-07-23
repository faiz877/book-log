import React from "react";
import { Container, Paper, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import RegisterForm from "../components/auth/RegisterForm";
import useAuth from "../hooks/useAuth";

const RegisterPage = () => {
  const { register } = useAuth();

  const handleRegister = (userData) => {
    register(userData);
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Paper elevation={3} className="p-6">
          <RegisterForm onSubmit={handleRegister} />
          <Typography variant="body2" className="mt-4 text-center">
            Already have an account?{" "}
            <MuiLink component={Link} to="/login">
              Login here
            </MuiLink>
          </Typography>
        </Paper>
      </Container>
    </Layout>
  );
};

export default RegisterPage;
