import { createSlice } from '@reduxjs/toolkit'
import { registerUser, loginUser } from '../Actions/AuthActions'
import { AuthState } from '../Types'

const initialState:AuthState = {
    loading: false,
    userInfo: null,
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.userInfo = action.payload || null
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || null
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.userInfo = action.payload; // Store user info
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || null 
            });
    }
})

export default authSlice.reducer