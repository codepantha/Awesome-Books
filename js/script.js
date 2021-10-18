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

const addBooks = () => {
  const title = titleInput.value;
  const author = authorInput.value;

  const newBook = { title, author };

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
    getExistingBooks().forEach((book, index) => {
      const textHtml = `
      <div class="book">
      <p class="title">${book.title}</p>
      <p class="author">${book.author}</p>
      <button id="remove-btn" onclick="removeBook(${index})">Remove</button>
      <hr class="bottom-border" />
      </div>`;

      booksElement.insertAdjacentHTML('afterbegin', textHtml);
    });
  }
};

displayBooks();

function removeBook(index) {
  const filterBooks = getExistingBooks().filter(
    (existingBook, i) => index !== i,
  );
  saveToLocalStorage(filterBooks);
  window.location.reload();
}
