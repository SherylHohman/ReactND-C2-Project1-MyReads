const formatData = function(booksAPIdata, booksInDB=null){
    // booksInDB will only be passed in if the data was from the "search" API

    // keep only the data DB needs from the API response, and
    //   reformat it into easy to access "variables"/properties for DB

    // Set Default values for any required DB properties,
    //  that are "missing" from API's response
    let booksData = booksAPIdata.map((bookAPIdata) => {

      const id = (bookAPIdata.id)
        ? bookAPIdata.id
        : 'invalidID'

      const title = (bookAPIdata.title)
        ? bookAPIdata.title
        : '(title unavailable)';

      const authors = (bookAPIdata.authors)
        ? bookAPIdata.authors
        : [];

      const bookCoverURL = (bookAPIdata.imageLinks)
        ? (bookAPIdata.imageLinks['thumbnail'] || '')
        : '';

      // APIdata from search API does NOT include a `shelf` property.
      // 'none' indicates its not in our database, or on user's bookshelves
      let shelf = (bookAPIdata.shelf)
        ? bookAPIdata.shelf
        : 'none';

      // Now, if this data was from searchAPI, check our DB
      //  (which is synched with BooksApp.state.books, and less expensive)
      //  to see if this book *is* in the DB. Override that default
      //  shelf setting, to the "actual" `shelf` value.
      if (booksInDB) {
        shelf = booksInDB.reduce((shelfInDB, bookInDB) => {
          if (bookInDB.id === bookAPIdata.id) {
            return bookInDB.shelf;
          }
          else {
            return shelfInDB;
          }
          // default 'none' indicates its not in the DB, or on user's bookshelves
        }, 'none');
      }

      return {
        id: id,
        title: title,
        shelf: shelf,
        authors: authors,
        bookCoverURL: bookCoverURL
      }});

    // Prevent loss of database integrity
    booksData.filter((book) => {
      if (book.id === 'invalidID') {
        console.log('WARNING: this book has an invalidID. It will be removed from the results', book.title, book.authors);
      }
      return book.id !== 'invalidID'
    });

    console.log('formatted:', booksData);

    // lets go ahead and alphatize books by title. Easier to inspect in console.
    const sortedBooks = booksData.sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      if (titleA < titleB) {return -1;}
      if (titleA > titleB) {return  1;}
      return 0;
    });
    console.log('sorted:', sortedBooks)

    //temp sort by book id for debugging ease
    const sortByID = booksData.sort((a,b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return  1;
      return 0; //(same id - there's problem in this case)
    });
    // ignore this sortByID func (supress unused vars warning)
    if(false) return sortByID;

    return sortedBooks;
  }

export default formatData;

 // Notice: Over Time, books (on the shelves) will become "unsorted",
    //  as books are moved on, off, and between shelves.
    //  in essence, the last book moved will liekly become the last book listed
    //  on whichever shelf it was filed on.
    // Can resort each time a book is moved, if want to change this behaviour.

  // TODO: (could pull sort into separate function) - put in a utils file
    //  advanced functionality of app. Allow user to sort shelves
    //  alphabetically by author(s), or title.  In that case, perhaps use
    //  sortBy package for DRY code, and ease of use.


