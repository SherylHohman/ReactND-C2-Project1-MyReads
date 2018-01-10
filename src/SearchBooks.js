import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import * as BooksAPI from './BooksAPI';
import formatData from './utils/FormatData';
import PropTypes from 'prop-types';
// import { Debounce } from 'react-throttle';
import { DebounceInput } from 'react-debounce-input';

class SearchBooks extends Component {

  static propTypes = {
    booksInDB: PropTypes.array.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired,
    bookshelves: PropTypes.array.isRequired
  }

  state = {
    query: '',
    searchResults: [] , // not named books, to avoid confusion in ReactDevTools
    searchResultsTitle:  'Making Space on Your Shelves',
    searchResultsMessage: 'Let\'s find more books!',
    curSearchTerm: '',
  }

  componentDidMount(){
    this.searchForBooks();
  }

  searchForBooks(query){
    console.log('searchForBooks:', query);

    const myBooks = this.props.booksInDB;  // convenience

    // exit early without searching if empty string
    if (!query) {return;}

    BooksAPI.search(query).then((searchResults) => {

      console.log('fetched (allAPIdata): ', query, searchResults);

      // No books found
      if (searchResults.error){
        // "error" prop doesn't exist on successful result
        // technically should also THEN verity the error is: "empty query".
        console.log('searchResults === []', 'No Books Found for:', query);
        this.setState({
          searchResults: [],
          searchResultsTitle: `..Sorry, No Books Found for: "${query}"..`,
          searchResultsMessage: `Got any other ideas?`
        })

      } else {
      // Yea: valid search Term
        // remove books that are already in our DB
        const newBooksAPIdata = searchResults.filter((searchResult) => {
            return myBooks.every((myBook) => {
              return (myBook.id !== searchResult.id);
            });
        });

        // All books on this topic are already on shelves
        if (newBooksAPIdata === []) {
          console.log('newBooksAPIdata===[]: already have all books');
          this.setState({
            searchResults: [],
            searchResultsTitle: `${query}`,
            searchResultsMessage: `..You already have all books on ${query} !`
          })

        } else {
          // We have some books to show !
          console.log('we still have these books:', newBooksAPIdata);

          // thin and reformat data before storing in state
          const searchResults = formatData(newBooksAPIdata);
          console.log('after formatData:', searchResults);
          this.setState({
            searchResults: searchResults,
            searchResultsTitle: `${query} (${searchResults.length})`,
            searchResultsMessage: ''
          });
          console.log('Books found!',
            ', title:', this.state.searchResultsTitle,
            ', message:', this.state.searchResultsMessage,
            ', searchResults: ', this.state.searchResults
            );
        }
      }

    });
    console.log('exiting..searchForBooks: state.searchResults', this.state.searchResults);
  }

  toTitleCaps(title){
    title = title.toLowerCase();
    if (title === 'ios'){
      title = 'iOS'
    }
    else {
      title = title
        .split(' ')
        .map((word) => {
          return (word  // error check: empty string has no elements
            ? word.replace(word[0], word[0].toUpperCase())
            : word
          )})
        .join(' ');
    }
    return title;
  }

  stripQueryStr(query){
    // limit valid keystrokes for query, based on SEARCH_TERMS.md:
    return query
      .split(' ')
      // keep only alphabet, space, newline, return
      .map((word) => (word.replace(/[^a-z\s]+/ig, '')))
      .join(' ')
      // trim multiple spaces to a single space
      .replace(/[\s]+/ig, ' ');
    }

  updateQuery(e, query) {
    query = this.toTitleCaps(this.stripQueryStr(query));
    this.setState({ query });

    // turns <input> into an "incremental search bar": auto-submits as user
    // types, as opposed to waiting for an "enter" key to trigger the onSubmit
    this.submitQuery(e, this.state.query);
  }

  clearQuery() {
    this.setState( {query: ''} );
  }

  submitQuery(e, query){
    // automatically searches for books as user types, called at debounce
    this.setState({
      searchResultsTitle:  'Making Space on Your Shelves',
      searchResultsMessage: '..Let\'s find more books!',
     });
    this.searchForBooks(query);
    // query now cleared *only* if user presses "enter", (see onSubmitHandler())
  }

  onSubmitHandler(e, query){
    // called only if "enter is pressed" - clears search bar after searching
    e.preventDefault();
    this.submitQuery(e, query);
    this.clearQuery();
  }

  clearSearchResults(){
    this.setState({searchResults: []});
  }

  render() {
    return (
      <div className="search-books">

        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <form onSubmit={(e) => {this.onSubmitHandler(e, this.state.query)}}>
                <DebounceInput
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={ (event) => {this.updateQuery(event, event.target.value)} }
                  debounceTimeout={400}
                  minLength={1}
                />
              <button type="submit" hidden>Search for Books</button>
            </form>

          </div> {/* search-books-input-wrapper */}
        </div> {/* search-books-bar */}

        {this.state.searchResults!==[] ? (
          <div className="search-books-results">
            <ol className="books-grid">
                <Bookshelf
                  books={this.state.searchResults}
                  shelfTitle={this.state.searchResultsTitle}
                  message={this.state.searchResultsMessage}
                  shelf={'none'}
                  onChangeBookshelf={this.props.onChangeBookshelf}
                  bookshelves={this.props.bookshelves}/>
            </ol>
          </div> /* search-books-results */

        ) : (
          <p>Let's add some new books !</p>
        )}

        </div> /* search-books */
    );
  }
};

export default SearchBooks;

/*  NOTES: The search from BooksAPI is limited to a particular set of search terms.
    You can find these search terms here:
    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
    you don't find a specific author or title. Every search is limited by search terms.
*/

// TODO: Warning in console on SearchBooks Results, when click changeBookshelf
  //    button:
  //  [Violation] Added non-passive event listener to a scroll-blocking 'mousewheel'
  //    event. Consider marking event handler as 'passive' to make the page more
  //    responsive. See https://www.chromestatus.com/feature/5745543795965952

/* TODO:
    bookSearch Bookshelf
    - this code could be a component that gets sent in an "bookshelf array".
      It's the same code that gets mapped over in Bookshelf.
      Here, it could then map over (browsingShelf, above);
      and there, map over bookshelves.  Satisify the requirements for both.
    - On the other hand, I may want to include additional information
      for thebooks in this page. Such as Description, etc.
*/

