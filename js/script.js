/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */

// const booksElement = document.querySelector('.books');
const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');
const addBookBtn = document.querySelector('#addBtn');

class Book {
  constructor(title = null, author = null) {
    this.title = title;
    this.author = author;
    this.books = [];
    this.booksElement = document.querySelector('.books');
  }

  generateRandomId() {
    return Math.random().toString(20).substr(2, 20);
  }

  getExistingBooks() {
    return JSON.parse(localStorage.getItem('books'));
  }

  saveToLocalStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
  }

  addBooks() {
    const newBook = {
      title: this.title,
      author: this.author,
      id: this.generateRandomId(),
    };

    if (this.getExistingBooks()) {
      this.getExistingBooks().forEach((existingBook) => {
        this.books.push(existingBook);
      });
    }

    this.books.push(newBook);

    this.saveToLocalStorage(this.books);
    this.books = [];
  }

  removeBook(bookId) {
    const filterBooks = this.getExistingBooks().filter(
      (existingBook) => existingBook.id !== bookId,
    );

    this.saveToLocalStorage(filterBooks);
    window.location.reload();
  }

  displayBooks() {
    if (this.getExistingBooks()) {
      this.getExistingBooks().forEach((book) => {
        const textHtml = `
        <div class="book">
        <p class="title">${book.title}</p>
        <p class="author">${book.author}</p>
        <button class="remove-btn" data-id=${book.id}>Remove</button>
        <hr class="bottom-border" />
        </div>`;

        this.booksElement.insertAdjacentHTML('afterbegin', textHtml);
      });
    }
  }
}

const book = new Book();

book.displayBooks();

addBookBtn.addEventListener('click', (e) => {
  const book = new Book(titleInput.value, authorInput.value);
  book.addBooks();
  titleInput.value = '';
  authorInput.value = '';
});

// traverse through the remove buttons and add onclick event listeners
Array.from(document.querySelectorAll('.remove-btn')).forEach((btn) => btn.addEventListener('click', () => {
  book.removeBook(btn.dataset.id);
}));
