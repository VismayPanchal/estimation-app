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

export const fetchEstimationByid = createAsyncThunk(
  'estimation/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/estimations/${id}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;

      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateEstimation = createAsyncThunk(
  'estimation/updateEstimation',
  async (projectData: ProjectData) => {
    const response = await axios.put(`${base_url}/estimations/${projectData.id}`, projectData);
    return response.data;
  }
);

