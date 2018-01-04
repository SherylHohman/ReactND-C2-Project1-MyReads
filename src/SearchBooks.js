import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import * as BooksAPI from './BooksAPI';
import formatData from './utils/FormatData';
import PropTypes from 'prop-types';

class SearchBooks extends Component {

  static propTypes = {
    onChangeBookshelf: PropTypes.func.isRequired
    // bookshelves: PropTypes.array.isRequired
  }

  state = {
    query: '',
    booksSearch: []  // not named books, to avoid confusion in ReactDevTools
  }

  componentDidMount(){
    if (this.state.query) {
      this.getSearchResults();
    }
  }

  searchForBooks(){
    if (this.state.query) {
      // TODO: use search query, instead of hard-coded "React" query
      BooksAPI.search('React').then((booksAPIData) => {
        const booksSearch = formatData(booksAPIData)
        this.setState({ booksSearch });
      })
    }
  }

  updateQuery(e, query) {
    this.setState( {query: query.trim()} );

    // TODO: remove non alpha chars from query. Curated SEARCH_TERMS.md are alpha.
    // TODO: - either remove its "controlled aspect" (not required)
      // or advanced TODO: only update state if query (partial) matches a valid
      //    SEARCH_TERM.md
      // Corollary: only call API if query matches (exactly) a valid SEARCH_TERM
    }

  clearQuery() {
    this.setState( {query: ''} );
  }

  onSubmitHandler(e, query){
    e.preventDefault();
    this.searchForBooks(query);
  }

  render() {
    const tempBookshelvesDUPLICATED = [
      {shelf: "currentlyReading", shelfTitle: "Currently Reading"},
      {shelf: "wantToRead",       shelfTitle: "Want To Read"},
      {shelf: "read",             shelfTitle: "Did Read"}
    ];

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
          </div>
        </div>

        {this.state.booksSearch ? (
          <div className="search-books-results">
            <ol className="books-grid">
                  <Bookshelf
                    books={this.state.booksSearch}
                    shelfTitle={this.state.query}
                    shelf={'none'}
                    onChangeBookshelf={this.props.onChangeBookshelf}
                    bookshelves={tempBookshelvesDUPLICATED}
                  />
            </ol>
          </div>

        ) : (
          <h2>Let's find some more books !</h2>
        )}
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
