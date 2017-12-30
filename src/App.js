import React from 'react'
import Bookshelf from './Bookshelf';
import Book from './Book';
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
      console.log('filtered data', books);

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
        <Bookshelf/>
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

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <li>

                        {/*
                        Delay rendering of <Book/> until state.books has data (from Ajax request)
                          Why: Can't access 0th index of an empty array !
                          TODO: render a placeholder book instead
                        TODO: replace hard-coded array index
                         */}
                        {this.state.books.length > 0 &&
                          <Book book={this.state.books[0]}
                        />}

                      </li>
                      <li>

                        {this.state.books.length > 0 &&
                          <Book book={this.state.books[0]}
                        />}

                      </li>
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <li>

                        {this.state.books.length > 1 &&
                          <Book book={this.state.books[1]}
                        />}

                      </li>
                      <li>

                        {this.state.books.length > 2 &&
                          <Book book={this.state.books[2]}
                        />}

                      </li>
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Have Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <li>

                        {this.state.books.length > 0 &&
                          <Book book={this.state.books[0]}
                        />}

                      </li>
                      <li>

                        {this.state.books.length > 0 &&
                          <Book book={this.state.books[0]}
                        />}

                      </li>
                      <li>

                        {this.state.books.length > 0 &&
                          <Book book={this.state.books[0]}
                        />}

                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
