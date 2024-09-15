import { createSlice } from '@reduxjs/toolkit'
import { createEstimation, fetchAllEstimations, fetchEstimationByid, updateEstimation } from '../Actions/EstimationAction'
import { EstimationState } from '../Types'

const initialState: EstimationState = {
    loading: false,
    estimationList: null,
    message: null,
    error: null,
    estimation:null,
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
                state.message = "Estimation created successfully."
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
            })
            .addCase(fetchEstimationByid.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEstimationByid.fulfilled, (state, action) => {
                state.loading = false;
                console.log('action', action)
                state.estimation = action.payload;
            })
            .addCase(fetchEstimationByid.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            })
            .addCase(updateEstimation.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateEstimation.fulfilled, (state, action) => {
                state.loading = false;
                state.estimationList = action.payload;
            })
            .addCase(updateEstimation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            });
    }
})

export default estimationSlice.reducer