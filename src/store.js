import { configureStore } from '@reduxjs/toolkit'
import countReducer from './reducing/countSlice'
import eventReducer from './reducing/rentalDispatch'

export default configureStore({
    reducer: {
        counter : countReducer,
        event : eventReducer,
    }
})