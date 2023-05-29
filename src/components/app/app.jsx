import { Component } from 'react';
import { Pagination, Tabs, Spin } from 'antd';

import { SearchInput } from '../search-input/index.js';
import { MovieList } from '../movie-list/index.js';
import MovieService from '../../services/movie-service.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      totalPages: null,
      totalResults: null,
      movieList: [],
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
    const list = new MovieService();
    list.getMovies().then(this.createMovieList).catch(this.onError);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.text !== prevState.text) {
      console.log(this.state.text, prevState.text);
      const list = new MovieService();
      list.getMovies(this.state.text).then(this.createMovieList).catch(this.onError);
    }
  }

  createMovieList = (data) => {
    this.setState({
      movieList: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      loading: false,
    });
  };

  onError = (error) => {
    console.log(error);
    this.setState({
      error: true,
    });
  };

  onSearchChange = (text) => {
    this.setState({ text: text });
  };

  render() {
    return (
      <main>
        <Tabs destroyInactiveTabPane={true} centered />
        <SearchInput text={this.state.text} onSearchChange={this.onSearchChange} />
        {this.loading ? <Spin size="large" /> : <MovieList props={this.state} />}
        <Pagination />
      </main>
    );
  }
}

export default App;
