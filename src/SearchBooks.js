import React, {Component } from 'react';
import { Link } from 'react-router-dom';

class SearchBooks extends Component {

  state = {
    query: ''
  }

  updateQuery(query) {
    this.setState( {query: query.trim()} );
  }

  render() {
    return (

      <div className="search-books">

        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={ (event) => {this.updateQuery(event.target.value)}}
            />

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
