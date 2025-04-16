import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZThmOTgzNzU5YTRlY2Y1MzVmOTVlNzhhZjRhMDViNSIsIm5iZiI6MTc0NDYzMjk1OC4zMTgsInN1YiI6IjY3ZmNmYzdlNDM3ZjBiODBlZWFjZjhiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4VB8_ZBztpYalbofVfqF1jxVPCdh3VkT99Y_zHIpQCg";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [input, setInput] = useState(query);
  const [movies, setMovies] = useState([]);

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
        setMovies(res.data.results);
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    };

    fetchMovies();
  }, [query]);

  const handleChange = (e) => setInput(e.target.value);

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
      <MovieList movies={movies} />
    </div>
  );
}
