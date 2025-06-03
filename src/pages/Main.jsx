import React from "react";
import EpicPage from "./EpicPage";
import LibraryPage from "./LibraryPage";
import MarsPage from "./MarsPage";
import UniversePage from "./UniversePage";
import { Route, Routes } from "react-router-dom";

const Main = (props) => {
  return (
    <Routes>
      <Route path="/" element={<EpicPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/mars" element={<MarsPage />} />
      <Route path="/universe" element={<UniversePage />} />
    </Routes>
  );
};

Main.propTypes = {};

export default Main;
