const Library = require("../src/library");

describe("Library Management System", () => {
  let library;

  beforeEach(() => {
    library = new Library();
  });

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
});
