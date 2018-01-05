const formatData = function(booksAPIdata){
    // pull only the data I need into state.books, and
    //   reformat into easy to access "variables"/properties

    // Note: that "search" API only returns books that do *NOT* already
    //  reside on a shelf.  They have no "shelf" property - it must be added.
    //  (on the other hand, they have a "categories" property that getAll books don't.)

    console.log('does "Thrun" or "Design" make it INTO formatData?');
    for (let i=0; i<booksAPIdata.length; i++) {
      console.log(`${i}   id: ${booksAPIdata[i].id} title:   ${booksAPIdata[i].title}`);
    }

    let booksData = booksAPIdata.map((bookAPIdata) => {
      // console.log(bookAPIdata.id, 'bookAPIdata.title', bookAPIdata.title);

      const id = (bookAPIdata.id)
        ? bookAPIdata.id
        : 'invalidID'

      const title = (bookAPIdata.title)
        ? bookAPIdata.title
        : '(title unavailable)';

      // books from search API: must add `shelf` property, and default it to 'none'
      const shelf = (bookAPIdata.shelf)
        ? bookAPIdata.shelf
        : 'none';

      const authors = (bookAPIdata.authors)
        ? bookAPIdata.authors
        : [];

      const bookCoverURL = (bookAPIdata.imageLinks)
        ? (bookAPIdata.imageLinks['thumbnail'] || '')
        : '';

      return {
        id: id,
        title: title,
        shelf: shelf,
        authors: authors,
        bookCoverURL: bookCoverURL
      }});

    //  in the unlikely event that any book was missing an id property,
    //    remove it from searchResults.  Otherwise strange and inconsistent
    //    behaviour could result (DB). Can't have more than one book refer
    //    to the same ID.  It would be overwritten and replaced.
    // setting more than 1 book to invalidID can have unintended consequences
    //   fortunately *This* property is likely to *always* exist.
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

    // Notice: Over Time, books (on the shelves) will become "unsorted",
    //  as books are moved on, off, and between shelves.
    //  in essence, the last book moved will liekly become the last book listed
    //  on whichever shelf it was filed on.
    // Can resort each time a book is moved, if want to change this behaviour.

    // TODO: (could pull sort into separate function)
    //  advanced functionality of app. Allow user to sort shelves
    //  alphabetically by author(s), or title.  In that case, perhaps use
    //  sortBy package for DRY code, and ease of use.


    //temp sort by book id for debugging ease
    const sortByID = booksData.sort((a,b) => {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return  1;
      return 0; //(same id - there's problem in this case)
    });
    if(false) return sortByID;  // ignore this sortByID (supress unused vars warning)

    return sortedBooks;
  }

export default formatData;
