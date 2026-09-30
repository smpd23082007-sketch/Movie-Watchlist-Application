import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import AddMovie from "./pages/AddMovie";

import { MovieProvider } from "./components/MovieContext";

import "./App.css";

function App() {
  return (
    <MovieProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/add" element={<AddMovie />} />
        </Routes>
      </HashRouter>
    </MovieProvider>
  );
}

export default App;