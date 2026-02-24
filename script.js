const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
}

function displayBooks() {
  const container = document.getElementById("library");

  if (!container) {
    console.error("No library container found");
    return;
  }

  container.innerHTML = ""; // clear previous render

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = book.author;

    const pages = document.createElement("p");
    pages.textContent = `${book.pages} pages`;

    const isRead = document.createElement("p");
    isRead.textContent = book.isRead ? "Read" : "Not Read";

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(isRead);

    container.appendChild(card);
  });
}

// Dummy data
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("Moby-Dick", "Herman Melville", 635, false);
addBookToLibrary("Crime and Punishment", "Fyodor Dostoevsky", 671, false);
addBookToLibrary("The Alchemist", "Paulo Coelho", 208, true);
addBookToLibrary("Dune", "Frank Herbert", 412, false);

displayBooks();
