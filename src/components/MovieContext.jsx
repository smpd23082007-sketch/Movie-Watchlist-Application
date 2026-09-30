import { createContext, useContext, useEffect, useState } from "react";
import initialMovies from "../data/movies";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");

    return savedMovies
      ? JSON.parse(savedMovies)
      : initialMovies;
  });

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  return useContext(MovieContext);
}