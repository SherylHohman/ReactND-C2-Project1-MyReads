import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookshelfChanger extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    bookshelves: PropTypes.array.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired
  }

  state = {
    shelf: ''//this.props.book.shelf
  }

  componentDidMount() {
    console.log("entering didMount", this.state);
    this.setState( {shelf: this.props.book.shelf} );
    console.log("exiting  didMount", this.state);
  }

  // changeShelf(newShelf){
  //   this.setState({ shelf: newShelf });
  //   this.props.onChangeBookshelf(this.prop.book, newShelf);
  // }
  changeShelf(newShelf){
    // e.preventDefault();
    // const newShelf = e.target.value;
    console.log("entering changeShelf", this.state, newShelf)
    this.setState({ shelf: newShelf });
    console.log("changed local Shelf", this.state)
    this.props.onChangeBookshelf(this.prop.book, this.state.shelf);
    console.log("leaving  changeShelf", this.state)
  }

  // // onChangeBookshelf(e) {
    //   // e.preventDefault();
    //   const newShelf = e.target.value;
    //   console.log("onChangeBookshelf\n", newShelf, ":", this.props.book.title);

    //   this.props.onChangeBookshelf(this.props.book, newShelf);

    //   // hmm.. just as the Functional Component version using `ref`,
    //   //  BooksApp.changeBookshelf is NOT being called.
    //   //  .. what to do ?
    //   //  - (git commit .. JIC.)
    //   //  - go Exercise !!
    //   //  - review Contacts App. More Google Searches, docs, etc
    //   //  - Fix.
    // }

render() {
    return (

      <div className="book-shelf-changer">
        {/*<select onChange={(event) => this.onChangeBookshelf(event)}>*/}
        {/*<select onChange={(e) => this.props.onChangeBookshelf(e.target.value)}>*/}
        <select
          value={this.state.shelf}
/*          onChange={(e) => this.changeShelf(e.target.value)}>*/
            onChange={(e) => this.props.onChangeBookshelf(this.props.book, e.target.value)}>
            <option value="none" disabled>Move to...</option>
            {this.props.bookshelves.map( (bookshelf) => (
              <option key={bookshelf.shelf} value={bookshelf.shelf}>
              {bookshelf.shelfTitle}</option>
            ))}
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
