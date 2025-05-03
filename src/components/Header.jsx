import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, addUser } from "../utils/Userslice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { Link } from "react-router-dom";
import { SelectLanguage } from "../hooks/SelectLanguage";
import { netflix_logo } from "../utils/constants";
import { addNewLanguage } from "../utils/langslice";


const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const gpt = useSelector((store) => store.gpt.showGptSearch);
  const dispatch = useDispatch();

  const location = useLocation();
  // console.log(location.pathname)

  async function handelSignout() {
    try {
      await signOut(auth);
      navigate("/");
      dispatch(removeUser());
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  }


  function handleGptSearch(e) {
    e.preventDefault();
    dispatch(toggleGptSearchView());
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          addUser({
            uid: user.uid,
            userEmail: user.email,
            display: user.display,
            photoURL: user.photoURL,
          })
        );
        navigate("/brouse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);

  function handelGetLang(e){
    console.log(e.target.id);
    dispatch(addNewLanguage(e.target.id));
  }

  return (
    <div className="flex justify-between items-center fixed top-0 left-0 w-full h-20 z-50 px-8 bg-gradient-to-b from-black to-transparent">
      <img
        className="w-44"
        src={netflix_logo}
        alt="logo"
      />

      

      <div className="flex items-center gap-3 text-center">
      {
        gpt && 
        
<div className="dropdown dropdown-bottom dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1">Select Language </div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <div className="lan_btn" onClick={handelGetLang}>
    {
      Object.keys(SelectLanguage).map((item,idx)=>{
        return <li key={idx} id={item}>{item}</li>
      })
    }
    </div>
    
  </ul>
</div>
      }


{
  location.pathname === "/brouse" && (
    <button
      onClick={handleGptSearch}
      className="cursor-pointer px-4 md:px-6 py-2 md:py-3 text-sm md:text-base mr-2 md:mr-4 rounded-full bg-gradient-to-r from-indigo-500 to-pink-600 flex items-center justify-center shadow-[5px_5px_14px_rgba(255,105,180,0.6),8px_9px_15px_rgba(75,0,130,0.8)]"
    >
      <p className="text-white">{gpt ? "Home" : "GPT Search"}</p>
    </button>
  )
}

{
  location.pathname === "/watch" && (
    <Link
      to="/"
      className="cursor-pointer px-4 md:px-6 py-2 md:py-3 text-sm md:text-base mr-2 md:mr-4 rounded-full bg-gradient-to-r from-indigo-500 to-pink-600 flex items-center justify-center shadow-[5px_5px_14px_rgba(255,105,180,0.6),8px_9px_15px_rgba(75,0,130,0.8)]"
    >
      Home
    </Link>
  )
}




        {user && (
          <div className="flex items-center gap-3 text-center">
            <img
              className="w-10 rounded-sm"
              src="https://occ-0-2164-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABZumJ3wvSKM7od-r3UjhVF9j3yteWlQYA-51F3SNoI682llhul1Xf_CUkMnfP_17Md2lpOOhbwHeGufvo8kOTjptoS_bcwtniHKz.png?r=e6e"
              alt="user icon"
            />
            <h2 className="text-white font-bold" onClick={handelSignout}>
              Sign out
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
