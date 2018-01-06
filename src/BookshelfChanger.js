/*jshint esnext: true */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookshelfChanger extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    bookshelves: PropTypes.array.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired,
    onSaveBook: PropTypes.func  // only required if coming from SearchBooks
  }
  //  prop.bookshelves is passed in, only to be passed down to
  //    BookshelfChanger. re: it's <select> options will always match
  //      the list Bookshelf Titles, defined in ListBooks, stored in bookshelves
  //  likewise, onChanageBookshelf is also passed through.

//  onSaveBook is passed down from SearchBooks only to be
//    passed down to BookshelfChanger.
//    It handles removing a book from SearchBooks.state.booksSearch, when it
//      has been moved onto a shelf. aka "saved" by user. deleted from search


  state = {
    shelf: this.props.book.shelf
  }

  changeShelf(newShelf){

    console.log('Does BookshelfChanger.changeShelf ever get called? I don\'t see it anywhere !!  I think this may be a DEAD Useless Method!' );
    // turns <select> into a modal component:
    // TODO: not needed since this component closes upon <select>ion
    // this.props.onChangeBookshelf(this.props.book, newShelf);


    console.log('in BookshelfChanger.changeShelf. will it call SearchBooks.onSaveBook?');
    console.log('book:', this.props.book, 'newShelf', newShelf);
    this.props.onChangeBookshelf(this.props.book, newShelf)
    console.log('after onChangeBookshelf', this.props.book);


    if ('onSaveBook' in this.props){console.log('onSaveBook: TRUE')}
    if ('newShelf' !== 'none'){console.log('newShelf !== "none": TRUE')}
    if ('shelf' === 'none'){console.log('shelf === "none": TRUE')}


    if (('onSaveBook' in this.props) && (newShelf !== 'none')){
      // really should be checking of PRIOR shelf === 'none'
    // if (typeof this.props.onSaveBook === 'function'){
      console.log('BookshelfChanger: has props.onSaveBook');

      // if coming from SearchBooks component, remove this book from its state
      //  moving a book from 'none', to a shelf constitutes "adding" or "saving"
      //  the book

      this.props.onSaveBook(this.props.book);
      console.log('after onSaveBook');
/*
          onChange={(e) => this.props.onChangeBookshelf(
            this.props.book, e.target.value)

*/
    }

  }

render() {
    return (

      <div className="book-shelf-changer">

        <select
          value={this.state.shelf}
          onChange={(e) => (this.changeShelf(
            e.target.value))
        }>
          <option value="none" disabled>Move to...</option>

          {/* bookshelves are the options */}
          {this.props.bookshelves.map( (bookshelf) => (
            <option key={bookshelf.shelf} value={bookshelf.shelf}>
              {bookshelf.shelfTitle}
            </option>))}

          {/* none option removes book from bookshelf */}
          <option value="none">None</option>

        </select>
      </div>

    );
  }

}

export default BookshelfChanger;

/* BUG Notes. Breaking changes
  onSaveBook: PropTypes.func
};
  //  prop.bookshelves is passed in, only to be passed down to
  //    BookshelfChanger. re: it's <select> options will always match
  //      the list Bookshelf Titles, defined in ListBooks, stored in bookshelves
  //  likewise, onChanageBookshelf is also passed through.

//  onSaveBook is passed down from SearchBooks only to be
//    passed down to BookshelfChanger.
//    It handles removing a book from SearchBooks.state.booksSearch, when it
//      has been moved onto a shelf. aka "saved" by user. deleted from search
*/
