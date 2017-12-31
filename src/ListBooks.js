import React from 'react';
import { Link } from 'react-router-dom';
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
            </div>

            <div className="list-books-content">
              {bookshelves.map((bookshelf) => (
                <li key={bookshelf.shelf}>
                  <Bookshelf
                    books={props.books}
                    shelfTitle={bookshelf.shelfTitle}
                    shelf={bookshelf.shelf}
                    bookshelves = {bookshelves}
                  />
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
}

export default ListBooks;

/* Question: not sure if this is the Best way..
    Goal: DRY. Bookshelf Title (heading) and options in BookshelfChanger
      to remain in synch.  the items mush match.

    Currently, `ookshelves` stores all possible bookshelf values.
      It's a `const` in <ListBooks>.  But it turns out BookshelfChanger also needs those values.

    Do I:
      - pass this 'const' down as a prop from
          ListBooks -> Bookshelf -> Book (doesn't use) -> BookshelfChanger ?
          (currently ListBooks passes shelf and title for current bookshelf to Bookshelf)
            The new way could pass the array of all bookshelves, in addition to
              the name and title of the bookshelf to reneder.
              (or perhaps it could be programmatically derived from bookshelves and
                ..? i guess an index that could be passed down instead of title and shelf.  But that would require refactoring map to provide and index, and would also require refactoring Bookshelf to programatically figureit out from the index. Easy, yet more code, and more indirect.
                I suppose, I'll just pass all explicitly as props. (less dry?? not sure)
                Keeps code easy to read anyway.  Only complicate it when necesary. or Breaks DRY principle - as Bookshelf and BookshelfChanger currently do)
      - is there a better way ?
          move this `const to another location ?`

    For now, this seems best.
      Though Book doesn't directly use this value,
        BookshelfChanger is nested inside Book.
      We separate code/components into (child) Components and Files for convenience,
        maintainablity of code, and readability.
        So, from that perspective, it seems reasonable to pass it down this way,
        even though Book doesn't use it directly. While it at first seems an inefficient way to do things.
        React Philosophy/tenant/methodoogy is: pass from parent to child... always

      React *may* have a better way of passing it indirectly so all children of ListBooks can have acces to it, without passing to intermediary components, like Book. Which would also imply that it wouldn't even need to be passed down into Bookshelf, via a prop, for Bookshelf to use it.

 */
