import React, {Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BooksAPI from './BooksAPI';

class SearchBooks extends Component {

  static propTypes = {
    filterBookData: PropTypes.func.isRequired
  }

  state = {
    query: '',
    booksSearch: []  // not named books, to avoid confusion in ReactDevTools
  }

  componentDidMount(){
    if (this.state.query) {
      BooksAPI.search(this.state.query).then((booksAllData) => {
        console.log('CDM searched', booksAllData);
        // const booksSearch = this.props.filterBookData(booksAllData);
        // this.setState({ booksSearch });

        console.log('CDM booksSearch', this.state.booksSearch);
      });
    }

  }

  updateQuery(query) {
    this.setState( {query: query.trim()} );
    console.log(this.state.query);
  }

  onSubmitHandler(e){
    e.preventDefault();
    console.log("searching for..", this.state.query);

    // BooksAPI.search(this.state.query).then((booksAllData) => {
    //   console.log('searched',booksAllData);
    //   // const booksSearch = this.props.filterBookData(booksAllData);
    //   // this.setState({ booksSearch });

      console.log('booksSearch', this.state.booksSearch);
  }


  render() {
    return (

      <div className="search-books">

        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <form onSubmit={(e) => this.onSubmitHandler(e)}>
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={ (event) => {this.updateQuery(event.target.value)}}
              />
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
