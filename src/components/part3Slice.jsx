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
            state.loaded = action.payload
        },
        deleteList: (state, action) => {
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

export const { updateSearch, searchResults, deleteItem, updateItem } = searchSlice.actions
export default searchSlice.reducer