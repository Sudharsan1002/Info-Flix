import PropTypes from "prop-types";
import axios from "axios";
import { useContext, useState, createContext } from "react";

const ApiContext = createContext();
export const useApi = () => useContext(ApiContext);

const API_KEY = "e4afe3a"; // Use your actual API key
const base_URL = "https://www.omdbapi.com/";

export const ApiProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Track if more movies are available

  const fetchMovies = async (searchQuery, page = 1, type = "") => {
    try {
      setLoading(true);
      setError(null);
      const params = { apikey: API_KEY, s: searchQuery, page };
      if (type) params.type = type; // Adding type parameter

      const { data } = await axios.get(base_URL, { params });
      if (data.Response === "True") {
        const newMovies = data.Search;

        // If this is the first page, replace the movies array; otherwise append new movies
        setMovies((prevMovies) => {
          const existingIds = new Set(prevMovies.map((movie) => movie.imdbID));
          const uniqueMovies = newMovies.filter(
            (movie) => !existingIds.has(movie.imdbID)
          );

          // Return new movies array by replacing if it's the first page or merging with existing
          return page === 1 ? uniqueMovies : [...prevMovies, ...uniqueMovies];
        });

        setTotalResults(data.totalResults);
        setHasMore(newMovies.length > 0 && movies.length < totalResults); // Check if there are more movies
        setCurrentPage(page);
      } else {
        setError(data.Error);
        setHasMore(false); // No more results if there's an error
      }
    } catch (err) {
      setError("An error occurred while fetching movies");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch a movie by its ID using axios
  const fetchMovieById = async (id) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
      );
      if (response.data.Response === "True") {
        return response.data; // Return the movie details if the response is successful
      } else {
        throw new Error(response.data.Error); // Throw an error with the message from the API
      }
    } catch (error) {
      throw new Error("Failed to fetch movie details: " + error.message);
    }
  };

  const value = {
    movies,
    loading,
    error,
    query,
    setError,
    fetchMovies,
    setQuery,
    currentPage,
    setCurrentPage,
    setMovies,
    hasMore,
    fetchMovieById, // Include fetchMovieById in the context value
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
