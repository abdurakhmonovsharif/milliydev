import { createSlice } from "@reduxjs/toolkit";

const initialState: { isEditItem:Work|null,isLoadingSearch:boolean,isSearching:boolean,searchedWorks:Work[]|null} = {
  isEditItem:null,
  isSearching:false,
  searchedWorks:null,
  isLoadingSearch:false
};

const workSlice = createSlice({ 
  name: "work",
  initialState,
  reducers: {
    setWorkState: (state, action) => {
      state.isEditItem = action.payload.isEditItem;
      state.isSearching=action.payload.isSearching;
      state.searchedWorks=action.payload.searchedWorks;
      state.isLoadingSearch=action.payload.isLoadingSearch;
    },
    clearAll:(state)=>{
      state.isEditItem = null;
      state.isSearching=false;
      state.searchedWorks=null;
      state.isLoadingSearch=false;
    }
  },
});

export const { setWorkState,clearAll } = workSlice.actions;
export default workSlice.reducer;
