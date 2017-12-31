import React, { Component } from 'react';

class BookshelfChanger extends Component {

state = {
  shelf: this.props.shelf
}

render() {

    console.log("BookshelfChanger, shelf:", this.state.shelf,
                "\nbook.shelf:", this.props.book.shelf,
                "\nbook:", this.props.book)

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

}

export default BookshelfChanger;

/*
  Thinking of how to approach this:
  Turn <select> into a Controlled Component.
    Then, the "selected option" will be controlled by
      this.state.shelf
    and "Event" handler will then be bound to an "onHandleEvent"
      method on <BooksApp/> that
      - changes This Book's shelf property's value (this.books[myBook].shelf)
      - which causes a trickle down re-render, updating the
        option selected in this BookshelfChanger component
    Then, how do I pass that value around?  This BookshelfChanger
      component must recieve "thisBook/myBook/book" as a PROP
      from it's owner.
    No "Submit" button is needed, because select's `onChange` property
      will be used, dynamically and automatically firing every time
      the user changes their "selected/chosen" value.

  What I'm aiming to accomplish:
  wire this component up with user-expected functionality:
    - it should add/move "its" book to the shelf selected by the user
    - ie: change the value of the book's `shelf` value.

*/
