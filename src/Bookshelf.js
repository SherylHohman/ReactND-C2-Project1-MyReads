import React from 'react';
import Book from './Book';

const Bookshelf = function(props){
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          <li>

            {/*
              Delay rendering of <Book/> until state.books has data (from Ajax request)
                Why: Can't access 0th index of an empty array !
                TODO: render a placeholder book instead
              TODO: replace hard-coded array index
            */}
            {props.books.length > 0 &&
              <Book book={props.books[0]}
            />}

          </li>
          
          <li>

            {props.books.length > 1 &&
              <Book book={props.books[1]}
            />}

          </li>
        </ol>
      </div>
    </div>
  );
};

export default Bookshelf;