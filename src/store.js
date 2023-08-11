// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

// Initial state
const initialState = {
  greeting: "",
};

// Action types
const SET_GREETING = "SET_GREETING";

// Action creators
export const setGreeting = (greeting) => ({
  type: SET_GREETING,
  greeting,
});

// Thunk to fetch random greeting from API
export const fetchRandomGreeting = () => async (dispatch) => {
  try {
    const response = await axios.get("http://127.0.0.1:3000/api/random_greeting");
    const randomGreeting = response.data;
    dispatch(setGreeting(randomGreeting));
  } catch (error) {
    console.error("Error fetching random greeting:", error);
  }
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GREETING:
      return { ...state, greeting: action.greeting };
    default:
      return state;
  }
};

// Store
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});

export default store;
