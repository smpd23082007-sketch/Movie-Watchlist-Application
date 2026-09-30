import { Link } from "react-router-dom";
import { useMovies } from "../components/MovieContext";
import Navbar from "../components/Navbar";

function Home() {
  const { movies } = useMovies();

  const watchedMovies = movies.filter(
    (movie) => movie.status === "Watched"
  );

  const watchingMovies = movies.filter(
    (movie) => movie.status === "Watching"
  );

  const queuedMovies = movies.filter(
    (movie) => movie.status === "Queued"
  );

  const averageRating =
    movies.length > 0
      ? (
          movies.reduce((total, movie) => total + Number(movie.rating), 0) /
          movies.length
        ).toFixed(1)
      : "0.0";

  return (
    <>
      <Navbar />

      <main className="home-page">
        <section className="hero">
          <div>
            <p className="welcome-text">WELCOME TO</p>

            <h1>
              Your Personal
              <br />
              Movie Watchlist 🎬
            </h1>

            <p>
              Organize your favorite movies, track your viewing
              progress, and rate every movie you watch.
            </p>

            <Link to="/add" className="primary-button">
              + Add New Movie
            </Link>
          </div>
        </section>

        <section className="dashboard">
          <h2>Watchlist Dashboard</h2>

          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">🎬</span>
              <h3>{movies.length}</h3>
              <p>Total Movies</p>
            </div>

            <div className="stat-card">
              <span className="stat-icon">✅</span>
              <h3>{watchedMovies.length}</h3>
              <p>Watched</p>
            </div>

            <div className="stat-card">
              <span className="stat-icon">▶️</span>
              <h3>{watchingMovies.length}</h3>
              <p>Watching</p>
            </div>

            <div className="stat-card">
              <span className="stat-icon">📋</span>
              <h3>{queuedMovies.length}</h3>
              <p>Queued</p>
            </div>

            <div className="stat-card">
              <span className="stat-icon">⭐</span>
              <h3>{averageRating}</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </section>

        <section className="recent-section">
          <div className="section-heading">
            <h2>Recent Movies</h2>

            <Link to="/movies">
              View All →
            </Link>
          </div>

          <div className="movie-preview-grid">
            {movies.slice(-3).reverse().map((movie) => (
              <div className="movie-preview-card" key={movie.id}>
                <div className="movie-poster">
                  🎬
                </div>

                <div className="movie-preview-content">
                  <h3>{movie.title}</h3>

                  <p>
                    {movie.category} • {movie.year}
                  </p>

                  <div className="movie-meta">
                    <span>⭐ {movie.rating}/5</span>

                    <span className={`status ${movie.status.toLowerCase()}`}>
                      {movie.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {movies.length === 0 && (
              <p className="empty-message">
                No movies added yet.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;