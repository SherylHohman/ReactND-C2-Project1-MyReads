import React from 'react';
import BookshelfChanger from './BookshelfChanger';
import PropTypes from 'prop-types';

const Book = function(props){

  const {title, authors, bookCoverURL} = props.book;

  return (
    <div className="book">
      <div className="book-top">
        <div
            className="book-cover"
            style={{ width: 128, height: 193,
              backgroundImage: `url(${bookCoverURL})`
            }}
        >
        </div>
        <BookshelfChanger
          book={props.book}
          onSaveBook={props.onSaveBook}
          onChangeBookshelf={props.onChangeBookshelf}
          bookshelves={props.bookshelves}/>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  )
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeBookshelf: PropTypes.func.isRequired,
  bookshelves: PropTypes.array.isRequired,
  onSaveBook: PropTypes.func  // only required if coming from SearchBooks
};
  //  prop.bookshelves is passed in, only to be passed down to
  //    BookshelfChanger. re: it's <select> options will always match
  //      the list Bookshelf Titles, defined in ListBooks, stored in bookshelves
  //  likewise, onChanageBookshelf is also passed through.

//  onSaveBook is passed down from SearchBooks only to be
//    passed down to BookshelfChanger.
//    It handles removing a book from SearchBooks.state.booksSearch, when it
//      has been moved onto a shelf. aka "saved" by user. deleted from search



export default Book;
