import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import PropTypes from 'prop-types';

const ListBooks = function(props){

  const bookshelves = props.bookshelves;

  return (
          <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              {bookshelves.map((bookshelf) => (
                <li key={bookshelf.shelf}>
                  <Bookshelf
                    books={props.books}
                    shelfTitle={bookshelf.shelfTitle}
                    shelf={bookshelf.shelf}
                    bookshelves={bookshelves}
                    onChangeBookshelf={props.onChangeBookshelf}/>
                </li>
              ))}
            </div>

            <div className="open-search">
              <Link to="/search">
                 Add a book
              </Link>
            </div>

          </div> /* list-books */
  );
};

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeBookshelf: PropTypes.func.isRequired,
  bookshelves: PropTypes.array.isRequired
}
  // onChangeBookshelf is passed in, only to be passed down the line to
  //   <BookshelfChanger/>.


export default ListBooks;
