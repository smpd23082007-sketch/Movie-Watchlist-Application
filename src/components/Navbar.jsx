import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🎬 MovieWatch
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/movies">My Movies</Link>
        <Link to="/add">Add Movie</Link>
      </div>
    </nav>
  );
}

export default Navbar;