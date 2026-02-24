const myLibrary = [];

function Book(title, author, pages) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages);
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

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);

    container.appendChild(card);
  });
}

// Dummy data
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180);
addBookToLibrary("Moby-Dick", "Herman Melville", 635);
addBookToLibrary("Crime and Punishment", "Fyodor Dostoevsky", 671);
addBookToLibrary("The Alchemist", "Paulo Coelho", 208);
addBookToLibrary("Dune", "Frank Herbert", 412);

displayBooks();
