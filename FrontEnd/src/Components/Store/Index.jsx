import {configureStore, createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState : {isLoggedIn: false},
    reducers: {
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            state.isLoggedIn = false;
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");

        },
    },
});


const adminSlice = createSlice({
    name: "auth",
    initialState : {isLoggedIn: false},
    reducers: {
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            localStorage.removeItem("AdminId")
            localStorage.removeItem("Token")
            state.isLoggedIn = false;
        },

    },
});

const initialState = {
    bookmark: [],
}


const bookmarkSystem = createSlice({
    name: "bookmark",
    initialState,
    reducers:{
        AddtoBookMark:(state , actions) =>{
            state.bookmark.push(actions.payload)
        },
        removeFromBookMark: (state, actions) => {
            state.bookmark = state.bookmark.filter(bookmark => bookmark.id !== actions.payload);
        },
    }
})

export const categorySlice = createSlice({
    name: 'category',
    initialState: { name: '', value: '' },
    reducers: {
      filterDataActions: (state, action) => {
        return {
          ...state,
          name: action.payload.name,
          value: action.payload.value,
        };
      },
    },
  });


  export const searchResultSlice = createSlice({
    name: 'search',
    initialState: {  value: '' },
    reducers: {
      searchResultActions: (state, action) => {
        return {
          ...state,
          value: action.payload.value,
        };
      },
    },
  });

  


export const userActions = userSlice.actions;
export const adminActions = adminSlice.actions;
export const {AddtoBookMark , removeFromBookMark} = bookmarkSystem.actions;
export const { filterDataActions } = categorySlice.actions;
export const {searchResultActions} = searchResultSlice.actions;
export default bookmarkSystem.reducer;  

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        admin: adminSlice.reducer,
        bookmark: bookmarkSystem.reducer,
        category: categorySlice.reducer,
        search: searchResultSlice.reducer
    },
})

