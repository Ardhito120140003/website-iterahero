import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendUrl = 'http://localhost:8000/api/v1';

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ username, email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            axios.post(`${backendUrl}/register`,
            { username, email, password },
            config)
        } 
        catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
              } else {
                return rejectWithValue(error.message)
              }
        }
    }
)