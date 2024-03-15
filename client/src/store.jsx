import searchReducer from "./components/searchSlice";
import loadReducer from "./components/part3Slice"

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        load: loadReducer
    }
});
