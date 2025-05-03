import React from 'react';
import GptBar from './GptBar';
import GptMovie from './GptMovie';
import { backgroundimg } from '../utils/constants';
import '../css/Gptsearch.css'

const GptSearch = () => {
  return (

    <div className="gptsearch_page">

      <div className="gpt_bg_img">
        <img src={backgroundimg} alt="" />
      </div>

      <div className='gptsearch'>
      <div className="gpt_inner_div">
      <GptBar />
      <GptMovie />
      </div>
    </div>
    </div>
  );
};

export default GptSearch;
