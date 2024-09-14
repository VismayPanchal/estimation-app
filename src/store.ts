import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './Reducers/AuthSlice'
import ProjectSlice from './Reducers/ProjectSlice'
import EstimationSlice from './Reducers/EstimationSlice'

export const store = configureStore({
  reducer: {
    auth:AuthSlice,
    project:ProjectSlice,
    estimation:EstimationSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch