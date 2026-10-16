// Sample browser data. It resets when the page is refreshed.
let books = [
  { title: "Wings of Fire", author: "A. P. J. Abdul Kalam", copies: 2 },
  { title: "The Alchemist", author: "Paulo Coelho", copies: 1 },
  { title: "Ikigai", author: "Hector Garcia and Francesc Miralles", copies: 4 }
];

function findBook(title) {
  return books.find(book => book.title.toLowerCase() === title.toLowerCase());
}

function addBook() {
  const title = document.getElementById("titleInput").value.trim();
  const author = document.getElementById("authorInput").value.trim();
  const copies = Number(document.getElementById("copiesInput").value);
  const message = document.getElementById("message");

  if (title === "" || author === "" || !Number.isInteger(copies) || copies < 1) {
    message.textContent = "Enter a title, an author, and a whole number of copies (at least 1).";
    return;
  }

  const existingBook = findBook(title);
  if (existingBook) {
    existingBook.copies += copies;
  } else {
    books.push({ title: title, author: author, copies: copies });
  }

  document.getElementById("titleInput").value = "";
  document.getElementById("authorInput").value = "";
  document.getElementById("copiesInput").value = "1";
  message.textContent = "Book list updated.";
  drawBooks();
}

function borrowBook(title) {
  const book = findBook(title);
  if (!book || book.copies < 1) {
    document.getElementById("message").textContent = "No copies are currently available.";
    return;
  }
  book.copies -= 1;
  document.getElementById("message").textContent = "Book borrowed.";
  drawBooks();
}

function returnBook(title) {
  const book = findBook(title);
  if (!book) return;
  book.copies += 1;
  document.getElementById("message").textContent = "Book returned.";
  drawBooks();
}

function drawBooks() {
  const shelf = document.getElementById("shelf");
  shelf.innerHTML = "";
  let totalCopies = 0;

  books.forEach(book => {
    totalCopies += book.copies;
    const card = document.createElement("div");
    card.className = "book";

    const title = document.createElement("h3");
    title.textContent = book.title;
    const author = document.createElement("p");
    author.textContent = "by " + book.author;
    const count = document.createElement("p");
    count.textContent = book.copies + " available";

    const actions = document.createElement("div");
    actions.className = "book-actions";
    const borrowButton = document.createElement("button");
    borrowButton.textContent = "Borrow";
    borrowButton.disabled = book.copies < 1;
    borrowButton.addEventListener("click", () => borrowBook(book.title));
    const returnButton = document.createElement("button");
    returnButton.textContent = "Return";
    returnButton.addEventListener("click", () => returnBook(book.title));

    actions.append(borrowButton, returnButton);
    card.append(title, author, count, actions);
    shelf.appendChild(card);
  });

  document.getElementById("titleCount").textContent = books.length;
  document.getElementById("copyCount").textContent = totalCopies;
}

document.getElementById("addButton").addEventListener("click", addBook);
drawBooks();
