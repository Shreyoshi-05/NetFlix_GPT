import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name:"gpt",
  initialState: {
    showGptSearch:false,
    gptmoviename:null,
    gptmovieresults:null,
  },
  reducers:{
    toggleGptSearchView:(state) =>{
      state.showGptSearch = !state.showGptSearch;
    },

    addmovieNames:(state,action)=>{
      state.gptmoviename = action.payload;
    },

    addMovieList:(state,acion)=>{
      state.gptmovieresults = acion.payload;
    }
  }
})

export default gptSlice.reducer;
export const {toggleGptSearchView,addmovieNames,addMovieList} = gptSlice.actions;
