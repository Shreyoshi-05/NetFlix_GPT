import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const Maincontainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  let main = movies?.[1];
  useMovieTrailer(main?.id);

  const video = useSelector((store) => store.movies?.trailerVedio);

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {video?.key && (
        <iframe
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          src={`https://www.youtube.com/embed/${video.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.key}&modestbranding=1&showinfo=0`}
          title="Hero Background"
          allow="autoplay; fullscreen"
        ></iframe>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>

      {main && (
        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-10 text-white z-10">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 md:mb-4 drop-shadow-lg">
            {main.title}
          </h1>

          {/* Description - hidden on small screens */}
          <p className="hidden md:block text-md max-w-xl mb-6 text-gray-200">
            {main.overview}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="bg-white hover:bg-gray-200 text-black px-4 sm:px-5 py-2 text-sm sm:text-base font-semibold mt-3 w-40 rounded-md shadow-md">
              ▶ Play
            </button>
            <button className="bg-white/30 hover:bg-white/40 text-white px-4 sm:px-5 py-2 text-sm sm:text-base font-medium rounded-md shadow-md w-40 backdrop-blur-md">
              More Info
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maincontainer;
