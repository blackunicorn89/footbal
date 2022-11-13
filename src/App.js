import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import Navbar from "./components/shared/components/Navbar";
import LoginPage from "./components/shared/components/LoginPage"
import Register from "./components/Register";
import NewsArticles from "./components/newsComponents/NewsArticles";
import AddArticle from "./components/newsComponents/AddArticle";
import EditArticle from "./components/newsComponents/EditArticle";
import Players from "./components/playerComponents/Players";
import AddPlayer from "./components/playerComponents/AddPlayer";
import EditPlayer from "./components/playerComponents/EditPlayer";
import SeasonGames from "./components/seasonGameComponents/SeasonGames";
import AddPSeasonGame from "./components/seasonGameComponents/AddSeasonGame";
import EditSeasonGame from "./components/seasonGameComponents/EditSeasonGame";
import React from "react";
import { Container } from "@mui/material";

function App() {

  const appState = useSelector(state => state);

  let tempRender = <Routes>
    <Route exact path="/" element={<NewsArticles />} />
    <Route path="/editarticle/:id" element={<EditArticle />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/players" element={<Players />} />
    <Route path="/seasongames" element={<SeasonGames />} />
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
      <Route path="/seasongames" element={<SeasonGames />} />
      <Route path="/seasongames/addseasongame" element={<AddPSeasonGame />} />
<<<<<<< HEAD
      <Route path="/register" element={<Register />} />
=======
      <Route path="/seasongames/editseasongame/:id" element={<EditSeasonGame />} />
>>>>>>> 44b6d669e923bafcc9b62259eedb59d850600ba6
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
