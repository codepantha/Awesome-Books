/* eslint-disable no-unused-vars */

const booksElement = document.querySelector('.books');
const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');
const addBookBtn = document.querySelector('#addBtn');

let books = [];

const saveToLocalStorage = (books) => {
  localStorage.setItem('books', JSON.stringify(books));
};

const getExistingBooks = () => JSON.parse(localStorage.getItem('books'));

function generateRandomId() {
  return Math.random().toString(20).substr(2, 20);
}

const addBooks = () => {
  const title = titleInput.value;
  const author = authorInput.value;
  const id = generateRandomId();

  const newBook = { title, author, id };

  // get existing books from localStorage
  if (getExistingBooks()) {
    getExistingBooks().forEach((existingBook) => {
      books.push(existingBook);
    });
  }

  books.push(newBook);

  saveToLocalStorage(books);
  books = [];

  titleInput.value = '';
  authorInput.value = '';
};

addBookBtn.addEventListener('click', () => {
  addBooks();
});

const displayBooks = () => {
  if (getExistingBooks()) {
    getExistingBooks().forEach((book) => {
      const textHtml = `
      <div class="book">
      <p class="title">${book.title}</p>
      <p class="author">${book.author}</p>
      <button class="remove-btn" data-id=${book.id}>Remove</button>
      <hr class="bottom-border" />
      </div>`;

      booksElement.insertAdjacentHTML('afterbegin', textHtml);
    });
  }
};

displayBooks();

function removeBook(bookId) {
  const filterBooks = getExistingBooks().filter((existingBook) => existingBook.id !== bookId);
  saveToLocalStorage(filterBooks);
  window.location.reload();
}

// traverse through the remove buttons and add onclick event listeners
Array.from(document.querySelectorAll('.remove-btn')).forEach((btn) => btn.addEventListener('click', () => {
  removeBook(btn.dataset.id);
}));
