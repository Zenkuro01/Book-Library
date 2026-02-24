const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

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

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("button");
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      const id = book.id;
      const index = myLibrary.indexOf(book);
      if (index !== -1) {
        myLibrary.splice(index, 1);

        displayBooks();
      }
    });

    const toggleButton = document.createElement("button");
    toggleButton.textContent = book.isRead ? "Mark as unread" : "Mark as read";
    toggleButton.classList.add("button");
    toggleButton.classList.add("toggle-button");
    toggleButton.addEventListener("click", () => {
      book.toggleRead();

      displayBooks();
    });

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(isRead);
    card.appendChild(deleteButton);
    card.appendChild(toggleButton);

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

// Add new books using a dialog

const dialog = document.querySelector(`#add-dialog`);
const newButton = document.querySelector(`#new-button`);
const cancelButton = document.querySelector(`#cancel-button`);

newButton.addEventListener("click", () => {
  dialog.showModal();
});

cancelButton.addEventListener("click", () => {
  dialog.close();
});

const form = document.querySelector(`#book-form`);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const title = formData.get("title");
  const author = formData.get("author");
  const pages = Number(formData.get("pages"));
  const isRead = formData.get("isRead") !== null;

  addBookToLibrary(title, author, pages, isRead);
  displayBooks();

  form.reset();
  dialog.close();
});
