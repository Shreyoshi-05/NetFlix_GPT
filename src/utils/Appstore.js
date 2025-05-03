import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Userslice'
import movieReducer from './movieslice'
import gptReducer from './gptSlice'
import langReducer from './langslice'
import vedioReducer from './vedioSlice'

const appStore = configureStore({
  reducer:{   /// here reducer

    user: userReducer,
    movies: movieReducer,
    gpt: gptReducer,
    lang: langReducer,
    vedio: vedioReducer,
  }
});



export default appStore