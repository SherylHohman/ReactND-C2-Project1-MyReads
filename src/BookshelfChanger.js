import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookshelfChanger extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    bookshelves: PropTypes.array.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired
  }

  state = {
    shelf: this.props.book.shelf
  }

  changeShelf(newShelf){
    console.log("entering changeShelf", this.state, newShelf)

    // as suspected.. Controlled Component is not needed:
    //  since component closes, re-render to keep <select>'s selected option
    //  aligned with this.state.shelf serves no purpose *In This Case*
    //  When Modal is re-opened, then it'll re-render, showing up on the screen again, and automatically be set to the proper value when state is initialized at render time.

    // turns <select> into a modal component
    // this.setState({ shelf: newShelf });
    // console.log("changed local Shelf", this.state)

    this.props.onChangeBookshelf(this.prop.book, this.state.shelf);
    console.log("leaving  changeShelf", this.state)
  }

render() {
    return (

      <div className="book-shelf-changer">
}
        <select
          value={this.state.shelf}
          onChange={(e) => this.props.onChangeBookshelf(
            this.props.book, e.target.value)
        }>
          <option value="none" disabled>Move to...</option>

          {/* bookshelves options */}
          {this.props.bookshelves.map( (bookshelf) => (
            <option key={bookshelf.shelf} value={bookshelf.shelf}>
              {bookshelf.shelfTitle}
            </option>))}

          {/* option removes book from bookshelf */}
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
