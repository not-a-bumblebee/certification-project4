import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loaded: []
}

export const loadSlice = createSlice({
    name: "load",
    initialState,
    reducers: {
        addList: (state, action) => {
            //action.payload = json file
            state.loaded = [...state.loaded, action.payload]
        },
        deleteList: (state, action) => {
            //action.payload = list index
            state.loaded = action.payload
        },
        updateList: (state, action) => {
            //action.payload = list index
            state.loaded = action.payload
        },
        addItem: (state, action) => {
            //action.payload = list index
            state.search = action.payload
        },
        updateItem: (state, action) => {
            //action.payload = [list index, item index, {changes} ]
            state.search = action.payload
        },
        deleteItem: (state, action) => {
            //action.payload = [list index, item index]
            state.search = action.payload
        },


    }
})

export const { addList, deleteList, updateList, addItem, updateItem, deleteItem } = loadSlice.actions
export default loadSlice.reducer