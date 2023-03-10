import { configureStore } from '@reduxjs/toolkit'
import countReducer from './reducing/countSlice'
import eventReducer from './reducing/rentalDispatch'
import galleryReducer from './reducing/galleryRedux';

export const store = configureStore({
    reducer: {
        counter : countReducer,
        event : eventReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch