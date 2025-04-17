import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import styles from "./MoviesPage.module.css";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZThmOTgzNzU5YTRlY2Y1MzVmOTVlNzhhZjRhMDViNSIsIm5iZiI6MTc0NDYzMjk1OC4zMTgsInN1YiI6IjY3ZmNmYzdlNDM3ZjBiODBlZWFjZjhiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4VB8_ZBztpYalbofVfqF1jxVPCdh3VkT99Y_zHIpQCg";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [input, setInput] = useState(query);
  const [movies, setMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/search/movie",
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
            params: {
              query,
              include_adult: false,
              language: "en-US",
              page: 1,
            },
          }
        );

        const results = res.data.results;
        setMovies(results);

        if (results.length === 0) {
          setNotFound(true);

          timerRef.current = setTimeout(() => {
            navigate("/");
          }, 10000);
        } else {
          setNotFound(false);
          setInput("");
          clearTimeout(timerRef.current);
        }
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    };

    fetchMovies();

    return () => clearTimeout(timerRef.current);
  }, [query, navigate]);

  const handleChange = (e) => {
    setInput(e.target.value);
    clearTimeout(timerRef.current);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSearchParams({ query: input.trim() });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>

      {notFound ? <NotFoundPage /> : <MovieList movies={movies} />}
    </div>
  );
}
