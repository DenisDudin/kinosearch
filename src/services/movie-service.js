export default class MovieService {
  // _API_KEY = '4a72c611c2f51cf9978438c88da4db5e';

  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.ststus}`);
    }
    return await res.json();
  }

  _getData(movie) {
    return {
      title: movie.title,
      releaseDate: movie.release_date,
      overview: movie.overview,
      posterPath: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
    };
  }

  async getMovies(searchWord = 'shrek', pageNum = 1) {
    const res = await this.getResource(
      `https://api.themoviedb.org/3/search/movie?query=${searchWord}&include_adult=false&language=en-US&page=${pageNum}&api_key=4a72c611c2f51cf9978438c88da4db5e`
    );

    return res;
  }
}
