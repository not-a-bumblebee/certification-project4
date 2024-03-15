import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loaded: [],
    user: ""
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
        loadMasterList: (state, action) => {
            state.loaded = action.payload;
        },
        addItem: (state, action) => {
            //action.payload = [list index , quote{author, category, quote}]
            let temp = state.loaded;
            temp[action.payload[0]].quotes.push(action.payload[1])
            state.loaded = [...temp]
        },
        updateItem: (state, action) => {
            //action.payload = [list index, item index, {changes} ]
            console.log(action.payload);
            let temp = state.loaded;
            temp[action.payload[0]].quotes[action.payload[1]] = action.payload[2]
            state.loaded = [...temp]
        },
        deleteItem: (state, action) => {
            //action.payload = [list index, item index]
            let temp = state.loaded;
            temp[action.payload[0]].quotes.splice(action.payload[1], 1)
            state.loaded = [...temp]
        },
        loginUser: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state, action) => {
            state.user = ""
            state.loaded = []
            document.cookie="userCookie=0; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;"

        },


    }
})

export const { addList, deleteList, updateList, loadMasterList, addItem, updateItem, deleteItem, loginUser, logoutUser } = loadSlice.actions
export default loadSlice.reducer