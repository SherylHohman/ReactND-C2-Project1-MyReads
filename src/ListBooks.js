import React from 'react';
import Bookshelf from './Bookshelf';

const ListBooks = function(props){

  const bookshelves = [
    {shelf: "currentlyReading", shelfTitle: "Currently Reading"},
    {shelf: "wantToRead",       shelfTitle: "Want To Read"},
    {shelf: "read",             shelfTitle: "Did Read"}
  ];

  return (

          <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div> {/* list-books-title */}

            <div className="list-books-content">
              {bookshelves.map((bookshelf) => (
                <li key={bookshelf.shelf}>
                  <Bookshelf
                    books={props.books}
                    shelfTitle={bookshelf.shelfTitle}
                    shelf={bookshelf.shelf}
                  />
                </li>
              ))}
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