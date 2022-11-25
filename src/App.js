import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import AuthVerify from "./components/shared/components/AuthVerify";
import { logout } from "./actions/LoginActions"
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
import React, { useEffect } from "react";
import { Container } from "@mui/material";


let logoutTimer;

function App() {

  const appState = useSelector(state => state);
  const dispatch = useDispatch();

  const sessionLogout = () => {
    dispatch(logout());
  }

  let tempRender = <Routes>
    <Route exact path="/" element={<NewsArticles />} />
    <Route path="/editarticle/:id" element={<EditArticle />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/players" element={<Players />} />
    <Route path="/seasongames" element={<SeasonGames />} />
    <Route path="*" element={<Navigate to="/" />} />

  </Routes>

  if (appState.login.isLogged) {
    tempRender =
      <React.Fragment>
        <React.Fragment>
          <Routes>
            <Route exact path="/" element={<NewsArticles />} />
            <Route exact path="/players/addplayer" element={<AddPlayer />} />
            <Route exact path="/players/editplayer/:id" element={<EditPlayer />} />
            <Route exact path="/addarticle" element={<AddArticle />} />
            <Route path="/editarticle/:id" element={<EditArticle />} />
            <Route path="/players" element={<Players />} />
            <Route path="/seasongames" element={<SeasonGames />} />
            <Route path="/seasongames/addseasongame" element={<AddPSeasonGame />} />
            <Route path="/seasongames/editseasongame/:id" element={<EditSeasonGame />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </React.Fragment>
        <AuthVerify logOut={sessionLogout} />
      </React.Fragment>
  }
  return (

    <Container>
      <Navbar />
      {tempRender}
    </Container>
  );
}
export default App;
