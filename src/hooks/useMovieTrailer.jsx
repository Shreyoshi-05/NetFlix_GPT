import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVedio } from "../utils/movieslice";
import { options } from "../utils/constants";

const useMovieTrailer = (id) => {
  const dispatch = useDispatch();

  async function getVedioData(id) {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        options
      );
      const data = await res.json();
      
      const trailer = data.results?.filter((item) => item.type == "Trailer");

      const displaytrailer = trailer?.[0];
      
      if(displaytrailer){
        dispatch(addTrailerVedio(displaytrailer));
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(id){
      getVedioData(id);
    }

    
  }, []);
};

export default useMovieTrailer;
