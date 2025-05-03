import React, { useEffect, useState } from "react";
import { options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addVedioDescription } from "../utils/vedioSlice";

const useMovieDescription = ({key}) => {
  const dispatch = useDispatch()

  async function getMovieDetails(kk) {
    const url = `https://api.themoviedb.org/3/movie/${kk}language=en-US`;

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => dispatch(addVedioDescription(json))) 
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getMovieDetails(key);
  }, []);

};

export default useMovieDescription;
