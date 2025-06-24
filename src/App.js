import NavBar from "./components/navbar/Navbar";
import Main from "./pages/Main";
import { useAuth } from "./context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import React from "react";

function App() {
  const { user } = useAuth();
  const location = useLocation();

  // Redireciona para /auth se não autenticado e não estiver já na página de login
  if (!user && location.pathname !== "/auth") {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <NavBar />
      <div className="App">
        <Main />
      </div>
    </>
  );
}

export default App;
