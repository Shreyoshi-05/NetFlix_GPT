import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addnowplayingMovie } from "../utils/movieslice";
import { options } from "../utils/constants";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  async function getMovieData() {

    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        options
      );
      const result = await res.json();
      dispatch(addnowplayingMovie(result.results));

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMovieData();
  }, []);
};

export default useNowPlayingMovies;
