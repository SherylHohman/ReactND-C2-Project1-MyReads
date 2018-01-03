import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import formatData from './utils/FormatData';

class SearchBooks extends Component {

  state = {
    query: '',
    booksSearch: []  // not named books, to avoid confusion in ReactDevTools
  }

  componentDidMount(){
    console.log('..in componentDidMount..: SearchBooks');
    console.log('query at componentDidMount:', this.state.query);
    console.log('booksSearch at componentDidMount:', this.state.booksSearch);

    if (this.state.query) {
      this.getSearchResults();
    }
    console.log('exiting componentDidMount.. (SearchBooks)\n');
  }

  searchForBooks(){

    console.log('--in searchForBooks..');
    console.log('state', this.state);
    if (this.state.query) {

      // temp - debugging why this doesn't work in SearchBooks. Does work Here!
      console.log('about to Search DB for React..');
      BooksAPI.search('React').then((booksAPIData) => {
        console.log('fetched React: (allAPIdata): ', booksAPIData);

        // filter out and reformat data before storing it into state
        const booksSearch = formatData(booksAPIData)
        this.setState({ booksSearch });
        console.log('booksSearch: ', this.state.booksSearch);

      })
    }

  }

  updateQuery(e, query) {

    // TODO: remove non alpha chars from query. Curated SEARCH_TERMS.md are alpha.
    console.log('updating query to:', query.trim());

    this.setState( {query: query.trim()} );
    // as it stands, search box does not need to be a controlled component
    // TODO: - either remove its "controlled aspect" (not required)
    // or advanced TODO: only update state if query (partial) matches a valid
    //    SEARCH_TERM.md
    // Corollary: only call API if query matches (exactly) a valid SEARCH_TERM
  }

  clearQuery(query) {
    console.log('in clearQuery..');
    console.log('resetting query to ""');
    this.setState( {query: ''} );
    console.log('query: ', this.state.query);
  }

  onSubmitHandler(e, query){
    console.log('*in onSubmitHandler..', query);
    e.preventDefault();

    this.searchForBooks(query);
    console.log("*..leaving onSubmitHandler..\n");
  }


  render() {

    console.log('..rendering..');
    // console.log('r state:', this.state);
    // console.log('r state.bookSearch:', this.state.booksSearch);
    // console.log('r state.query:', this.state.query);
    return (

      <div className="search-books">

        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <form onSubmit={(e) => {this.onSubmitHandler(e, this.state.query)}}>
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={ (event) => {this.updateQuery(event, event.target.value)} }
              />
              <button type="submit" hidden>Search for Books</button>

            </form>

          </div> {/* search-books-input-wrapper */}
        </div> {/* search-books-bar */}

        <div className="search-books-results">
          <ol className="books-grid">
            {/* TODO: Show Results of search */}
          </ol>
        </div> {/* search-books-results */}

      </div> /* search-books */

    );
  }
};

export default SearchBooks;

/*
  NOTES: The search from BooksAPI is limited to a particular set of search terms.
  You can find these search terms here:
  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
  you don't find a specific author or title. Every search is limited by search terms.
*/
