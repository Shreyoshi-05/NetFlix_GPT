import React from 'react';
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryComponent = () => {
  const movie = useSelector(store => store.movies);

  return (
    <div className=" z-20 bg-black">
      <div className='relative -mt-44 w-[95vw] m-auto'>
      <MovieList title={"Now Playing"} movies={movie.nowPlayingMovies}/>
      <MovieList title={"Popular"} movies={movie.popularMovies}/>
      <MovieList title={"Upcoming"} movies={movie.upcomingMovies}/>
      <MovieList title={"Top Rated"} movies={movie.topRatedMovies}/>
      </div>
    </div>
  );
};

export default SecondaryComponent;
