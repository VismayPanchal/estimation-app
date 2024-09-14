import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { base_url } from '../Constants'
import { ProjectData, UserResponse } from '../Types'

export const createEstimation = createAsyncThunk<UserResponse | null, ProjectData>(
  'estimation/create',
  async (projectData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post<UserResponse>(
        `${base_url}/estimations`,
        JSON.stringify(projectData),
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

export const fetchAllEstimations =  createAsyncThunk('estimation/fetchAll', async () => {
  const response = await axios.get(`${base_url}/estimations`);
  return response.data;
});
