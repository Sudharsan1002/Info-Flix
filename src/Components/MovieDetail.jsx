import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApi } from "../Contexts/ApiContext";

const MovieDetail = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const { fetchMovieById } = useApi(); // Access fetchMovieById from context
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieById(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id, fetchMovieById]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return <p>No movie found!</p>;

  return (
    <div className="my-6 p-4 max-w-4xl mx-auto bg-white shadow-lg rounded-lgdark:bg-gradient-to-bl dark:from-slate-700 dark:to-slate-400 bg-gradient-to-tr from-blue-100 to-yellow-100 min-h-screen  dark:text-white rounded-lg">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        onClick={() => navigate(-1)} // Navigate back
      >
        Back
      </button>

      <h2 className="text-2xl font-bold mb-4">{movie.Title}</h2>

      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie.Title}
        className="mb-4 w-full max-w-sm mx-auto rounded-md italic"
      />

      <div className="mb-4">
        <p className="mb-2 italic">
          <strong>Plot:</strong> {movie.Plot || "N/A"}
        </p>
        <p className="mb-2 italic">
          <strong>Cast:</strong> {movie.Actors || "N/A"}
        </p>
        <p className="mb-2 italic">
          <strong>Genre:</strong> {movie.Genre || "N/A"}
        </p>
        <p className="mb-2 italic">
          <strong>Release Date:</strong> {movie.Released || "N/A"}
        </p>
      </div>

      {movie.Ratings && movie.Ratings.length > 0 && (
        <div className="mb-4 italic">
          <strong>Ratings:</strong>
          {movie.Ratings.map((rating, index) => (
            <p key={index} className="block">
              {rating.Source}: {rating.Value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
