import React from 'react'
import EpicPage from "./EpicPage";
import AsteroidsPage from "./AsteroidsPage";
import MarsPage from "./MarsPage";
import UniversePage from "./UniversePage";
import {  Route, Routes} from "react-router-dom";

const Main = props => {
  return (
      
      <Routes>
        <Route path="/" element={<EpicPage />} />
        <Route path="/asteroids" element={<AsteroidsPage />} />
        <Route path="/mars" element={<MarsPage />} />
        <Route path="/universe" element={<UniversePage />} />
      </Routes>
  );
}

Main.propTypes = {}

export default Main