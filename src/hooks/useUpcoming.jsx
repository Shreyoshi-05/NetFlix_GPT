
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addUpcomingMovies } from '../utils/movieslice';
import { options } from "../utils/constants";

const useUpcoming = () => {
  const dispatch = useDispatch();

  async function getPopularmovie() {
  
  fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', options)
    .then(res => res.json())
    .then(res => dispatch(addUpcomingMovies(res.results)))
    .catch(err => console.error(err));
  }

  useEffect(()=>{
    getPopularmovie();
  },[]);
}

export default useUpcoming




