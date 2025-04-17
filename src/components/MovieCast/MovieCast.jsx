import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieCast.module.css";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZThmOTgzNzU5YTRlY2Y1MzVmOTVlNzhhZjRhMDViNSIsIm5iZiI6MTc0NDYzMjk1OC4zMTgsInN1YiI6IjY3ZmNmYzdlNDM3ZjBiODBlZWFjZjhiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4VB8_ZBztpYalbofVfqF1jxVPCdh3VkT99Y_zHIpQCg";

const fallbackAvatars = [
  "https://via.placeholder.com/200x300?text=No+Photo",
  "https://dummyimage.com/200x300/cccccc/000000&text=No+Face",
  "https://placehold.co/200x300?text=Unknown+Actor",
];

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    const fetchCast = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );
        setCast(res.data.cast);
      } catch (err) {
        console.error("Error fetching cast:", err);
      }
    };

    fetchCast();
  }, [movieId]);

  const getProfileImage = (path) => {
    if (path) {
      return `https://image.tmdb.org/t/p/w200${path}`;
    }
    const randomIndex = Math.floor(Math.random() * fallbackAvatars.length);
    return fallbackAvatars[randomIndex];
  };

  return (
    <div className={styles.container}>
      <h3>Cast</h3>
      <ul className={styles.list}>
        {cast.map(({ id, name, profile_path, character }) => (
          <li key={id} className={styles.item}>
            <img src={getProfileImage(profile_path)} alt={name} width={200} />
            <p>
              <strong>{name}</strong>
            </p>
            <p>Character: {character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
