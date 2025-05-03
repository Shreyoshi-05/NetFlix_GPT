import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { img_Url } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieId } from "../utils/movieslice";
import "../css/Secondery.css";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";

const MovieList = ({ title, movies }) => {
  // console.log(movies);
  const scrollref = useRef(null);

  const dispatch = useDispatch();

  function handelAddid(id) {
    dispatch(addMovieId(id));
  }

  function scrollLeft(){
    scrollref.current.scrollLeft -= 500;
  };

  function scrollright(){
    scrollref.current.scrollLeft += 500;
  }

  return (
    <div className="movie_list_page">
      <h4 className="movie_list_title">{title}</h4>
      <div className="poster_scroll_container">

      <IoMdArrowDropleftCircle onClick={scrollLeft}  className="left arr"/>
      <IoMdArrowDroprightCircle onClick={scrollright} className="right arr"/>

        

        <div className="poster_row" ref={scrollref}>
        
          {movies &&
            movies.map((mv) => (
              
              <Link
                key={mv.id}
                to="/watch"
                className="movie_cart"
                onClick={() => handelAddid(mv.id)}
              >
                <img src={img_Url + mv.poster_path} alt="" className="movie_poster" />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
