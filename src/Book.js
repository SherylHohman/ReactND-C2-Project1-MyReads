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
  bookshelves: PropTypes.array.isRequired
};
  // prop.bookshelves is passed in, only to be passed down to
  //   BookshelfChanger. re: it's <select> options will always match
  //   the list Bookshelf Titles, defined in ListBooks, stored in bookshelves
  // likewise, onChanageBookshelf is also just passing through.


export default Book;
