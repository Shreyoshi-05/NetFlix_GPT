import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { checkValidaData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { setLogLevel } from "firebase/app";

// Disables Firebase logs
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/Userslice";
import { backgroundimg } from "../utils/constants";

const Login = () => {
  const [isSIgnin, setIssignIn] = useState(false);
  const [massage, setMassage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();

  const name = useRef(null);
  const email = useRef(null);
  const pass = useRef(null);

  function handelSignin() {
    setIssignIn(!isSIgnin);
  }
  setLogLevel("silent");

  async function handelButtonClick() {
    const massage = checkValidaData(email.current.value, pass.current.value);
    setMassage(massage);

    if (massage != null) return;

    if (!isSIgnin) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          pass.current.value
        );
        const user = userCredential.user;
        const displayName = name.current ? name.current.value : "";

        await updateProfile(user, {
          displayName: displayName,
        });

        setIssignIn(true);
        navigate("/brouse");
      } catch (error) {
        setMassage(error.message);
      }

      
    } else {
      signInWithEmailAndPassword(auth, email.current.value, pass.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/brouse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setMassage(errorCode + " " + errorMessage);
        });
    }
  }

  async function signinWithGoogle() {
    signInWithPopup(auth, provider);
  }

  // console.log(user);

  return (
    <div>
      <Header />
      <div className="relative h-screen w-full">
        <img
          src={backgroundimg}
          alt="bg"
          className="absolute w-full h-full object-cover"
        />

        <form
          onSubmit={(e) => e.preventDefault()}
          className="absolute w-3/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 bg-black bg-opacity-80 text-white rounded-lg shadow-lg"
        >
          <h1 className="text-2xl font-bold mb-6">
            {isSIgnin ? "Sign In" : "Sign Up"}
          </h1>

          {!isSIgnin && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded"
            />
          )}
          <input
            ref={email}
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded"
          />
          <input
            ref={pass}
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 bg-gray-700 border border-gray-600 rounded"
          />

          <p className="text-red-500 mb-5 font-medium">{massage}</p>

          <button
            type="submit"
            onClick={handelButtonClick}
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
          >
            {isSIgnin ? "Sign In" : "Sign Up"}
          </button>

          <div className="bg-slate-0 mt-2 flex justify-center al">
            {!isSIgnin && <h3>OR</h3>}
          </div>

          {!isSIgnin && (
            <button
              className="w-full py-3 mt-2 bg-orange-500 hover:bg-orange-600 rounded text-white font-semibold"
              onClick={signinWithGoogle}
            >
              Google
            </button>
          )}

          <h2 className="mt-8" onClick={handelSignin}>
            {isSIgnin
              ? "New to Netflix? Sign Up now"
              : "Already Registered? Sign In"}
          </h2>
        </form>
      </div>
    </div>
  );
};

export default Login;
