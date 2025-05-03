import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white text-center p-6">
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" 
        alt="Netflix Logo" 
        className="w-44 mb-6"
      />
      <h1 className="text-5xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg mb-6">We can't find the page you're looking for.</p>
      <button 
        onClick={() => navigate('/')} 
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorPage;
