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
    // console.log("I'm still here..!", book.id);
    const indexOfBook = this.books.findIndex((aBook) => (aBook.id === book.id));
    console.log(indexOfBook);
    console.log('before setState:', this.books[indexOfBook]);//.shelf, this.books[indexOfBook].title);
    // console.log(indexOfBook);
    // console.log("index, title, shelf:", indexOfBook)//,
                // this.books[indexOfBook].title,
                // this.books[indexOfBook].shelf);
    book.shelf = shelf;
    // this.setState( {books[indexOfBook].shelf: shelf} );
    // this.setState((prevState) => (
    //   {books: prevState.books.filter((aBook) => (aBook.id !== book.id))
    //                  .push(book)}
    //                     // .concat([ book ])
    // ));

    this.setState((prevState) => (
      {books: prevState.books.filter((aBook) => (aBook.id !== book.id)).push(book)}
    ));

    console.log(this.state.books.filter((aBook) => (aBook.id !== book.id)).concat(book));
    console.log("OUTTRO", this.state.books);
    // console.log("outtro", this.state.books[-1].shelf, this.state.books[-1].title);
      // this.state.books[indexOfBook].shelf, this.state.books[indexOfBook].title

    // this.setState((prev) => ({}));
    // or can I use
    // this.setState({books[indexOfMybook].shelf: shelf});
  }

  dumb(){
    let dummy='';
    console.log(dummy)
    if (this.state.books.length>0) {
      dummy="not yet"
    } else {
      dummy=this.state.books[0].title
    }
    console.log(dummy, dummy)
    return dummy
// <h3>this.dumb()</h3>
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
            onChangeBookshelf={ (aBook, newShelf) => {this.changeBookshelf(aBook, newShelf)} }
          />
        )} />

      </div>
    );
          //   onChangeBookshelf={(book, shelf) => {
          //     this.changeBookshelf(book, shelf);
          //   }}
  }
}

export default BooksApp
