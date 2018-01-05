/*jshint esnext: true */
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

    // turns <select> into a modal component:
    //    not needed since this component closes upon <select>ion
    // this.setState({ shelf: newShelf });
    // console.log("changed local Shelf", this.state)
    this.props.onChangeBookshelf(this.prop.book, newShelf);
  }

render() {
    return (

      <div className="book-shelf-changer">

        <select
          value={this.state.shelf}
          onChange={(e) => this.props.onChangeBookshelf(
            this.props.book, e.target.value)
        }>
          <option value="none" disabled>Move to...</option>

          {/* bookshelves are the options */}
          {this.props.bookshelves.map( (bookshelf) => (
            <option key={bookshelf.shelf} value={bookshelf.shelf}>
              {bookshelf.shelfTitle}
            </option>))}

          {/* none option removes book from bookshelf */}
          <option value="none">None</option>

        </select>
      </div>

    );
  }

}

export default BookshelfChanger;
