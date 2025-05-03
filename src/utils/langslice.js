import { createSlice } from "@reduxjs/toolkit";

const langslice = createSlice({
  name:"lang",
  initialState:{
    initialLanguage:"eng",
  },
  reducers:{
    addNewLanguage:(state,action)=>{
      state.initialLanguage = action.payload;
    }
  }
});

export const {addNewLanguage} = langslice.actions;
export default langslice.reducer;