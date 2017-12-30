import React from 'react';

const BookshelfChanger = function(props){
  return (

    <div className="book-shelf-changer">
      <select>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="haveRead">Have Read</option>
        <option value="none">None</option>
      </select>
    </div>

  );
}

export default BookshelfChanger;