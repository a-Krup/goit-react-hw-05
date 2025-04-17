import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZThmOTgzNzU5YTRlY2Y1MzVmOTVlNzhhZjRhMDViNSIsIm5iZiI6MTc0NDYzMjk1OC4zMTgsInN1YiI6IjY3ZmNmYzdlNDM3ZjBiODBlZWFjZjhiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4VB8_ZBztpYalbofVfqF1jxVPCdh3VkT99Y_zHIpQCg";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const fullTitle = "Trending today";

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      const nextChar = fullTitle.charAt(index);
      if (nextChar) {
        setTitle((prev) => prev + nextChar);
        index++;
      } else {
        clearInterval(interval);
        fetchTrendingMovies();
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day",
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      setMovies(res.data.results);
    } catch (err) {
      console.error("Error fetching trending movies:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.animatedTitle}>{title}</h1>
      {isLoading ? <p>Loading movies...</p> : <MovieList movies={movies} />}
    </div>
  );
}
