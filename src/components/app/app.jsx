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
      ratedMovieList: [],
      genres: [],
      loading: true,
      error: false,
      hasMovies: true,
      guestID: null,
      activeTab: 'search',
    };

    this._TABS = [
      {
        key: 'search',
        label: 'Search',
      },
      {
        key: 'rated',
        label: 'Rated',
      },
    ];

    this.service = new MovieService();
  }

  componentDidMount() {
    this.getMovies();
    this.getGenres();
    this.guestSession();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.text !== prevState.text ||
      this.state.currentPage !== prevState.currentPage ||
      this.state.activeTab !== prevState.activeTab
    ) {
      this.getMovies(this.state.text, this.state.currentPage);
    }
  }

  guestSession = () => {
    this.service.guestSession().then((guestID) => {
      this.setState({ guestID: guestID.guest_session_id });
    });
  };

  getGenres = () => {
    this.service.getGenres().then((genres) => {
      this.setState({ genres: genres });
    });
  };

  getMovies = (text = '', page = 1) => {
    this.state.activeTab === 'search'
      ? this.service.getMovies(text, page).then(this.createMovieList).catch(this.onError)
      : this.service.getRatedMovies(this.state.guestID, page).then(this.createMovieList).catch(this.onError);
  };

  createMovieList = (data) => {
    const newMovieList = data.results.map((movie) => {
      return { ...movie, rating: this.state.ratedMovieList[movie.id] };
    });
    this.setState({
      movieList: newMovieList,
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

  onChangeTab = (activeKey) => {
    this.setState({ activeTab: activeKey });
  };

  onChangePage = (page) => {
    this.setState({
      currentPage: page,
      loading: true,
    });
  };

  addRating = (value, movieID) => {
    this.service.addRating(value, this.state.guestID, movieID);

    const ratedMovieList = { ...this.state.ratedMovieList, [movieID]: value };
    this.setState({
      ratedMovieList: ratedMovieList,
    });
  };

  render() {
    const { totalPages, currentPage, totalResults, error, loading, hasMovies, text, movieList, activeTab } = this.state;
    const hasDate = !(error || loading);

    return (
      <main>
        <Tabs
          destroyInactiveTabPane={true}
          items={this._TABS}
          defaultActiveKey="search"
          centered
          size={'large'}
          onChange={(activeKey) => this.onChangeTab(activeKey)}
        />

        {activeTab !== 'rated' ? <SearchInput text={this.state.text} onSearchChange={this.onSearchChange} /> : null}

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

        {hasDate ? <MovieList data={this.state} addRating={this.addRating} /> : null}

        {totalResults ? (
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            movieList={movieList}
            onChangePage={this.onChangePage}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
