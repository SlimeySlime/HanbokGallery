import {createSlice} from '@reduxjs/toolkit';

export const countSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increase : state => {
            state.value += 1
        },
        decrease : state => {
            state.value -= 1
        },
        increaseByValue: (state, action) => {
            state.value = state + action.payload
        }
    }
})

export const {increase, decrease, increaseByValue} = countSlice.actions

export default countSlice.reducer