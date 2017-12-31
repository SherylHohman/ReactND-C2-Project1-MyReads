import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const Bookshelf = function(props){

  const { books, shelfTitle, shelf } = props;

  // prop.bookshelves is passed to us, but we don't need it directly.
  //   Passing it down to Book, not because *Book* needs this property,
  //   but because BookshelfChanger, a child of Book, needs it.

  return (

    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">

          {/* show books */}
          {books.filter((book) => (book.shelf === shelf))
                .map((book) => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      bookshelves={props.bookshelves}
                  /></li>
          ))}

          {/* ...or Loading message */}
          {books.length === 0 && (
            <p>Retrieving your books.. </p>
          )}

        </ol>
      </div>
    </div>

  );
};

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelfTitle: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired
};

export default Bookshelf;

