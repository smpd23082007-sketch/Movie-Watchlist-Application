import { useState } from "react";
import { useMovies } from "../components/MovieContext";
import Navbar from "../components/Navbar";

function Movies() {
  const { movies, setMovies } = useMovies();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [editingMovie, setEditingMovie] = useState(null);

  const categories = [
    "All",
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "Animation",
    "Documentary"
  ];

  const statuses = [
    "All",
    "Queued",
    "Watching",
    "Watched"
  ];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      movie.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      movie.status === statusFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus
    );
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmDelete) {
      return;
    }

    setMovies(
      movies.filter((movie) => movie.id !== id)
    );
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditingMovie({
      ...editingMovie,
      [name]: value
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    if (!editingMovie.title.trim()) {
      alert("Movie title cannot be empty.");
      return;
    }

    setMovies(
      movies.map((movie) =>
        movie.id === editingMovie.id
          ? {
              ...editingMovie,
              title: editingMovie.title.trim(),
              rating: Number(editingMovie.rating),
              year: Number(editingMovie.year)
            }
          : movie
      )
    );

    setEditingMovie(null);
  };

  return (
    <>
      <Navbar />

      <main className="movies-page">

        <section className="page-header">
          <h1>My Movies</h1>
          <p>
            Search, filter and manage your movie watchlist.
          </p>
        </section>

        <section className="filters">

          <div className="filter-group">
            <label htmlFor="search">
              Search Movies
            </label>

            <input
              id="search"
              type="text"
              placeholder="Search by movie title..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <div className="filter-group">
            <label htmlFor="categoryFilter">
              Category
            </label>

            <select
              id="categoryFilter"
              value={categoryFilter}
              onChange={(event) =>
                setCategoryFilter(event.target.value)
              }
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="statusFilter">
              Status
            </label>

            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              {statuses.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>
          </div>

        </section>

        <section className="movie-list">

          <div className="movie-list-header">
            <h2>
              Movies ({filteredMovies.length})
            </h2>
          </div>

          {filteredMovies.length === 0 ? (
            <div className="empty-state">
              <h3>No movies found</h3>
              <p>
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="movie-grid">

              {filteredMovies.map((movie) => (
                <article
                  className="movie-card"
                  key={movie.id}
                >

                  <div className="movie-card-top">
                    <span className="movie-category">
                      {movie.category}
                    </span>

                    <span
                      className={`movie-status ${movie.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {movie.status}
                    </span>
                  </div>

                  <h3>{movie.title}</h3>

                  <p className="movie-year">
                    🎬 {movie.year}
                  </p>

                  <p className="movie-rating">
                    {"⭐".repeat(movie.rating)}
                    {"☆".repeat(5 - movie.rating)}
                  </p>

                  <p className="movie-description">
                    {movie.description ||
                      "No description available."}
                  </p>

                  <div className="movie-actions">

                    <button
                      className="edit-button"
                      onClick={() =>
                        setEditingMovie({ ...movie })
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDelete(movie.id)
                      }
                    >
                      🗑 Delete
                    </button>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

        {editingMovie && (
          <div className="modal-overlay">

            <div className="edit-modal">

              <h2>Edit Movie</h2>

              <form onSubmit={handleUpdate}>

                <div className="form-group">
                  <label>Movie Title</label>

                  <input
                    type="text"
                    name="title"
                    value={editingMovie.title}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>

                  <select
                    name="category"
                    value={editingMovie.category}
                    onChange={handleEditChange}
                  >
                    {categories
                      .filter(
                        (category) => category !== "All"
                      )
                      .map((category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Rating</label>

                  <select
                    name="rating"
                    value={editingMovie.rating}
                    onChange={handleEditChange}
                  >
                    <option value="1">⭐ 1 / 5</option>
                    <option value="2">⭐⭐ 2 / 5</option>
                    <option value="3">⭐⭐⭐ 3 / 5</option>
                    <option value="4">⭐⭐⭐⭐ 4 / 5</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5 / 5</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Viewing Status</label>

                  <select
                    name="status"
                    value={editingMovie.status}
                    onChange={handleEditChange}
                  >
                    <option value="Queued">
                      Queued
                    </option>

                    <option value="Watching">
                      Watching
                    </option>

                    <option value="Watched">
                      Watched
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Release Year</label>

                  <input
                    type="number"
                    name="year"
                    min="1888"
                    max={new Date().getFullYear()}
                    value={editingMovie.year}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>

                  <textarea
                    name="description"
                    rows="4"
                    value={editingMovie.description}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="form-actions">

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() =>
                      setEditingMovie(null)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="primary-button"
                  >
                    Save Changes
                  </button>

                </div>

              </form>

            </div>

          </div>
        )}

      </main>
    </>
  );
}

export default Movies;