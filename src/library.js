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

  borrowBook(isbn) {
    const book = this.books.find((b) => b.isbn === isbn);
    if (!book) {
      throw new Error("Book not found.");
    }
    if (book.isBorrowed) {
      throw new Error("Book is already borrowed.");
    }
    book.isBorrowed = true;
  }

  returnBook(isbn) {
    const book = this.books.find((b) => b.isbn === isbn);
    if (!book) {
      throw new Error("Book not found.");
    }
    if (!book.isBorrowed) {
      throw new Error("Book was not borrowed.");
    }
    book.isBorrowed = false;
  }
}

module.exports = Library;
