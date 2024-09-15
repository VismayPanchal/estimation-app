import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { base_url } from '../Constants'
import { logindata, UserResponse } from '../Types'

export const registerUser = createAsyncThunk<UserResponse | null, logindata>(
  'auth/register',
  async ({ email, password, user }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post<UserResponse>(
        `${base_url}/users`,
        { email, password, user },
        config
      );
      localStorage.setItem('user', JSON.stringify(response.data));  // Save to localStorage

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
      const response = await axios.get<UserResponse[]>(base_url + '/users', {
        params: { email, password }
      });

      const user = response.data.find(user => user.email === email && user.password === password);
      if (!user) {
        return rejectWithValue('Invalid email or password');
      }
      localStorage.setItem('user', JSON.stringify(response.data));  // Save to localStorage


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