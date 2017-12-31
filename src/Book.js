import React from 'react';
import BookshelfChanger from './BookshelfChanger';
import PropTypes from 'prop-types';

const Book = function(props){
  // convenience variables
  const {title, authors, bookCoverURL} = props.book;

  // prop.bookshelves is passed to us, but we don't need it directly.
  //   to BookshelfChanger, so that it's <select> options will always match
  //   the list Bookshelf Titles, defined in ListBooks.
  //   That's what bookshelves stores.


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
        <BookshelfChanger book={props.book} bookshelves={props.bookshelves}/>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  )
};

Book.propTypes = {
  book: PropTypes.object.isRequired
};

export default Book;
