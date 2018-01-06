import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import * as BooksAPI from './BooksAPI';
import formatData from './utils/FormatData';
import PropTypes from 'prop-types';

class SearchBooks extends Component {

  static propTypes = {
    booksInDB: PropTypes.array.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired,
    bookshelves: PropTypes.array.isRequired
  }

  state = {
    query: '',
    booksSearch: [] , // not named books, to avoid confusion in ReactDevTools
    searchResultsTitle:  'Making Space on Your Shelves',
    searchResultsMessage: 'Let\'s find more books!',
    curSearchTerm: '',

    // alternate var names for booksSearch -- too Awkward, and *STILL*
         // can't seem to make it "stick" - must keep looking it up.
         // Therefore it's a terrible variable name (for me).
      // books: [],
      // availBooks: [],
      // browsingBooks: [],
      // booksBrowsing: [],
      // queriedBooks: []
  }

  componentDidMount(){
    this.searchForBooks();
  }

  searchForBooks(query){
    console.log('searchForBooks:', query);

    const myBooks = this.props.booksInDB;  // convenience

    BooksAPI.search(query).then((searchResults) => {

      console.log('fetched (allAPIdata): ', query, searchResults);

      // No books found
      if (searchResults.error){
        // "error" prop doesn't exist on successful result
        // technically should also THEN verity the error is: "empty query".
        console.log('searchResults === []', 'No Books Found for:', query);
        this.setState({
          booksSearch: [],
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
            booksSearch: [],
            searchResultsTitle: `${query}`,
            searchResultsMessage: `..You already have all books on ${query} !`
          })

        } else {
          // We have some books to show !
          console.log('we still have these books:', newBooksAPIdata);

          // thin and reformat data before storing in state
          const booksSearch = formatData(newBooksAPIdata);
          console.log('after formatData:', booksSearch);
          this.setState({
            booksSearch: booksSearch,
            searchResultsTitle: `${query} (${booksSearch.length})`,
            searchResultsMessage: ''
          });
          console.log('Books found!',
            ', title:', this.state.searchResultsTitle,
            ', message:', this.state.searchResultsMessage,
            ', booksSearch: ', this.state.booksSearch
            );
        }
      }

    });
    console.log('exiting..searchForBooks: state.booksSearch', this.state.booksSearch);
  }

  toTitleCaps(title){
    title = title.toLowerCase();
    if (title === 'ios'){
      title = 'iOS'
    }
    else {
      title = title
        .split(' ')
        .map((word) => word.replace(word[0], word[0].toUpperCase()))
        .join(' ');
    }
    return title;
  }

  stripQueryStr(query){
    // based on SEARCH_TERMS.md, only alphabetical letters & space are accepted
    return query
      .split(' ')
      .map((word) => (word.replace(/[^a-z\s]+/ig, '')))
      .join(' ')
    ;
    // TODO: BUG after a space, *sometimes* non-alpha chars get through ?!!??
    //  not critical, this is just a "helper" so user is *more likely* to enter
    //  only valid search terms.
  }

  updateQuery(e, query) {
    query = this.toTitleCaps(this.stripQueryStr(query));
    this.setState({ query: query.trim() });
  }

  clearQuery() {
    this.setState( {query: ''} );
  }

  clearBooksSearch(){
    this.setState({booksSearch: []});
  }

  onSubmitHandler(e, query){
    e.preventDefault();
    this.setState({
      searchResultsTitle:  'Making Space on Your Shelves',
      searchResultsMessage: '..Let\'s find more books!',
     });
    this.searchForBooks(query);
    this.clearQuery();
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

        {this.state.booksSearch!==[] ? (
          <div className="search-books-results">
            <ol className="books-grid">
                <Bookshelf
                  books={this.state.booksSearch}
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

  // TODO: - Search Bar:
    //  either remove its "controlled aspect" (not required)
    // as it stands, search box does not need to be a controlled component
    // or advanced TODO: only update state if query (partial) matches a valid
    //    SEARCH_TERM.md
    // Corollary: only call API if query matches (exactly) a valid SEARCH_TERM
