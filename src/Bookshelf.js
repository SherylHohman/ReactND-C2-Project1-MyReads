import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const Bookshelf = function(props){

  const { books, shelfTitle, shelf } = props;

  return (

    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">

          {/* show books */}
          {books.filter((book) => (book.shelf === shelf))
                .map((book) => (
                  <li key={book.id}><Book book={book}/></li>
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
