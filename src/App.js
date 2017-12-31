import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books : []
  }

  componentDidMount() {

    // fetch all books from Database
    BooksAPI.getAll().then((booksAllData) => {
      console.log('fetched', booksAllData);

      // filter out and reformat data before storing it into state
      const books = this.filterBookData(booksAllData)
      this.setState({ books });

    })
  }

  filterBookData(booksAllData) {
    // pull only the data I need into state.books, and
    //   reformat into easy to access "variables"/properties
    const filteredBookData = booksAllData.map((bookAllData) => ({
      id: bookAllData.id,
      shelf: bookAllData.shelf,
      title: bookAllData.title,
      authors: bookAllData.authors,
      bookCoverURL: bookAllData.imageLinks.thumbnail
    }));

    return filteredBookData
  }

  render() {
    return (
      <div className="app">

        <Route path="/search" render={() => (

          <div className="search-books">

            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close
              </a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>
              </div> {/* search-books-input-wrapper */}
            </div> {/* search-books-bar */}

            <div className="search-books-results">
              <ol className="books-grid">
              </ol>
            </div> {/* search-books-results */}

          </div> /* search-books */

        )} />

        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books}/>
        ) }/>


      </div> /* app */
    ); /*return*/
  } /* render*/
} //class

export default BooksApp
