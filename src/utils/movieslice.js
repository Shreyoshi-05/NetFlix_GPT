import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name:"movies",
  initialState:{
    nowPlayingMovies:null ,
    trailerVedio: null,
    popularMovies:null,
    topRatedMovies:null,
    upcomingMovies:null,
    movieId:null,
  },

  reducers:{  //actions   ///here it will be reducersss   s
    addnowplayingMovie:(state , action) =>{
      state.nowPlayingMovies = action.payload;
    },

    addTrailerVedio:(state , action) => {
      state.trailerVedio = action.payload;
    },

    addTopRatedMovies:(state,action) =>{
      state.topRatedMovies = action.payload;
    },

    addUpcomingMovies:(state , action) =>{
      state.upcomingMovies = action.payload;
    },

    addPopularMoview:(state, action) =>{
      state.popularMovies = action.payload
    },
    addMovieId:(state , action)=>{
      state.movieId = action.payload;
    }
  }
});

export const {addnowplayingMovie ,addTrailerVedio,addPopularMoview,addTopRatedMovies ,addUpcomingMovies,addMovieId} = movieSlice.actions;
export default movieSlice.reducer ;   ///here it will be reducer