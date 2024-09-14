import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { base_url } from '../Constants'
import { ProjectData, UserResponse } from '../Types'

export const createProject = createAsyncThunk<UserResponse | null, ProjectData>(
  'project/create',
  async (projectData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post<UserResponse>(
        `${base_url}/projects`,
        projectData,
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

export const fetchAllProject =  createAsyncThunk('project/fetchAll', async () => {
  const response = await axios.get(`${base_url}/projects`);
  return response.data;
});
