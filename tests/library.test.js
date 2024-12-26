const Library = require("../src/library");

describe("Library Management System", () => {
  let library;

  beforeEach(() => {
    library = new Library();
  });

  // Add Book
  test("should add a book to the library", () => {
    const book = { isbn: "12345", title: "JavaScript Basics", author: "John Doe", year: 2021 };
    library.addBook(book);
    const availableBooks = library.getAvailableBooks();
    expect(availableBooks).toContainEqual(
      expect.objectContaining({ isbn: book.isbn, title: book.title, author: book.author, year: book.year })
    );
  });

  test("should not add a book with a duplicate ISBN", () => {
    const book = { isbn: "12345", title: "JavaScript Basics", author: "John Doe", year: 2021 };
    library.addBook(book);
    expect(() => library.addBook(book)).toThrow("Book with the same ISBN already exists.");
  });

  // Borrow
  test("should borrow a book if available", () => {
    const book = { isbn: "12345", title: "JavaScript Basics", author: "John Doe", year: 2021 };
    library.addBook(book);
    library.borrowBook("12345");
    expect(library.getAvailableBooks()).not.toContainEqual(book);
  });

  test("should throw an error if the book is already borrowed", () => {
    const book = { isbn: "12345", title: "JavaScript Basics", author: "John Doe", year: 2021 };
    library.addBook(book);
    library.borrowBook("12345");
    expect(() => library.borrowBook("12345")).toThrow("Book is already borrowed.");
  });

  // Return Borrow
  test("should return a borrowed book", () => {
    const book = { isbn: "12345", title: "JavaScript Basics", author: "John Doe", year: 2021 };
    library.addBook(book);
    library.borrowBook("12345");
    library.returnBook("12345");
    expect(library.getAvailableBooks()).toEqual([
      { isbn: "12345", title: "JavaScript Basics", author: "John Doe", year: 2021, isBorrowed: false },
    ]);
  });

  test("should throw an error if the book was not borrowed", () => {
    const book = { isbn: "12345", title: "JavaScript Basics", author: "John Doe", year: 2021 };
    library.addBook(book);
    expect(() => library.returnBook("12345")).toThrow("Book was not borrowed.");
  });
});
