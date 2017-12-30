import React from 'react'
import Bookshelf from './Bookshelf';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books : []
  }

  componentDidMount() {
    // fetch all books from Database
    BooksAPI.getAll().then((booksAllData) => {
      console.log('fetched', booksAllData);

      // filter out and reformat data before storing it into state
      const books = this.filterBookData(booksAllData)
      // console.log('filtered data', books);

      this.setState({ books });
      // console.log('after setState books   :', this.state.books);
      // console.log('after setState books[0]:, this.state.books[0]');
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
    console.log('filtered book data [0]: ', filteredBookData[0]);
    return filteredBookData
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (

          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>

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
              <ol className="books-grid"></ol>
            </div> {/* search-books-results */}

          </div>

        ) : (
          <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div> {/* list-books-title */}

            <div className="list-books-content">
              <div>

                <Bookshelf
                  books={this.state.books}
                  shelfTitle="Currently Reading"
                  shelf="currentlyReading"
                />

                <Bookshelf
                  books={this.state.books}
                  shelfTitle="Want to Read"
                  shelf="wantToRead"
                />

                <Bookshelf
                  books={this.state.books}
                  shelfTitle="Have Read"
                  shelf="read"
                />

              </div>
            </div> {/* list-books-content */}

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div> {/* open-search */}

          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
