
import React from "react";
// import Maincontainer from "./Maincontainer";
// import SecondaryComponent from "./SecondaryComponent";
import { useSelector } from "react-redux";
import usePopular from "../hooks/usePopular";
import useUpcoming from "../hooks/useUpcoming";
import useTopRated from "../hooks/useTopRated";
import useNowPlayingMovies from "../hooks/useNowPlayingMovie";
import Maincontainer from "./Maincontainer";
import SecondaryComponent from "./SecondaryComponent";
import GptSearch from "./GptSearch";


const Browse = () => {
  const gptsearch = useSelector((store)=>store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopular();
  useUpcoming();
  useTopRated();


  return (
    <>
    {
      gptsearch ?
      <GptSearch />:
      <>
      <Maincontainer />
      <SecondaryComponent />
      </>
    }
    
    </>
  )
}

export default Browse