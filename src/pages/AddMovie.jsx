import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../components/MovieContext";
import Navbar from "../components/Navbar";

function AddMovie() {
  const { movies, setMovies } = useMovies();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    rating: "",
    status: "Queued",
    year: "",
    description: ""
  });

  const [error, setError] = useState("");

  const categories = [
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

  const currentYear = new Date().getFullYear();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Please enter a movie title.");
      return;
    }

    if (!formData.category) {
      setError("Please select a category.");
      return;
    }

    if (!formData.rating) {
      setError("Please select a rating.");
      return;
    }

    if (!formData.year) {
      setError("Please enter the release year.");
      return;
    }

    const year = Number(formData.year);

    if (year < 1888 || year > currentYear) {
      setError(
        `Please enter a year between 1888 and ${currentYear}.`
      );
      return;
    }

    const newMovie = {
      id: Date.now(),
      title: formData.title.trim(),
      category: formData.category,
      rating: Number(formData.rating),
      status: formData.status,
      year: year,
      description: formData.description.trim()
    };

    setMovies([...movies, newMovie]);

    setFormData({
      title: "",
      category: "",
      rating: "",
      status: "Queued",
      year: "",
      description: ""
    });

    navigate("/movies");
  };

  return (
    <>
      <Navbar />

      <main className="add-movie-page">
        <section className="page-header">
          <h1>Add New Movie</h1>
          <p>
            Add a movie to your personal watchlist.
          </p>
        </section>

        <section className="form-container">
          <form onSubmit={handleSubmit}>

            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="title">
                Movie Title *
              </label>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter movie title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="category">
                  Category *
                </label>

                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">
                    Select category
                  </option>

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rating">
                  Rating *
                </label>

                <select
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                >
                  <option value="">
                    Select rating
                  </option>

                  <option value="1">⭐ 1 / 5</option>
                  <option value="2">⭐⭐ 2 / 5</option>
                  <option value="3">⭐⭐⭐ 3 / 5</option>
                  <option value="4">⭐⭐⭐⭐ 4 / 5</option>
                  <option value="5">⭐⭐⭐⭐⭐ 5 / 5</option>
                </select>
              </div>

            </div>

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="status">
                  Viewing Status *
                </label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
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
                <label htmlFor="year">
                  Release Year *
                </label>

                <input
                  id="year"
                  name="year"
                  type="number"
                  min="1888"
                  max={currentYear}
                  placeholder="e.g. 2024"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="5"
                placeholder="Write a short description..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/movies")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                + Add Movie
              </button>
            </div>

          </form>
        </section>
      </main>
    </>
  );
}

export default AddMovie;