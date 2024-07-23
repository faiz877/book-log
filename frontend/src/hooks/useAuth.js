import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import useAuthStore from "../store/authStore";

const useAuth = () => {
  const navigate = useNavigate();
  const { setUser, clearUser } = useAuthStore();

  const login = useCallback(
    async (credentials) => {
      try {
        const response = await api.post("/auth/login", credentials);
        const { user, token } = response.data;
        setUser(user);
        localStorage.setItem("token", token);
        api.setAuthToken(token);
        navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
        // Handle login error (e.g., show error message to user)
      }
    },
    [setUser, navigate]
  );

  const register = useCallback(
    async (userData) => {
      try {
        const response = await api.post("/auth/register", userData);
        const { user, token } = response.data;
        setUser(user);
        localStorage.setItem("token", token);
        api.setAuthToken(token);
        navigate("/");
      } catch (error) {
        console.error("Registration failed:", error);
        // Handle registration error (e.g., show error message to user)
      }
    },
    [setUser, navigate]
  );

  const logout = useCallback(() => {
    clearUser();
    localStorage.removeItem("token");
    api.setAuthToken(null);
    navigate("/login");
  }, [clearUser, navigate]);

  return { login, register, logout };
};

export default useAuth;
