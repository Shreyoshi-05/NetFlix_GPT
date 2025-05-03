import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { options } from "../utils/constants";
import { FaGamepad } from "react-icons/fa";
import "../css/Watch.css";
import useMovieDescription from "../hooks/useMovieDescription";
import Comment from "./comment";

const Watch = () => {
  const [key, setKey] = useState(null);
  const [info, setInfo] = useState(null);
  const [input, setInput] = useState("");
  const [commentinfo, setComment] = useState([]);

  const id = useSelector((store) => store.movies.movieId);
  const des = useSelector((store) => store.vedio.vedioDescription);
  console.log(des);

  if (!id) return;

  async function getMovieVedio(prop) {
    const url = `https://api.themoviedb.org/3/movie/${prop}/videos`;

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setKey(json.results[4].key))
      .catch((err) => console.error(err));
  }

  async function getVedioDetails(prop) {
    const url = `https://api.themoviedb.org/3/movie/${prop}`;

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setInfo(json))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    if (id) {
      getMovieVedio(id);
      getVedioDetails(id);
    }
    //
  }, []);

  function handelAddcomm() {
    if (!input) return;

    let copycomm = {
      id: Date.now(),
      com: input,
      children: [],
    };
    setComment((pre) => [...pre, copycomm]);
    setInput("");
  }


  function handelDelete(id) {
    function getnewComment(data) {
      return data
        .filter((com) => com.id != id)
        .map((item) => ({ ...item, children: getnewComment(item.children) }));
    }

    const updatedcomm = getnewComment(commentinfo);
    setComment(updatedcomm);
  }

  function addNewNestedComm(reply, id) {
    console.log(id);
    console.log(reply);

    let newcomm = {
      id: Date.now(),
      com: reply,
      children: [],
    };

    function getnewComment(data) {
      return data.map((com) => {
        if (com.id == id) {
          return { ...com, children: [newcomm, ...com.children] };
        }

        if (Array.isArray(com.children) && com.children.length > 0) {
          return { ...com, children: getnewComment(com.children) };
        }

        return com;
      });
    }

    const updatedcomm = getnewComment(commentinfo);
    setComment(updatedcomm);
  }

  return (
    <div className="watch__page">
      <div className="vedio__container">
        <div className="vedio">
          <iframe
            className="vedio_play"
            src={`https://www.youtube.com/embed/${key}?si=pgRbpm4HRj1AZHwg`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>

        <div className="vedio__info">
          {info && (
            <>
              <h2>{info.original_title}</h2>
              <h3>{info.tagline}</h3>
              <p>{info.overview}</p>
            </>
          )}
        </div>
      </div>

      <div className="comment__container">
        <div className="massage_input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="leave a comment.."
          />
          <button onClick={handelAddcomm}>comment</button>
        </div>

        <div className="inner_connent">
          {commentinfo.map((item, idx) => {
            return (
              <div key={idx}>
                <Comment
                  item={item}
                  addNewNestedComm={addNewNestedComm}
                  handelDelete={handelDelete}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Watch;
