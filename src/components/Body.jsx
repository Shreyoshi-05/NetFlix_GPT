import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import ErrorPage from "./Error";
import Watch from "./Watch";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/Userslice";
import Footer from "./Footer";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/brouse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/brouse" element={<Browse />}></Route>
        <Route path="/error" element={<ErrorPage />}></Route>
        <Route path="/watch" element={<Watch />}></Route>
      </Routes>
      <Footer />
    </>
  );
};

export default Body;
