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

            {/*
              Delay rendering of <Book/> until books has data (from Ajax request)
                B/C: Can't access 0th index of an empty array !
                TODO: render a placeholder book instead
            */}
            {books.length > 0 && (
              books.map((book) => (
                <li key={book.id}><Book book={book}/></li>
              ))
            )}

        </ol>
      </div>
    </div>
  );
};

// TODO: can use this for placeholder book "image" while waiting for fetched data
//      <Book book={books.map(() => {})}
//      aaccompanied by "Loading Books" text

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelfTitle: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired
};

export default Bookshelf;