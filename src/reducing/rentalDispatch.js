import {createSlice} from '@reduxjs/toolkit'

export const eventdateChange = createSlice({
    name : 'event',
    initialState : {
        // date : new Date(),
        hanbok: [],
        store: [],
        eventRental : [],
    },
    reducers: {
        // changeDate: (state, newDate) => {
        //     state.date = newDate
        // },
        setRental: (state, action) => {
            state.eventRental = action.payload
            // console.log('action', action)
            console.log('eventRental reduxed', action.payload)
        },
        setHanbok: (state, action) => {
            state.hanbok = action.payload
        },
        setStore: (state, action) => {
            state.store = action.payload
            console.log('store data reduxed', action.payload);
        }
    }

})

export const {changeDate, setRental, setHanbok, setStore} = eventdateChange.actions

export default eventdateChange.reducer
