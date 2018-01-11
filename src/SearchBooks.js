import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import formatData from './utils/FormatData';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

class SearchBooks extends Component {

  static propTypes = {
    booksInDB: PropTypes.array.isRequired,
    fetchBooksFromDB: PropTypes.func.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired,
    bookshelves: PropTypes.array.isRequired,
  }

  state = {
    query: '',
    searchResults: [],
    searchResultsTitle:  'Making Space on Your Shelves',
    searchResultsMessage: 'Let\'s find more books!',
  }

  componentDidMount(){

    console.log('1  - props.booksInDB',
      '\n searchBooks componentDidMount; \n..query:', this.state.query,
      '\n..props.booksInDB:', this.props.booksInDB, this.props.booksInDB.length,
      );

    // on page reloads, booksInDB will be empty.
    if (this.props.booksInDB.length === 0) {
      this.props.fetchBooksFromDB();
    }

      console.log('** searchBooks componentDidMount..calling searchForBooks');
      this.searchForBooks();

  }

  searchForBooks(query){
    // exit early without searching if query is empty string or undefined
    if (!query) {return;}
    console.log('searchForBooks query:', query);

    const booksInDB = this.props.booksInDB;  // convenience

    BooksAPI.search(query).then((searchResultsAllData) => {
      console.log('fetched (allAPIdata): ', query, searchResultsAllData);

      // No books found
      if (searchResultsAllData.error){
        // "error" prop doesn't exist if the API was able to return books
        // Technically, should also THEN verify the error is: "empty query".

        this.setState({
          searchResults: [],
          searchResultsTitle: `..Sorry, No Books Found for: "${query}"..`,
          searchResultsMessage: `Got any other ideas?`
        })

      } else { // We have some books to show !
        // thin and reformat data before storing in state
        const searchResults = formatData(searchResultsAllData, booksInDB);
        this.setState({
          searchResults: searchResults,
          searchResultsTitle: `Books I do Not Have`,
          searchResultsMessage: ''
        });
      }

    });
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

    // turns <input> into an "incremental search bar": auto-submits on debounce,
    //   as opposed to waiting for an "enter" key to trigger the onSubmit
    this.submitQuery(e, this.state.query);

    // TODO: debounce is set to be a minimum of 1 character. Good, except:
    //  BUG: if user backspaces to an "empty query string", UI does not update
    //  clearing the prev searchResults.  Also if prev query was only 1 char.
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

    // show all books in DB, if search is empty, for Better UX :-)
    const booksShelfSource = (this.state.searchResults.length === 0)
      ? this.props.booksInDB
      : this.state.searchResults

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

        <div className="search-books-results">

          {/*books that aren't in DB*/}
          {this.state.searchResults!==[] ? (
            <ol className="books-grid">
                <Bookshelf
                  books={this.state.searchResults}
                  shelfTitle={this.state.searchResultsTitle}
                  message={this.state.searchResultsMessage}
                  shelf={'none'}
                  onChangeBookshelf={this.props.onChangeBookshelf}
                  bookshelves={this.props.bookshelves}/>
            </ol>

          ) : (
            <p>Let's add some new books !</p>
          )}

          {/*books that are in DB*/}
          <ListBooks
            books={booksShelfSource}
            onChangeBookshelf={ (thisBook, newShelf) => {
              this.props.changeBookshelf(thisBook, newShelf)} }
            bookshelves={this.props.bookshelves}
          />

        </div> {/* search-books-results */}
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

