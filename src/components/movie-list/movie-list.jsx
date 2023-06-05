import './movie-list.scss';
import { MovieCard } from '../movie-card/index.js';

const MovieList = ({ data, addRating }) => {
  const { movieList, genres } = data;
  const addRatings = addRating;

  const movies = movieList.map((movie) => {
    return <MovieCard key={movie.id} movie={movie} genres={genres} addRating={addRatings} />;
  });

  return <section className="movies-container">{movies}</section>;
};

export default MovieList;
