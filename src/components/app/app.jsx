import { Component } from 'react';
import { Tabs, Spin, Alert } from 'antd';

import { SearchInput } from '../search-input/index.js';
import { MovieList } from '../movie-list/index.js';
import { PaginationComponent } from '../pagination/index.js';
import MovieService from '../../services/movie-service.js';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      totalPages: null,
      currentPage: 1,
      totalResults: null,
      movieList: [],
      loading: true,
      error: false,
      hasMovies: true,
    };
  }

  componentDidMount() {
    const list = new MovieService();
    list.getMovies().then(this.createMovieList).catch(this.onError);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.text !== prevState.text || this.state.currentPage !== prevState.currentPage) {
      const list = new MovieService();
      list.getMovies(this.state.text, this.state.currentPage).then(this.createMovieList).catch(this.onError);
    }
  }

  createMovieList = (data) => {
    this.setState({
      movieList: data.results,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      loading: false,
      hasMovies: Boolean(data.total_results),
    });
  };

  onError = (error) => {
    console.log(error);
    this.setState({
      error: true,
      loading: false,
    });
  };

  onSearchChange = (text) => {
    this.setState({ text: text, loading: true, currentPage: 1 });
  };

  onChangeTab = (e) => {
    this.setState((state) => {
      return {
        ...state,
        currentPage: e,
        loading: true,
      };
    });
  };

  render() {
    const { totalPages, currentPage, totalResults, error, loading, hasMovies, text, movieList } = this.state;
    const hasDate = !(error || loading);

    return (
      <main>
        <Tabs destroyInactiveTabPane={true} centered />
        <SearchInput text={this.state.text} onSearchChange={this.onSearchChange} />
        {error ? (
          <Alert message="Error" description="Something went wrong! Try reloading the page" type="error" showIcon />
        ) : null}
        {!hasMovies && text ? (
          <Alert
            message="Error"
            description="Film not found. Possible request error or check your network"
            type="error"
            showIcon
          />
        ) : null}
        {loading ? <Spin size="large" /> : null}
        {hasDate ? <MovieList props={this.state} /> : null}
        {totalResults ? (
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            movieList={movieList}
            onChangeTab={this.onChangeTab}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
