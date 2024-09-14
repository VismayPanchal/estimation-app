import { createSlice } from '@reduxjs/toolkit'
import { createEstimation, fetchAllEstimations } from '../Actions/EstimationAction'
import { EstimationState } from '../Types'

const initialState: EstimationState = {
    loading: false,
    estimationList: null,
    message: null,
    error: null,
    success: false,
}

const estimationSlice = createSlice({
    name: 'estimation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createEstimation.pending, (state) => {
            state.loading = true
            state.error = null
        })
            .addCase(createEstimation.fulfilled, (state) => {
                state.loading = false
                state.success = true
                state.message = "Project created successfully."
            })
            .addCase(createEstimation.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || null
            })
            .addCase(fetchAllEstimations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllEstimations.fulfilled, (state, action) => {
                state.loading = false;
                state.estimationList = action.payload;
            })
            .addCase(fetchAllEstimations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            });
    }
})

export default estimationSlice.reducer