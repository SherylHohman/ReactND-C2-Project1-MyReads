import React, {Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import BooksAPI from './BooksAPI';
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
    // if (this.state.query) {

    // //   BooksAPI.search(this.state.query).then((booksAPIData) => {
    // //     console.log('CDM searched', booksAPIData);
    // //     // const booksSearch = this.props.filterBookData(booksAPIData);
    // //     // this.setState({ booksSearch });

    // //     console.log('CDM booksSearch', this.state.booksSearch);
    // //   });
    // // }

    //   // temp - debugging why this doesn't work in SearchBooks. Does work Here!
    //   console.log('about to Search DB for React..');
    //   BooksAPI.search('React').then((booksAPIData) => {
    //     console.log('fetched React: ', booksAPIData);

    //     // filter out and reformat data before storing it into state
    //     const search = formatData(booksAPIData)
    //     this.setState({ search });
    //     console.log('books React: ', this.state.search);

    //   })
    // } else {
    //   this.setState({booksSearch: []});
    // }
    console.log('exiting componentDidMount.\n');
  }

  searchForBooks(){

    // !!!!!!!!!!!!  SEARCH FOR BOOKS IS NEVER EXECUTED  !!!!!!!!
    // !!!!!!!!!!!!   .. b/c ON SUBMIT HANDLER IS NEVER EXECUTED  !!!!!!!!

    console.log('-----------in searchForBooks..');
    console.log('state', this.state);
    if (this.state.query) {

    //   BooksAPI.search(this.state.query).then((booksAPIData) => {
    //     console.log('CDM searched', booksAPIData);
    //     // const booksSearch = this.props.filterBookData(booksAPIData);
    //     // this.setState({ booksSearch });

    //     console.log('CDM booksSearch', this.state.booksSearch);
    //   });
    // }

      // temp - debugging why this doesn't work in SearchBooks. Does work Here!
      console.log('about to Search DB for React..');
      BooksAPI.search('React').then((booksAPIData) => {
        console.log('fetched React: ', booksAPIData);

        // filter out and reformat data before storing it into state
        const search = formatData(booksAPIData)
        this.setState({ search });
        console.log('books React: ', this.state.search);

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

  onSubmitHandler(e){
    // !!!!!!!!!!!!  ON SUBMIT HANDLER IS NEVER EXECUTED  !!!!!!!!

    console.log('*******in onSubmitHandler..');
    e.preventDefault();

    console.log('..searching for books..', this.state.query);
    this.searchForBooks();
    // his// console.log("value", e.target.value, 'e', e);
    // this.updateQuery(e.target.value);

    // why is this.state UNDEFINED??
    // console.log('state:', this.state);
    // console.log("query for..", this.state.query)

    // console.log("e.target.value:", e.target.value);
    // console.log("this.state.query:", this.state.query);
    // clear this.state.searchBook
    //  this calls setState, which will cause re-render
    //  at re-render, componentDidMount will be called, triggering API request
    //  for the new set of books.. then when received, re-render with books
    //  whala (I hope..)

    // this.setState({ booksSearch: [] });

    // // BooksAPI.search(this.state.query).then((booksAPIData) => {
    // //   console.log('searched',booksAPIData);
    // //   // const booksSearch = this.props.filterBookData(booksAPIData);
    // //   // this.setState({ booksSearch });

    // console.log('booksSearch', this.state.booksSearch);
    console.log("************..leaving onSubmitHandler..\n");
  }


  render() {

    // UGH - "Entering" a search terms seems to trigger a PAGE RELOAD FROM SERVER - "?" is added to address bar. Even though I have PrevendDefault !

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
            {/*<form onSubmit={this.onSubmitHandler}>*/}
            <form onSubmit={(e) => this.onSubmitHandler }>
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={ (event) => {this.updateQuery(event, event.target.value)}}
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

/* ACK BUG and feature Status:

  // !!!!!!!!!!!!  SEARCH FOR BOOKS IS NEVER EXECUTED  !!!!!!!!
  // !!!!!!!!!!!!   .. b/c ON SUBMIT HANDLER IS NEVER EXECUTED  !!!!!!!!

  // And URL changes: adding "?" causing APP to "Restart" - Reload

  // -- perhaps I should remove all non-alpha chars from "query"
  // -- we're limited to certain terms only, anyway.  2 birds, 1 stone ?
  //    (not "correct" solution - not address actual problem - hacky "fix" prob won't work anyway - because page reloads WITHOUT calling UPDATE QUERY at time of submit.)

  // Was thinking of "Advanced" (don't have time for.. but features to add:)
  //  show allowed search terms. Only (and Automatically) "submit", CALL
  //  SEARCH BOOKS when one of the terms is matched.
  //  could also add colored feedback showing matches as user types,
  //    or remove unmatched terms as user types.
  //  Could also do advanced char matching like PackageControl does..


  App RELOADS from server () at Search onSubmit !! Why?

  preventDefault called in Both: onChange and onSubmit.
  But...
    - page Reloads from server.
    - "?" is added to URL in browser bar
    - API not getting called with search query.
    - .. hence booksSearch always empty,
    - .. and query gets reset
    - .. and books gets re-fetched from server, even though Not displaying
         Home page, where books would be shown.
       Hmm.. I'm not calling any methods on BooksApp, nor setting BooksApp.state. So, why is it rendered?
       -- wait, is this because somehow "?" is added to URL
       -- BACK to SQUARE 1: Why is ? being added?
       -- 'Enter Key', or 'Button Click' must be adding it.
       -- But Why?? PreventDefault isn't that part of it's jobG?
       -- I don't want to add ANYTHING to the this.state.query at that point.

*/
