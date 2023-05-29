import { Rate } from 'antd';

import './movie-card.scss';

const COUNT_STARS = 10;

const MovieCard = (props) => {
  const {
    original_title: title,
    overview: description,
    vote_average: vote,
    release_date: date,
    poster_path: img,
  } = props.movie;

  return (
    <div className="movie-card">
      <div className="movie-card__img-container">
        <img src={`https://image.tmdb.org/t/p/w500/${img}`} alt={title} className="movie-card__img" />
      </div>

      <div className="movie-card__title">
        <p className="movie-card__name">{title}</p>
        <div className="movie-card__score">{vote.toFixed(1)}</div>
      </div>

      <p className="movie-card__date">{date}</p>

      <div className="movie-card__genres genres">
        <div className="genres__item">Action</div>
        <div className="genres__item">Drama</div>
      </div>

      <p className="movie-card__description">{description}</p>

      <Rate className="movie-card__rate" count={COUNT_STARS} />
    </div>
  );
};

export default MovieCard;
