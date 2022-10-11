import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage"
import NewsArticles from "./components/NewsArticles";
import React from "react";

function App() {

  const appState = useSelector(state => state);


  let tempRender = <Routes>
    <Route exact path="/" element={<NewsArticles />} />
    <Route path="*" element={<Navigate to="/" />} />
    <Route path="/login" element={<LoginPage />} />

  </Routes>

  if (appState.login.isLogged) {
    tempRender = <Routes>
      <Route exact path="/" element={<NewsArticles />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  }
  return (

    <React.Fragment>
      <Navbar />
      {tempRender}
    </React.Fragment>




  );
}

export default App;
