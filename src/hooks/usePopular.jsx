import React, { useEffect } from 'react'
import { options } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addPopularMoview, addTopRatedMovies } from '../utils/movieslice';

const usePopular = () => {
  const dispatch = useDispatch();

  async function getPopularmovie() {
    
    fetch('https://api.themoviedb.org/3/movie/popular?page=1', options)
      .then(res => res.json())
      .then(res => dispatch(addPopularMoview(res.results)))
      .catch(err => console.error(err));
  }

  useEffect(()=>{
    getPopularmovie();
  },[]);
}

export default usePopular