import { Rate } from 'antd';
import { format } from 'date-fns';

import './movie-card.scss';

const COUNT_STARS = 10;
const MAX_DESCRIPTION = 200;
const MIN_TITLE = 17;
const NO_DATE = 'Unknown';
const FORMAT_DATE = 'MMMM d, yyyy';

const cutText = (text, length) => {
  if (text.length > length) {
    const shortText = text.slice(0, length).split(' ');
    shortText.pop();
    return `${shortText.join(' ')} ...`;
  } else {
    return text;
  }
};

const colorVote = (vote) => {
  let classColor = '';
  if (vote > 7) {
    classColor = 'movie-card__score--best';
  } else if (vote > 5) {
    classColor = 'movie-card__score--good';
  } else if (vote > 3) {
    classColor = 'movie-card__score--normal';
  } else {
    classColor = 'movie-card__score--bad';
  }
  return 'movie-card__score ' + classColor;
};

const getGenres = (genres, genresIds) => {
  if (!genresIds.length) return 'Unknown genre';
  if (genresIds.length > 4) genresIds.length = 4;

  const genreList = genres.reduce((list, genre) => {
    if (genresIds.includes(genre.id)) {
      list.push(genre.name);
    }
    return list;
  }, []);

  return genreList.map((genre) => {
    return (
      <div className="genres__item" key={genre}>
        {genre}
      </div>
    );
  });
};

const MovieCard = (props) => {
  const genres = props.genres;

  const {
    id: movieID,
    original_title: title,
    overview: description,
    vote_average: vote,
    release_date: date,
    poster_path: img,
    genre_ids: genresIds,
    rating: rating,
  } = props.movie;

  const addRating = props.addRating;

  return (
    <div className="movie-card">
      <div className="movie-card__img-container">
        <img src={`https://image.tmdb.org/t/p/w500/${img}`} alt={title} className="movie-card__img" />
      </div>

      <div className="movie-card__title">
        <p className="movie-card__name">{cutText(title, MIN_TITLE)}</p>
        <div className={colorVote(vote)}>{vote.toFixed(1)}</div>
      </div>

      <p className="movie-card__date">{date ? format(new Date(date), FORMAT_DATE) : NO_DATE}</p>

      <div className="movie-card__genres genres">{getGenres(genres, genresIds)}</div>

      <p className="movie-card__description">{cutText(description, MAX_DESCRIPTION)}</p>

      <Rate
        className="movie-card__rate"
        value={rating}
        count={COUNT_STARS}
        onChange={(value) => addRating(value, movieID)}
      />
    </div>
  );
};

export default MovieCard;
