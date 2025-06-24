import React from "react";
import EpicPage from "./EpicPage";
import LibraryPage from "./LibraryPage";
import MarsPage from "./MarsPage";
import UniversePage from "./UniversePage";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/private/PrivateRoute";
import Auth from "./Auth";

const Main = (props) => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <EpicPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/library"
        element={
          <PrivateRoute>
            <LibraryPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/mars"
        element={
          <PrivateRoute>
            <MarsPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/universe"
        element={
          <PrivateRoute>
            <UniversePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

Main.propTypes = {};

export default Main;
