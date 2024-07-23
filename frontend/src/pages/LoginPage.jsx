import React from "react";
import { Container, Paper, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import LoginForm from "../components/auth/LoginForm";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();

  const handleLogin = (credentials) => {
    login(credentials);
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Paper elevation={3} className="p-6">
          <LoginForm onSubmit={handleLogin} />
          <Typography variant="body2" className="mt-4 text-center">
            Don't have an account?{" "}
            <MuiLink component={Link} to="/register">
              Register here
            </MuiLink>
          </Typography>
        </Paper>
      </Container>
    </Layout>
  );
};

export default LoginPage;
