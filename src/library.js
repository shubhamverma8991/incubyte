class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    if (this.books.some((b) => b.isbn === book.isbn)) {
      throw new Error("Book with the same ISBN already exists.");
    }
    this.books.push({ ...book, isBorrowed: false });
  }

  getAvailableBooks() {
    return this.books.filter((book) => !book.isBorrowed);
  }
}

module.exports = Library;
