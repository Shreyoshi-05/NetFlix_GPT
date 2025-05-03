import React, { useEffect } from 'react'
import { options } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addPopularMoview, addTopRatedMovies } from '../utils/movieslice';

const useTopRated = () => {
  const dispatch = useDispatch();

  async function getPopularmovie() {
    
    fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', options)
      .then(res => res.json())
      .then(res =>dispatch(addTopRatedMovies(res.results)))
      .catch(err => console.error(err));
  }

  useEffect(()=>{
    getPopularmovie();
  },[]);
}

export default useTopRated



