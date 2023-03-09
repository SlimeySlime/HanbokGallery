import {createSlice} from '@reduxjs/toolkit'

export const eventdateChange = createSlice({
    name : 'event',
    initialState : {
        hanbok: [],
        store: [],
        eventRental : [],
    },
    reducers: {
        setRental: (state, action) => {
            state.eventRental = action.payload
        },
        setHanbok: (state, action) => {
            state.hanbok = action.payload
        },
        setStore: (state, action) => {
            state.store = action.payload
        }
    }

})

// export const {changeDate, setRental, setHanbok, setStore} = eventdateChange.actions
export const {setRental, setHanbok, setStore} = eventdateChange.actions

export default eventdateChange.reducer
