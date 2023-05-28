import { Rate } from 'antd';

import './movie-card.scss';

const COUNT_STARS = 10;

const MovieCard = () => {
  return (
    <div className="movie-card">
      <div className="movie-card__img-container">
        <img src="http://placehold.it/250x400/" alt="" className="movie-card__img" />
      </div>

      <div className="movie-card__title">
        <p className="movie-card__name">The way back</p>
        <div className="movie-card__score">5.5</div>
      </div>

      <p className="movie-card__date">March 5, 2020</p>

      <div className="movie-card__genres genres">
        <div className="genres__item">Action</div>
        <div className="genres__item">Drama</div>
      </div>

      <p className="movie-card__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet voluptas, est sequi voluptatem quaerat ab autem
        impedit harum perferendis totam optio voluptate illum fuga accusantium sit provident nobis quasi animi?
      </p>

      <Rate className="movie-card__rate" count={COUNT_STARS} />
    </div>
  );
};

export default MovieCard;
