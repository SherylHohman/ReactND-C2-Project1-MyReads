import React from 'react';
import Bookshelf from './Bookshelf';

const ListBooks = function(props){

  // TODO: refactor to use an array of bookhelf {Shelf, shelfTitle}
  //   and map through them as an list of li's

  return (

          <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div> {/* list-books-title */}

            <div className="list-books-content">
              <div>

                <Bookshelf
                  books={props.books}
                  shelfTitle="Currently Reading"
                  shelf="currentlyReading"
                />

                <Bookshelf
                  books={props.books}
                  shelfTitle="Want to Read"
                  shelf="wantToRead"
                />

                <Bookshelf
                  books={props.books}
                  shelfTitle="Have Read"
                  shelf="read"
                />

              </div>
            </div> {/* list-books-content */}

            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>
                 Add a book
              </a>
            </div> {/* open-search */}

          </div> /* list-books */

  );
}

export default ListBooks;