import debounce from "lodash.debounce";
import { useCallback, useRef, useState, useEffect } from "react";
import { useApi } from "../Contexts/ApiContext";
import image1 from "../assets/image 1.png";
import { useMovie } from "../Contexts/MovieContext";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const {
    movies,
    fetchMovies,
    loading,
    error,
    setMovies,
    setCurrentPage,
    hasMore,
  } = useApi();

  const [localQuery, setLocalQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const { setSelectedMovie } = useMovie();
  const observer = useRef();
  const navigate=useNavigate()

  // Debounced fetchMovies function
  const debouncedFetchMovies = useCallback(
    debounce((localQuery, page, selectedType) => {
      if (hasMore && !loading) {
        fetchMovies(localQuery, page, selectedType);
      }
    }, 300),
    [fetchMovies, hasMore, loading]
  );

  // Intersection observer to load more movies
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = Math.floor(movies.length / 10) + 1;
          debouncedFetchMovies(localQuery, nextPage, selectedType);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, localQuery, movies, hasMore, debouncedFetchMovies]
  );

  const handleSearch = () => {
    if (localQuery.trim()) {
      setMovies([]);
      setCurrentPage(1);
      fetchMovies(localQuery, 1, selectedType);
      setLocalQuery(""); // Clear search input after submission
    }
  };

  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && localQuery.trim()) {
      handleSearch();
    }
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setMovies([]);
    setCurrentPage(1);
    if (localQuery) {
      fetchMovies(localQuery, 1, e.target.value);
    }
  };

 const handleViewInfo = (movie) => {
   setSelectedMovie(movie); // Set the selected movie in the context
   navigate(`/movies/${movie.imdbID}`); // Navigate to the movie details page
 };

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col my-4 mx-6 h-screen">
      <div
        className="rounded-xl md:flex-row md:items-center flex flex-col items-center gap-y-4 justify-center relative object-cover h-1/3 bg-center opacity-70"
        style={{
          backgroundImage: `url(${image1})`,
        }}
      >
        <input
          type="text"
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Search for movies"
          value={localQuery}
          className="w-1/2 rounded-md hover:outline-cyan-600 text-black p-2"
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
        <select
          className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-center mt-4">Error: {error}</p>}

      <div className="flex-1 overflow-y-auto mt-4 object-cover">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-screen-lg mx-auto">
          {movies.map((movie, index) => {
            const isLastMovie = movies.length === index + 1;
            return (
              <div
                key={movie.imdbID}
                ref={isLastMovie ? lastMovieElementRef : null}
                className="flex flex-col items-center bg-white p-2 gap-4 rounded-lg shadow-md dark:bg-slate-700"
              >
                <div className="w-full h-72 overflow-hidden flex items-center justify-center">
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.Title}
                    className="w-full h-auto rounded-md"
                  />
                </div>
                <p className="text-center mt-2 text-sm line-clamp-2 font-semibold">
                  {movie.Title}
                </p>
                <button
                  onClick={() => handleViewInfo(movie)}
                  className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                  View Info
                </button>
              </div>
            );
          })}
        </div>

        {loading && <p className="text-center mt-4">Loading more movies...</p>}
        {!loading && !hasMore && movies.length > 0 && (
          <p className="text-center mt-4">No more movies to display.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
