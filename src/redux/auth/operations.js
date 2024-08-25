import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://contacts-6ig8.onrender.com";
// axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;


const setAuthHeader = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", newUser);
      setAuthHeader(response.data.data.accessToken);
      
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await axios.post("/auth/login", user);
    setAuthHeader(response.data.data.accessToken);

    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const savedToken = thunkAPI.getState().auth.token;
      
      setAuthHeader(savedToken);
      const response = await axios.post("/auth/refresh");
      setAuthHeader(response.data.data.accessToken);
      
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition(_, thunkAPI) {
      const savedToken = thunkAPI.getState().auth.token;
      return savedToken !== null;
    },
  }
);
