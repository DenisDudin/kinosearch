// import { Alert, Spin } from "antd";

import './movie-list.scss';
import { MovieCard } from '../movie-card/index.js';

const MovieList = () => {
  return (
    <section className="movies-container">
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
    </section>
  );
};

export default MovieList;
