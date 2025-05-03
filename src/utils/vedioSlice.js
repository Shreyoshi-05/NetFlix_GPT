import { createSlice } from "@reduxjs/toolkit";

const vedioSlice = createSlice({
  name: "vedio",
  initialState: {
    vedioDescription: "",
  },
  reducers: {
    addVedioDescription: (state, action)=>{
      state.vedioDescription = action.payload;  
    }
  }
})

export default vedioSlice.reducer;
export const {addVedioDescription} = vedioSlice.actions;