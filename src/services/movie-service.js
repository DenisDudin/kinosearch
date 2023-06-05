export default class MovieService {
  constructor() {
    this._baseURL = 'https://api.themoviedb.org';
    this._apiKey = '4a72c611c2f51cf9978438c88da4db5e';
  }

  async getResource(url, options = null) {
    const res = await fetch(`${this._baseURL + url}`, options);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  async getGenres() {
    const res = await this.getResource(`/3/genre/movie/list?api_key=${this._apiKey}`);

    return res.genres;
  }

  async guestSession() {
    const res = await this.getResource(`/3/authentication/guest_session/new?api_key=${this._apiKey}`);

    return res;
  }

  async addRating(value, guestId, movieId) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: value }),
    };

    const res = await this.getResource(
      `/3/movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${guestId}`,
      options
    );

    return res;
  }

  async getRatedMovies(guestId, pageNum = 1) {
    const res = await this.getResource(
      `/3/guest_session/${guestId}/rated/movies?api_key=${this._apiKey}&&page=${pageNum}`
    );
    return res;
  }

  async getMovies(searchWord = '', pageNum = 1) {
    const res = await this.getResource(
      `/3/search/movie?query=${searchWord}&include_adult=false&language=en-US&page=${pageNum}&api_key=${this._apiKey}`
    );

    return res;
  }
}
