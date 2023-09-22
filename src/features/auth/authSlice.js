import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";


const token = localStorage.getItem('token');
const currentRole = token ? jwtDecode(token).role : null

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: token,
        role: currentRole,
        routeName: "Dashboard"
    },
    reducers: {
        login: (state, action) => {
            state.role = action.payload.role;
            state.accessToken = action.payload.accessToken;
        },
        logout: (state) => {
            state.role = null;
            state.accessToken = null;
            state.routeName = "Dashboard"
        },
        routePageName: (state, action) => {
            state.routeName = action.payload
        }
    }
})

export const { login, logout, routePageName } = userSlice.actions;

export const selectUser = (state) => state.auth.role;
export const selectToken = (state) => state.auth.accessToken;
export const selectRoute = (state) => state.auth.routeName;

export default userSlice.reducer;