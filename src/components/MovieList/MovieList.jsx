import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./MovieList.module.css";

const fallbackImages = [
  "https://via.placeholder.com/300x450?text=No+Image",
  "https://placehold.co/300x450?text=No+Poster",
  "https://dummyimage.com/300x450/cccccc/000000&text=No+Cover",
];

export default function MovieList({ movies }) {
  const location = useLocation();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 480);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getImage = (poster_path) => {
    if (poster_path) {
      return `https://image.tmdb.org/t/p/w500/${poster_path}`;
    }

    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    return fallbackImages[randomIndex];
  };

  return (
    <ul className={styles.list}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={styles.listItem}>
          {isLargeScreen && (
            <img
              src={getImage(poster_path)}
              alt={title}
              className={styles.poster}
            />
          )}
          <Link to={`/movies/${id}`} state={{ from: location }}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
