import React from 'react';

const SearchBooks = function(props) {
  return (

          <div className="search-books">

            <div className="search-books-bar">

              {/* TODO: Route or history, (don't even have "state" here) */}
              <a className="close-search"
                  onClick={() => this.setState(
                    { showSearchPage: false }
                  )}>Close
              </a>

              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title or author"
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
};

export default SearchBooks;

{/*
  NOTES: The search from BooksAPI is limited to a particular set of search terms.
  You can find these search terms here:
  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
  you don't find a specific author or title. Every search is limited by search terms.
*/}
