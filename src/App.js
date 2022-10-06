import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage"

function App() {

  const appState = useSelector(state => state);

  return (


    <Routes>
      <Route exact path="/" element={<Navbar />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>


  );
}

export default App;
