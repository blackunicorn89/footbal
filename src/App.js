import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import Navbar from "./components/shared/components/Navbar";
import LoginPage from "./components/shared/components/LoginPage"
import NewsArticles from "./components/newsComponents/NewsArticles";
import AddArticle from "./components/newsComponents/AddArticle";
import EditArticle from "./components/newsComponents/EditArticle";
import Players from "./components/playerComponents/Players";
import AddPlayer from "./components/playerComponents/AddPlayer";
import EditPlayer from "./components/playerComponents/EditPlayer";
import Season from "./components/seasonComponents/Seasons";
import AddSeason from "./components/seasonComponents/AddSeason";
import EditSeason from "./components/seasonComponents/EditSeason";
import SeasonGames from "./components/seasonGameComponents/SeasonGames";
import AddPSeasonGame from "./components/seasonGameComponents/AddSeasonGame";
import EditSeasonGame from "./components/seasonGameComponents/EditSeasonGame";
import Users from "./components/userComponents/Users";
import Register from "./components/userComponents/Register";
import EditUser from "./components/userComponents/EditUser";
import ExpiredSession from "./components/shared/components/ExpiredSession";
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
    <Route path="/seasons" element={<Season />} />
    <Route path="/expiredsession" element={<ExpiredSession />} />
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
      <Route path="/seasons" element={<Season />} />
      <Route path="/seasons/addseason" element={<AddSeason />} />
      <Route path="/seasons/editseason/:id" element={<EditSeason />} />
      <Route path="/seasongames" element={<SeasonGames />} />
      <Route path="/seasongames/addseasongame" element={<AddPSeasonGame />} />
      <Route path="/seasongames/editseasongame/:id" element={<EditSeasonGame />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/register" element={<Register />} />
      <Route path="/users/edituser/:id" element={<EditUser />} />
      <Route path="/expiredsession" element={<ExpiredSession />} />
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
