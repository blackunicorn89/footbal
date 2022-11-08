import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage"
import NewsArticles from "./components/NewsArticles";
import AddArticle from "./components/AddArticle";
import EditArticle from "./components/EditArticle";
import Players from "./components/playerComponents/Players";
import AddPlayer from "./components/playerComponents/AddPlayer";
import EditPlayer from "./components/playerComponents/EditPlayer";
import React from "react";
import { Container } from "@mui/material";

function App() {

  const appState = useSelector(state => state);

  let tempRender = <Routes>
    <Route exact path="/" element={<NewsArticles />} />
    <Route path="/editarticle/:id" element={<EditArticle />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/players" element={<Players />} />
    <Route path="*" element={<Navigate to="/" />} />

  </Routes>

  if (appState.login.isLogged) {
    tempRender = <Routes>
      <Route exact path="/" element={<NewsArticles />} />
      <Route exact path="/players/addplayer" element={<AddPlayer />} />
      <Route exact path="/players/editplayer/:id" element={<EditPlayer />} />
      <Route exact path="/addarticle" element={<AddArticle />} />
      <Route path="/editarticle/:id" element={<EditArticle />} />
      <Route path="/players" element={<Players />} />
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  }
  return (

    <Container>
      <Navbar />
      {tempRender}
    </Container>
  );
}
export default App;
