import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, GET_USER } from "./types";
import setJWToken from "../securityUtils/setJWToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    await axios.post("/api/users/register", newUser);
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const login = loginRequest => async dispatch => {
  try {
    const res = await axios.post("/api/users/login", loginRequest);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setJWToken(token);
    const decoded = jwt_decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const logout = () => async dispatch => {
  localStorage.removeItem("jwtToken");
  setJWToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};

export const getUser = username => async dispatch => {
  try {
    const res = await axios.get(`/api/users/profile/${username}`);
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
