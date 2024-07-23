import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Replace with your API URL
});

api.setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Intercept 401 responses and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem("token");
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
