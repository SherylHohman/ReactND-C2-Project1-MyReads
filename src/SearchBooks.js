import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import formatData from './utils/FormatData';
import PropTypes from 'prop-types';
// import { Debounce } from 'react-throttle';
import { DebounceInput } from 'react-debounce-input';

class SearchBooks extends Component {

  static propTypes = {
    booksInDB: PropTypes.array.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired,
    bookshelves: PropTypes.array.isRequired,
  }

  state = {
    query: '',
    // when page first opens, want booksInDB to show rather than an "empty" page
    searchResults: this.props.booksInDB,

    searchResultsTitle:  'Making Space on Your Shelves',
    searchResultsMessage: 'Let\'s find more books!',
    curSearchTerm: '',

    // this value will change if user moves bookshelves. Therefore state.
    booksInDB: this.props.booksInDB,
  }

  componentDidMount(){

    // console.log('0 searchBooks componentDidMount, setting state - booksInDB',
    //   '\n--state', this.state.booksInDB, '\n--props', this.props.booksInDB);

    // this.setState({ booksInDB: this.props.booksInDB });

    console.log('1 - setState booksInDB - props.booksInDB',
      '\n searchBooks componentDidMount; \n..query:', this.state.query,
      '\n..props.booksInDB:', this.props.booksInDB, this.props.booksInDB.length,
      '\n..state.booksInDB:', this.state.booksInDB, this.state.booksInDB.length,
      // '\n..firstPageLoad:', this.state.firstPageLoad
      );

    // if page reloads, booksInDB will be empty. Fetch data from DB, just as
    //  do in BooksApp.  This is because user could type in URl and this would be
    //  first page loaded. I want books currently in DB to show up.
    //  prettier and more useful than a blank page.

    // if (this.state.booksInDB.length === 0) {
    //   console.log('--fetching books..');
    //   // fetch all books from Database
    //   BooksAPI.getAll().then((booksAPIData) => {
    //     console.log('--fetched DB from searchBooks', booksAPIData);

    //     // filter out and reformat data before storing it into state
    //     const booksInDB = formatData(booksAPIData)
    //     this.setState({ booksInDB });
    //     console.log('--this.state.booksInDB', this.state.booksInDB);
    //   })
    // }

    // if (this.state.firstPageLoad !== 'whack'){
      console.log('** searchBooks componentDidMount..calling searchForBooks');
      this.searchForBooks();
    // }

    // show all books in DB when Search Page first loads
    // this.setState({ searchResults: this.state.booksInDB });

    // this.setState({ firstPageLoad: 'gibberish' });
    // console.log('firstPageLoad at exit componentDidMount:', this.state.firstPageLoad);

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
        // Technically, should also THEN verity the error is: "empty query".
        // console.log('searchResults === []', 'No Books Found for:', query);
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
            books={this.state.searchResults}
            onChangeBookshelf={ (thisBook, newShelf) => {
              this.props.changeBookshelf(thisBook, newShelf)} }
            bookshelves={this.props.bookshelves}
          />
          {/**/}

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

