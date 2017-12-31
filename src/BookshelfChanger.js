import React from 'react';

const BookshelfChanger = function(props) {

  // now has access to bookshelves from ListBooks component via props

  return (

    <div className="book-shelf-changer">
      <select>
        <option value="none" disabled>Move to...</option>
        {props.bookshelves.map( (bookshelf) => (
            <option key={bookshelf.shelf} value={bookshelf.shelf}>{bookshelf.shelfTitle}</option>
        ) )}
        <option value="none">None</option>
      </select>
    </div>

  );
}


export default BookshelfChanger;

// Pretty sure I won't need a Controlled component afterall.
// possibly not even a class component
// I'll nust need to call an eventHandler of some sort, that will be defined
//    in BooksApp, the owner of the state I need to change.
//  .. and passed down to me via props.
// Yea, thinking on how a select thingy works - and that it's a "modal" type thing.
//   this component probably doesn't need state of it's own.
//   - as soon as a user selects, it goes away.
//  And state (of BooksApp) is changed.  Re-render will show everything in the new shelf..
//... Ok, Yes, as suspected while refactoring to use bookshelves,
//  I don't even need a class component.
//  WANTED to revert back to Functional.. at that time, since that refactor
//    *definitely* didn't need class, and nothing to date did.
//    - it was looking "ugly" and in the way do me.. ha.
//  ... but also only wanted to change one thing at a time.  So didn't
//    remove it while also changing how the component was rendered.
//  So here we are, an out of order commit to remove "class" refactor, and all references to this uneeded state variable.



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
