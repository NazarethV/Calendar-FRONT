import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/auth';

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    // Almacena el token en localStorage
    localStorage.setItem("token", response.data.token);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data.token });
  } catch (error) {
    console.error("Error en login:", error);
    dispatch({ type: "LOGIN_FAILURE", payload: error.response?.data?.message || error.message });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Error en register:", error);
    dispatch({ type: "REGISTER_FAILURE", payload: error.response?.data?.message || error.message });
  }
};
