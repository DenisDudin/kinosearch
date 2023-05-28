import { Component } from 'react';
import { Pagination, Tabs } from 'antd';

import { SearchInput } from '../search-input/index.js';
import { MovieList } from '../movie-list/index.js';
import MovieService from '../../services/movie-service.js';

//const API_KEY = "4a72c611c2f51cf9978438c88da4db5e";

class App extends Component {
  constructor(props) {
    super(props);
  }

  getData() {
    fetch('https://api.themoviedb.org/3/movie/changes')
      .then((res) => res.json())
      .then(
        (result) => {
          return result;
        },
        (error) => {
          return error.json;
        }
      );
  }

  render() {
    const mapiService = new MovieService();
    console.log(mapiService.getMovies());

    return (
      <main>
        <Tabs destroyInactiveTabPane={true} centered />
        <SearchInput />
        <MovieList />
        <Pagination />
      </main>
    );
  }
}

export default App;
