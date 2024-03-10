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

            state.loaded.splice(action.payload, 1)

            state.loaded = state.loaded

        },
        updateList: (state, action) => {
            //action.payload = [list index, new name]
            let temp = state.loaded
            console.log(temp, action.payload);
            temp[action.payload[0]].name = action.payload[1]

            state.loaded = [...temp]
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