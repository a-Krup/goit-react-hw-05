import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZThmOTgzNzU5YTRlY2Y1MzVmOTVlNzhhZjRhMDViNSIsIm5iZiI6MTc0NDYzMjk1OC4zMTgsInN1YiI6IjY3ZmNmYzdlNDM3ZjBiODBlZWFjZjhiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4VB8_ZBztpYalbofVfqF1jxVPCdh3VkT99Y_zHIpQCg';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        setMovies(res.data.results);
      } catch (err) {
        console.error('Error fetching trending movies:', err);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
}