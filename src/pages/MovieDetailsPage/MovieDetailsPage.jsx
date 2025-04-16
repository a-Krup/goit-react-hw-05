import { useEffect, useRef, useState } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router-dom";
import axios from "axios";
import styles from "./MovieDetailsPage.module.css";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZThmOTgzNzU5YTRlY2Y1MzVmOTVlNzhhZjRhMDViNSIsIm5iZiI6MTc0NDYzMjk1OC4zMTgsInN1YiI6IjY3ZmNmYzdlNDM3ZjBiODBlZWFjZjhiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4VB8_ZBztpYalbofVfqF1jxVPCdh3VkT99Y_zHIpQCg";
const defaultImg = "https://via.placeholder.com/250x375?text=No+Poster";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/movies");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );
        setMovie(res.data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const { title, poster_path, overview, genres, vote_average } = movie;

  return (
    <div className={styles.container}>
      <Link to={backLink.current} className={styles.backLink}>
        Go back
      </Link>
      <div className={styles.movieDetails}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : defaultImg
          }
          alt={title}
          width={250}
        />
        <div>
          <h2>{title}</h2>
          <p>User Score: {Math.round(vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h4>Genres</h4>
          <ul>
            {genres.map((g) => (
              <li key={g.id}>{g.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.additionalInfo}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast" state={{ from: backLink.current }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLink.current }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
}
