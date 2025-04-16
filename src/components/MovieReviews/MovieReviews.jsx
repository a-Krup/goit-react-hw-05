import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZThmOTgzNzU5YTRlY2Y1MzVmOTVlNzhhZjRhMDViNSIsIm5iZiI6MTc0NDYzMjk1OC4zMTgsInN1YiI6IjY3ZmNmYzdlNDM3ZjBiODBlZWFjZjhiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4VB8_ZBztpYalbofVfqF1jxVPCdh3VkT99Y_zHIpQCg';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        setReviews(res.data.results);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p><strong>{author}</strong></p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
