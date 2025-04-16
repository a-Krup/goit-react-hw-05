import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 480);

  // Перевірка на зміну розміру екрану
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 480);
    };

    window.addEventListener('resize', handleResize);
    
    // Очистка події при розмонтажі компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ul className={styles.list}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={styles.listItem}>
          {isLargeScreen && poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
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
