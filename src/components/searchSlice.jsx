import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: "",
    results: []
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        updateSearch: (state, action) => {
            state.search = action.payload
        },
        searchResults: (state, action) => {
            state.results = [...action.payload]
        },
        deleteItem: (state, action) => {
            state.results = state.results.splice(action.payload, 1)
        },
        updateItem: (state, action) => {
            state.results = state.results[action.payload[0]] = action.payload[1]
        }
    }
})

export const { updateSearch, searchResults, deleteItem, updateItem } = searchSlice.actions
export default searchSlice.reducer