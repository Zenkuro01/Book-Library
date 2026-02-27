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
    title.classList.add("book-card-title");
    title.textContent = book.title;

    const authorIcon = `
      <svg class="icon" viewBox="0 0 24 24">
        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
      </svg>
    `;

    const author = document.createElement("p");
    author.innerHTML = `${authorIcon} ${book.author}`;

    const pagesIcon = `
      <svg class="icon" viewBox="0 0 24 24">
        <path d="M6 2h9a2 2 0 0 1 2 2v16l-5-3-5 3V4a2 2 0 0 1 2-2z"/>
      </svg>
    `;

    const pages = document.createElement("p");
    pages.innerHTML = `${pagesIcon} ${book.pages} pages`;

    const isRead = document.createElement("p");
    isRead.textContent = book.isRead ? "Read" : "Not Read";

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("book-card-buttons-container");

    const toggleButton = document.createElement("button");
    toggleButton.textContent = book.isRead ? "Mark as unread" : "Mark as read";
    toggleButton.classList.add("button");
    toggleButton.classList.add("toggle-button");
    toggleButton.addEventListener("click", () => {
      book.toggleRead();

      displayBooks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("button");
    deleteButton.classList.add("error-button");
    deleteButton.addEventListener("click", () => {
      const id = book.id;
      const index = myLibrary.indexOf(book);
      if (index !== -1) {
        myLibrary.splice(index, 1);

        displayBooks();
      }
    });

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(isRead);

    buttonsContainer.appendChild(toggleButton);
    buttonsContainer.appendChild(deleteButton);

    card.appendChild(buttonsContainer);

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
