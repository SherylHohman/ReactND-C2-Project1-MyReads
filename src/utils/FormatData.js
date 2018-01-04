const formatData = function(booksAPIdata){
    // pull only the data I need into state.books, and
    //   reformat into easy to access "variables"/properties

    // Note: that "search" API only returns books that do *NOT* already
    //  reside on a shelf.  They have no "shelf" property - it must be added.
    //  (on the other hand, they have a "categories" property that getAll books don't.)

    const booksData = booksAPIdata.map((bookAPIdata) => ({
      id: bookAPIdata.id,
      title: bookAPIdata.title,
      // books from search API: must add `shelf` property, and default it to 'none'
      shelf: bookAPIdata.shelf || 'none',
      authors: bookAPIdata.authors,
      bookCoverURL: bookAPIdata.imageLinks.thumbnail
    }));
    // console.log('formatted:', booksData);

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
    return sortByID;
    // return sortedBooks;
  }

export default formatData;
