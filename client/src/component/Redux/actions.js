import axios from "axios";

import { toast } from "react-toastify";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from "./ActionTypes";

const API_BASE_URL = process.env.REACT_APP_BACKEND;
console.log(API_BASE_URL);

// login -----------Code With return --ok
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    const { token, user } = response.data;
    localStorage.setItem("jwt", token);
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFailure(error.message));
    toast.error("Invalid credentials", { position: "top-right" });
  }
};

// Register -----------Code With return --ok
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = () => ({ type: REGISTER_SUCCESS });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    dispatch(registerSuccess());
    toast.success("User created successfully", { position: "top-right" });
  } catch (error) {
    dispatch(registerFailure(error.message));
    toast.error("Error creating user", { position: "top-right" });
  }
};

// Get user -----------Code With return --ok
export const getUserRequest = () => ({ type: GET_USER_REQUEST });
export const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});
export const getUserFailure = (error) => ({
  type: GET_USER_FAILURE,
  payload: error,
});

export const getUser = () => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const token = localStorage.getItem("jwt");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(getUserSuccess(response.data));
  } catch (error) {
    console.error("Error fetching user:", error);
    dispatch(getUserFailure(error.message));
  }
};

// Logout -----------Code With remove --ok
export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT });
};
