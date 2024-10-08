import { createSlice } from '@reduxjs/toolkit'
import { createProject, fetchAllProject, fetchProjectById, updateProject } from '../Actions/ProjectActions'
import { ProjectState } from '../Types'

const initialState: ProjectState = {
    loading: false,
    projectList: null,
    message: null,
    error: null,
    success: false,
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createProject.pending, (state) => {
            state.loading = true
            state.error = null
        })
            .addCase(createProject.fulfilled, (state) => {
                state.loading = false
                state.success = true
                state.message = "Project created successfully."
            })
            .addCase(createProject.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || null
            })
            .addCase(fetchAllProject.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllProject.fulfilled, (state, action) => {
                state.loading = false;
                state.projectList = action.payload;
            })
            .addCase(fetchAllProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })

            .addCase(fetchProjectById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjectById.fulfilled, (state, action) => {
                state.loading = false;
                state.project = action.payload;
            })
            .addCase(fetchProjectById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateProject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.loading = false;
                state.project = action.payload;
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export default projectSlice.reducer