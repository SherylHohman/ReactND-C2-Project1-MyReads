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
    // find this particular book in books
    //  update its "shelf" field to the newly selected bookshelf
    //  books[myBook].shelf: shelf
    
    console.log("I'm in changeBookshelf..! :", shelf, book.title);
    console.log("INTTRO ", this.state.books);

    book.shelf = shelf;

    console.log('push', this.state.books.filter((aBook) => (aBook.id !== book.id)).push(book));
    console.log('concat', this.state.books.filter((aBook) => (aBook.id !== book.id)).concat(book));

    this.setState((prevState) => (
      // {books: prevState.books.filter((aBook) => (aBook.id !== book.id)).push(book)} //push returns "7" rather than an array !?!
      // `concat` adds `book` to the array. not sure why. I expected `push` to do so
      {books: prevState.books.filter((aBook) => (aBook.id !== book.id)).concat(book)}
    ));

    console.log("OUTTRO", this.state.books);
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
