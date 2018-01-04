import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import formatData from './utils/FormatData';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books : []//,
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
      // console.log('updated:', res);
      // console.log(book.id, res[shelf], res[shelf].indexOf(book.id));

    // Verify DB was updated, before updating our state
    if (res[shelf].indexOf(book.id) !== -1) {

      // if new shelf is `none` remove this book from state array
      if (shelf === 'none') {
        this.setState((prevState) => (
          {books: prevState.books.filter((aBook) => (aBook.id !== book.id))}
        ));
        // TODO: consider keeping it in array with 'none'value
        //    then can add an additional shelf: "recently removed",
        //    showing "none" values.
        //    This row bould be cleared on Page/App reload/refresh

      } else {
        // remove book, then add it back to array, but with new shelf value
        book.shelf = shelf;
        this.setState((prevState) => (
          // `concat` adds book to the array; `push` turns the array.length - why??
          {books: prevState.books
            .filter((aBook) => (aBook.id !== book.id))
            .concat(book)
          }
        ));
      }  // if none

    } // if DB update successful

    })// .then

  }


  addToBookshelf(book, shelf){

  // update database
    BooksAPI.update(book, shelf).then((res) => {
      console.log('..added:', book.id, 'to', shelf, ':\n  ', res);

      // Verify DB was updated, before adding to state
      console.log(res[shelf].indexOf(book.id), ((res[shelf].indexOf(book.id) !== -1)) );
      if (res[shelf].indexOf(book.id) !== -1) {
        console.log('shelf:', shelf, shelf!=='none');
        if (shelf !== 'none') {  // should not be the cose, check JIC

          // remove book, then add it back to array, but with new shelf value
          book.shelf = shelf;
          this.setState((prevState) => (
            {books: prevState.books.concat(book)}
          )); // update state
          console.log('after adding book:', this.state.books);
        }  // if none
      } // if DB update successful

    })// .then
    console.log('..exiting added');
  }


  render() {
    return (

      <div className="app">

        <Route path="/search" render={() => (
          <SearchBooks
            onChangeBookshelf={ (aBook, newShelf) => {
              this.addToBookshelf(aBook, newShelf)}}
            booksInDB={this.state.books}
            />
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
