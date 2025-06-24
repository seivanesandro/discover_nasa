import React from "react";
import EpicPage from "./EpicPage";
import LibraryPage from "./LibraryPage";
import MarsPage from "./MarsPage";
import UniversePage from "./UniversePage";
import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "../components/private/PrivateRoute";
import Auth from "./Auth";
import { useAuth } from "../context/AuthContext";

const Main = (props) => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/"
        element={
          user ? (
            <PrivateRoute>
              <EpicPage />
            </PrivateRoute>
          ) : (
            <Navigate to="/auth" replace />
          )
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
