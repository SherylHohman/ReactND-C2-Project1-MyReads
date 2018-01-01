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
    const indexOfBook = this.books.indexOf(book);
    console.log("index, title, shelf:", indexOfBook,
                this.books[indexOfBook].title,
                this.books[indexOfBook].shelf);

    // this.setState((prev) => ({}));
    // or can I use
    // this.setState({books[indexOfMybook].shelf: shelf});
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
            onChangeBookshelf={this.changeBookshelf}
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
