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

          {/* mapping over an empty array, simply returns an empty array
              So, we can never try accessing an index that doesn't exist
              Therefore, we needn't wait until Ajax request returns us data
              Lack of books can no longer break our app.
              Conditional JSX rendering can thus be removed!
          */}
          {books.map((book) => (
            <li key={book.id}><Book book={book}/></li>
          ))}

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