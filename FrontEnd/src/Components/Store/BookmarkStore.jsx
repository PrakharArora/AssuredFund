import { configureStore } from "@reduxjs/toolkit";
import bookmarkSlice from "./bookmarkSlice";

export const BookmarkStore = configureStore({
    reducer: {
        bookmark: bookmarkSlice.reducer,
        // Add other slice reducers here if any
    },
});
