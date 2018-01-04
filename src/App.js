import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import formatData from './utils/FormatData';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books : []
  }

  componentDidMount() {
    // fetch all books from Database
    BooksAPI.getAll().then((booksAPIData) => {
      console.log('fetched', booksAPIData);

      // filter out and reformat data before storing it into state
      const books = formatData(booksAPIData)
      this.setState({ books });
    })
  }

  changeBookshelf(book, shelf){
  // update database
    BooksAPI.update(book, shelf).then((res) => {

    // Verify DB was updated, before updating our local state (keep in synch)
    if (res[shelf].indexOf(book.id) !== -1) {

      // if new shelf is `none` remove this book from state array
      if (shelf === 'none') {
        this.setState((prevState) => (
          {books: prevState.books.filter((aBook) => (aBook.id !== book.id))}
        ));

      } else {
        // remove book, then add it back to array, but with new shelf value
        book.shelf = shelf;
        this.setState((prevState) => (
          {books: prevState.books
            .filter((aBook) => (aBook.id !== book.id))
            .concat(book)
          }
        ));
      }  // if none else

    }   // if DB update successful

    }) // .then

  }

  addToBookshelf(book, shelf){
  // update database
    BooksAPI.update(book, shelf).then((res) => {

      // Verify DB was updated, before adding to state
      if (res[shelf].indexOf(book.id) !== -1) {
        if (shelf !== 'none') {  // should not be the cose, check JIC

          //  add book to state array, with its (new) shelf value
          book.shelf = shelf;
          this.setState((prevState) => (
            {books: prevState.books.concat(book)}
          ));

        }  // if none
      } // if DB update successful

    })// .then
  }

  render() {
    return (
      <div className="app">

        <Route path="/search" render={() => (
          <SearchBooks onChangeBookshelf={ (aBook, newShelf) => {
              this.addToBookshelf(aBook, newShelf)}
            }/>
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
