import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const token = localStorage.getItem("token");
const currentRole = token ? jwtDecode(token).role : null;

const userSlice = createSlice({
  name: "iterahero",
  initialState: {
    accessToken: token,
    role: currentRole,
    routeName: "Dashboard",
    fetchUrl: "http://localhost:8000/"
      // currentRole === "admin"
      //   ? "https://iterahero.fly.dev/"
      //   : currentRole === "operator"
      //   ? "https://iterahero-e1a0e90da51e.herokuapp.com/"
      //   : "",
  },
  reducers: {
    login: (state, action) => {
      console.log(jwtDecode(action.payload.accessToken))
      state.role = jwtDecode(action.payload.accessToken).role;
      state.accessToken = action.payload.accessToken;
      // if (state.role === "operator") {
      //   state.fetchUrl = "https://iterahero-e1a0e90da51e.herokuapp.com/";
      // } else if (state.role === "admin" ) {
      //   state.fetchUrl = "https://iterahero.fly.dev/";
      // }
    },
    logout: (state) => {
      state.role = null;
      state.accessToken = null;
      state.routeName = "Dashboard";
    },
    routePageName: (state, action) => {
      console.log(action.payload);
      state.routeName = action.payload;
    },
  },
});

export const { login, logout, routePageName } = userSlice.actions;

export const selectUser = (state) => state.iterahero.role;
export const selectToken = (state) => state.iterahero.accessToken;
export const selectRoute = (state) => state.iterahero.routeName;
export const selectUrl = (state) => state.iterahero.fetchUrl;

export default userSlice.reducer;
