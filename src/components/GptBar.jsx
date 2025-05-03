import React, { useState } from "react";
import "../css/Gptsearch.css";
import { useDispatch, useSelector } from "react-redux";
import { SelectLanguage } from "../hooks/SelectLanguage";
import { GoogleGenAI } from "@google/genai";
import { addmovieNames } from "../utils/gptSlice";

const GptBar = () => {
  const [search, setSearch] = useState("");
  const lang = useSelector((store) => store.lang.initialLanguage);
  const dispatch = useDispatch();


  async function getTmdbMovieData(name) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=en-US&page=1`,
      options
    );
    const data = await res.json();
    return data.results;
  }
  

  async function handelSearchMovie() {
    if(!search) return;

    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

    const quary =
      "Act as a movie recomendataion system and suggest some movies for the query :" +
      search +
      "only give me names of 5 movies coma seperated like the example result given ahead .Example: 3 Idiots, Dangal,Bang Bang,Queen.PK";


      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: quary,
      });

      dispatch(addmovieNames(response.text));
  }


  return (
    <div className="input-container">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={SelectLanguage[lang].placeholder}
        className="custom-input"
      />
      <button className="red-button" onClick={handelSearchMovie}>{SelectLanguage[lang].search}</button>
    </div>
  );
};

export default GptBar;
