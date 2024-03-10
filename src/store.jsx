import searchReducer from "./components/searchSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        search: searchReducer
    }
});
