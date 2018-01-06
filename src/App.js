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

  bookshelves = [
    {shelf: "currentlyReading", shelfTitle: "Currently Reading"},
    {shelf: "wantToRead",       shelfTitle: "Want To Read"},
    {shelf: "read",             shelfTitle: "Did Read"}
  ];

  componentDidMount() {
    // fetch all books from Database
    BooksAPI.getAll().then((booksAPIData) => {
      console.log('fetched', booksAPIData);

      // filter out and reformat data before storing it into state
      const books = formatData(booksAPIData)
      this.setState({ books });
    })
  }

  // checks all shelves in response to see if "deleted"/"none" book remains
  isInDB(id, response) {
    // console.log('in isInDB..', 'id:', id, response);
    let foundBook = false;
    for (let shelf in response){
      // console.log('shelf:, shelf');
      if (shelf.indexOf(id) !== -1 ) {
        foundBook = true;
        // console.log(id, 'found on sheld: ', shelf);
      }
    }
    // console.log('foundbook: ', foundBook, id);
    return foundBook;
  }

  deleteBook(book, response) {
    // console.log('in deleteBook, bookid:', book.id, 'book', book, 'response', response);

    // verify book has been removed from DB before removing from state
    if (! this.isInDB(book.id, response)) {
      // console.log('..not found, updating state');
      this.setState((prevState) => (
        {books: prevState.books
          .filter((myBook) => (myBook.id !== book.id))
        }
      ));
      // console.log('state is now: ');
    };
  }

  moveBook(book, newShelf, response){
    // console.log('in moveBook');
    // console.log((response[newShelf].indexOf(book.id) !== -1));

    // Verify book was updated to newShelf in DB, before updating our state
    if (response[newShelf].indexOf(book.id) !== -1) {
      book.shelf = newShelf;
      // console.log(book.shelf, newShelf);

      // remove book, then add it back to array, with its new shelf value
      this.setState((prevState) => (
        {
          books: prevState.books
          .filter((aBook) => (aBook.id !== book.id))
          .concat([book])    // `concat[]` returns a new array, for chaining
        }
      ));
      // console.log('state exiting moveBook: ', this.state.books);
    }
  }

  changeBookshelf(book, newShelf){
    // console.log("enter..", book.id, book);

    // update database
    BooksAPI.update(book, newShelf)
      .then((response) => {
        // console.log('APIupdated: book: ', book, '\nnewShelf:', newShelf,'\ndb response:', response);

        // then update state
        if (newShelf === 'none') {
          this.deleteBook(book, response);
        } else {
          // console.log('book', book);
          this.moveBook(book, newShelf, response);
          // console.log('state after move..', this.state.books);
        }
      })
  }

  addToBookshelf(book, shelf){
  // update database
    BooksAPI.update(book, shelf).then((res) => {
      console.log('..added:', book.id, 'to', shelf, ':\n  ', res);

      // Verify DB was updated, before adding to state
      console.log(res[shelf].indexOf(book.id),
                ((res[shelf].indexOf(book.id) !== -1))
      );

      // DB update was successful
      if (res[shelf].indexOf(book.id) !== -1) {
        console.log('shelf:', shelf, shelf!=='none');
        if (shelf !== 'none') {  // should not be the cose, check JIC

          // remove book, then add it back to array, but with new shelf value
          book.shelf = shelf;
          this.setState((prevState) => (
            {books: prevState.books.concat(book)}
          ));
          // console.log('after adding book:', this.state.books);
        }
      }

    })// .then
  }


  render() {
    return (

      <div className="app">

        <Route path="/search" render={() => (
          <SearchBooks
            onChangeBookshelf={ (aBook, newShelf) => {
              this.addToBookshelf(aBook, newShelf)}}
            bookshelves={this.bookshelves}
            booksInDB={this.state.books}
            />
        )} />

        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            onChangeBookshelf={ (aBook, newShelf) => {
              this.changeBookshelf(aBook, newShelf)} }
            bookshelves={this.bookshelves}
          />
        )} />

      </div>
    );

  }
}

export default BooksApp
