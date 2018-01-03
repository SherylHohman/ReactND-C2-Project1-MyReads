import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books : [],
    search: []  /* temp - debugging why this doesn't work in SearchBooks*/
  }

  componentDidMount() {
    // fetch all books from Database
    BooksAPI.getAll().then((booksAllData) => {
      console.log('fetched', booksAllData);

      // filter out and reformat data before storing it into state
      const books = this.filterBookData(booksAllData)
      this.setState({ books });
    })

    // temp - debugging why this doesn't work in SearchBooks. Does work Here!
    BooksAPI.search('React').then((booksAllData) => {
      console.log('fetched React: ', booksAllData);

      // filter out and reformat data before storing it into state
      const search = this.filterBookData(booksAllData)
      this.setState({ search });
      console.log('books React: ', this.state.search);

    })

}

  filterBookData(booksAllData) {
    // pull only the data I need into state.books, and
    //   reformat into easy to access "variables"/properties

    // Note: that "search" API only returns books that do *NOT* already
    //  reside on a shelf.  They have no "shelf" property - it must be added.
    //  (on the other hand, they have a "categories" property that getAll books don't.)

    const filteredBookData = booksAllData.map((bookAllData) => ({
      id: bookAllData.id,
      title: bookAllData.title,
      // books from search API: must add `shelf` property, and default it to 'none'
      shelf: bookAllData.shelf || 'none',
      authors: bookAllData.authors,
      bookCoverURL: bookAllData.imageLinks.thumbnail
    }));
    console.log(filteredBookData);

    // lets go ahead and alphatize books by title. Easier to inspect in console.
    const sortedBooks = filteredBookData.sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      if (titleA < titleB) {return -1;}
      if (titleA > titleB) {return  1;}
      return 0;
    });
    console.log('sorted', sortedBooks)

    // TODO: advanced functionality of app. Allow user to sort shelves
    //  alphabetically by author(s), or title.  In that case, perhaps use sortBy
    //  package for ease of use, and DRY code.

    return sortedBooks;
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


  render() {
    return (

      <div className="app">

        <Route path="/search" render={() => (
          <SearchBooks filterBookData={this.filterBookData}/>
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
