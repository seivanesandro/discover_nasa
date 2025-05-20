
import NavBar from './components/navbar/Navbar';
import Main from "./pages/Main";
import {BrowserRouter as Router} from "react-router-dom";



function App() {
  return (
    <Router future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
      <NavBar />
      <div className="App">
        <Main />
      </div>
    </Router>
  );
}

export default App;
