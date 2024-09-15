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

export const fetchProjectById = createAsyncThunk(
  'project/fetchById',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}/projects/${projectId}`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;

      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async (projectData: ProjectData) => {
    const response = await axios.put(`${base_url}/projects/${projectData.id}`, projectData);
    return response.data;
  }
);

