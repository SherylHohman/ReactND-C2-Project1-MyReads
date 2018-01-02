import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
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

  changeBookshelf(book, shelf){

    // update this book to have the new shelf value
    book.shelf = shelf;

    //  filter gives me back array of all *Except* book.
    //  now add book (back) into the array, but with its updated shelf value
    this.setState((prevState) => (
      // `concat` adds book to the array; `push` turns the array.length ?? dunno why
      {books: prevState.books.filter((aBook) => (aBook.id !== book.id)).concat(book)}
    ));
  }


  render() {
    return (

      <div className="app">

        <Route path="/search" render={() => (
          <SearchBooks />
        )} />

        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onChangeBookshelf={ (aBook, newShelf) => {
              this.changeBookshelf(aBook, newShelf)}
            }
          />
        )} />

      </div>
    );

  }
}

export default BooksApp
