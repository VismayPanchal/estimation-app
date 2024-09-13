import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { login_url } from '../Constants'
import { logindata,UserResponse } from '../Types'

export const registerUser = createAsyncThunk<UserResponse | null, logindata>(
  'auth/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post<UserResponse>(
        `${login_url}`,
        { email, password },
        config
      );

      return response.data; // Return the response data

    } catch (err) {
      const error = err as AxiosError;

      if (error.response && error.response.data) {
        return rejectWithValue((error.response.data as { message: string }).message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk<UserResponse, logindata>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get<UserResponse[]>(login_url, {
        params: { email, password } 
      });

      const user = response.data.find(user => user.email === email && user.password === password);
      if (!user) {
        return rejectWithValue('Invalid email or password');
      }

      return user; 

    } catch (err) {
      const error = err as AxiosError;

      if (error.response && error.response.data) {
        return rejectWithValue((error.response.data as { message: string }).message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);