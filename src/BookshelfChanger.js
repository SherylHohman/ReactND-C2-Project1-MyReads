/*jshint esnext: true */
import React from 'react';
import PropTypes from 'prop-types';

const BookshelfChanger = function(props) {
  return (
    <div className="book-shelf-changer">
      <select
        value={props.book.shelf}
        onChange={(e) => props.onChangeBookshelf(
          props.book, e.target.value)
      }>
        <option value="none" disabled>Move to...</option>

        {/* bookshelves are the options */}
        {props.bookshelves.map( (bookshelf) => (
          <option key={bookshelf.shelf} value={bookshelf.shelf}>
            {bookshelf.shelfTitle}
          </option>))}

        {/* none option removes book from bookshelf and deletes it from DB */}
        <option value="none">None</option>
      </select>
    </div>
  );
}

BookshelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  bookshelves: PropTypes.array.isRequired,
  onChangeBookshelf: PropTypes.func.isRequired
}

export default BookshelfChanger;
