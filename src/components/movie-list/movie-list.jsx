import './movie-list.scss';
import { MovieCard } from '../movie-card/index.js';

const MovieList = ({ props }) => {
  const { movieList } = props;
  const movies = movieList.map((movie) => {
    return <MovieCard key={movie.id} movie={movie} />;
  });

  return <section className="movies-container">{movies}</section>;
};

export default MovieList;
