import { createSlice } from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState: {
    bookmark: []
  },
  reducers: {
    addtoBookMark: (state, action) => {
      state.bookmark.push(action.payload);
    }
  }
});

export const { addtoBookMark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
