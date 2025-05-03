import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { img_Url, options } from "../utils/constants";
import { addMovieList } from "../utils/gptSlice";
import { Link } from "react-router-dom";
import "../css/Gptsearch.css";
import { addMovieId } from "../utils/movieslice";

const GptMovie = () => {
  const dispatch = useDispatch();
  const names = useSelector((store) => store.gpt.gptmoviename);
  const movieresults = useSelector((store) => store.gpt.gptmovieresults);
  // console.log(movieresults);

  // const arr = names.split(",");
  // console.log(arr);

  async function getTmdbMovieData(name) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`,
      options
    );
    const data = await res.json();
    return data.results;
  }

  async function getnameData() {
    const arr = names.split(",");
    const movieData = arr.map((item, idx) => getTmdbMovieData(item));
    const resmoviedata = await Promise.all(movieData);
    dispatch(addMovieList(resmoviedata));
  }

  useEffect(() => {
    getnameData();
  }, [names]);

   function handelAddid(id) {
      dispatch(addMovieId(id));
    }

  
  if (movieresults == null) return;

  return (
    <div className="gpt_movie_page">
      <div className="gpt_movie_names">
        <h3>{names}</h3>
      </div>
      <div className="gpt_movie_container">
        {movieresults &&
          movieresults.flat().map((item) => {
            return (
              <Link
                key={item.id}
                to="/watch"
                className="movie_cart"
                onClick={() => handelAddid(item.id)}
              >
                {item.backdrop_path !== null && (
                  <img src={`${img_Url}${item.backdrop_path}`} alt="" />
                )}
                {item.backdrop_path !== null && <h3>{item.original_title}</h3>}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default GptMovie;
