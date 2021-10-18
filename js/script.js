const booksElement = document.querySelector(".books");
const titleInput = document.querySelector(".title-input");
const authorInput = document.querySelector(".author-input");
const addBookBtn = document.querySelector("#addBtn");

let books = [];

addBookBtn.addEventListener("click", () => {
  addBooks();
});

const saveToLocalStorage = (books) => {
  localStorage.setItem("books", JSON.stringify(books));
};

const getExistingBooks = () => {
  return JSON.parse(localStorage.getItem("books"));
};

const addBooks = () => {
  let title = titleInput.value;
  let author = authorInput.value;

  const newBook = { title, author };

  if (getExistingBooks()) {
    getExistingBooks().forEach((existingBook) => {
      books.push(existingBook);
    });
  }

  books.push(newBook);

  saveToLocalStorage(books);
  books = [];

  titleInput.value = authorInput.value = "";
};

const displayBooks = () => {
  if (getExistingBooks()) {
    getExistingBooks().forEach((book, index) => {
      const textHtml = `
      <div class="book">
      <p class="title">${book.title}</p>
      <p class="author">${book.author}</p>
      <button id="remove-btn" onclick="removeBook(${index})">Remove</button>
      <hr class="bottom-border" />
      </div>`;

      booksElement.insertAdjacentHTML("afterbegin", textHtml);
    });
  }
};

displayBooks();

const removeBook = (index) => {
  const filterBooks = getExistingBooks().filter(
    (existingBook, i) => index !== i
  );
  saveToLocalStorage(filterBooks);
  location.reload();
};
