import { configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Hanbok_Item } from 'domain/hanbok_item'
import { Hanbok_Min_Rental } from 'domain/rental_minimum_info'
import { Gallery_Item } from 'domain/gallery_item'
import { Rental_Item } from 'domain/rental_item'

const gallerySlice = createSlice({
    name: 'gallery',
    initialState : {
        eventRental : [] as Hanbok_Min_Rental[],
        rentalItems : [] as Rental_Item[],
        hanboks: [] as Hanbok_Item[],
        galleryInfos: [] as Gallery_Item[],
    },
    reducers: {
        setRentals(state, action:PayloadAction<Hanbok_Min_Rental[]>) {
            state.eventRental = action.payload
        },
        setRentalItems(state, action:PayloadAction<Rental_Item[]>) {
            console.log('payload action<Rental_Item[]>', action.payload)
            state.rentalItems = action.payload
        },
        setHanboks(state, action:PayloadAction<Hanbok_Item[]>) {
            state.hanboks = action.payload
        },
        setGalleryInfos(state, action:PayloadAction<Gallery_Item[]>) {
            state.galleryInfos = action.payload
        },
    },
})


export const { setRentals, setHanboks, setGalleryInfos, setRentalItems } = gallerySlice.actions
export default gallerySlice.reducer


// export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch
