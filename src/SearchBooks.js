import React, {Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import formatData from './utils/FormatData';

class SearchBooks extends Component {

  // static propTypes = {
  //   filterBookData: PropTypes.func.isRequired
  // }

  state = {
    query: '',
    booksSearch: []  // not named books, to avoid confusion in ReactDevTools
  }

  componentDidMount(){
    console.log('..in componentDidMount..');
    console.log('query at componentDidMount:', this.state.query);
    console.log('booksSearch at componentDidMount:', this.state.booksSearch);

    if (this.state.query) {
      this.getSearchResults();
    }
    console.log('exiting componentDidMount.\n');
  }

  searchForBooks(){

    console.log('-----------in searchForBooks..');
    console.log('state', this.state);
    if (this.state.query) {

      // temp - debugging why this doesn't work in SearchBooks. Does work Here!
      console.log('about to Search DB for React..');
      BooksAPI.search('React').then((booksAPIData) => {
        console.log('fetched React: ', booksAPIData);

        // filter out and reformat data before storing it into state
        const booksSearch = formatData(booksAPIData)
        this.setState({ booksSearch });
        console.log('books React: ', this.state.booksSearch);

      })
      console.log('--------..leaving searchForBooks');
    }

  }

  updateQuery(e, query) {

    e.preventDefault();
    console.log("(e) q:",e.target.value);

    console.log('in updateQuery..');
    // Hmm... why is updateQuery running at onSubmit ?
    // e.preventDefault();
    console.log('beforesSs query: ', this.state.query);
    console.log('updating query to:', query.trim());
    this.setState( {query: query.trim()} );
    console.log('aftersS query: ', this.state.query);
  }

  clearQuery(query) {
    console.log('in clearQuery..');
    console.log('resetting query to ""');
    this.setState( {query: ''} );
    console.log('query: ', this.state.query);
  }

  onSubmitHandler(e, query){
    console.log('*******in onSubmitHandler..');
    e.preventDefault();

    // console.log('..searching for books..', this.state.query);
    this.searchForBooks(query);
    console.log("************..leaving onSubmitHandler..\n");
  }


  render() {

    console.log('..rendering..');
    console.log('r state:', this.state);
    console.log('r state.bookSearch:', this.state.booksSearch);
    console.log('r state.query:', this.state.query);
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
              {/* HTML5 supports "hidden" property, so submit button not seen
                  Note: buttons always default to submit.
                  submit <button> or <input> REQUIRED for form onSubmit to work.
                  First "submit" field listed
                    (includes buttons that aren't *specifically* "type=" otherwise)
                  is the data that gets passed as "e" to form's onSubmit.
                  Hence, if don't have a "submit" <button> or <input>
                    Then event passed to form's onSubmit will be UNDEFINED !
                  Button *woulb be* ugly here. Fortunately, HTML 5 "hidden"
                    attribute to the rescue. (solves issues with workarounds in various browsers prior to its availability)
                */}
              {/*<button type="submit" hidden>Search for Books</button>*/}
              <button>Search for Books</button>
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
