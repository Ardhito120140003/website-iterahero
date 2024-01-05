import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');
const decoded = token ? jwtDecode(token) : null;
const isExpired = decoded ? decoded.exp < Date.now() / 1000 : true;

if (isExpired) {
  localStorage.clear('token');
}
const role = decoded ? decoded.role : null;

const userSlice = createSlice({
  name: 'iterahero',
  initialState: {
    accessToken: isExpired ? null : token,
    role,
    routeName: null,
    // fetchUrl: "https://iterahero2023.fly.dev/",
    fetchUrl: "https://iterahero-e1a0e90da51e.herokuapp.com/",
    // fetchUrl: "http://localhost:3000/"
  },
  reducers: {
    login: (state, action) => {
      state.role = jwtDecode(action.payload.accessToken).role;
      state.accessToken = action.payload.accessToken;
      state.routeName = 'Dashboard'
    },
    logout: (state) => {
      localStorage.clear()
      state.role = null;
      state.accessToken = null;
      state.routeName = null;
    },
    routePageName: (state, action) => {
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
