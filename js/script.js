const titleInput = document.querySelector('.title-input');
const authorInput = document.querySelector('.author-input');
const addBookBtn = document.querySelector('#addBtn');
const showFormNavButton = document.querySelector('#triggerBookForm');
const showBookNavButton = document.querySelector('#triggerBookDisplay');
const showContactNavButton = document.querySelector('#triggerContact');
const bookForm = document.querySelector('.form');
const booksContainer = document.querySelector('.books');
const contact = document.querySelector('.contact');
const homepageTitle = document.querySelector('.h1.home');
const divider = document.querySelector('.divider');
const timeNow = document.querySelector('.time-now');

class Book {
  constructor(title = null, author = null) {
    this.title = title;
    this.author = author;
    this.books = [];
    this.booksElement = document.querySelector('.books');
  }

  generateRandomId = () => Math.random().toString(20).substr(2, 20);

  getExistingBooks = () => JSON.parse(localStorage.getItem('books'));

  saveToLocalStorage = (books) => {
    localStorage.setItem('books', JSON.stringify(books));
  };

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
      this.getExistingBooks().forEach((book, i) => {
        const textHtml = `
        <div class="book ${i % 2 === 0 ? 'ash' : ''}">
        <p class="title">"${book.title}"</p><span> by </span>
        <p class="author">${book.author}</p>
        <button class="remove-btn" data-id=${book.id}>Remove</button>
        </div>`;

        this.booksElement.insertAdjacentHTML('afterbegin', textHtml);
      });
    }
  }
}

const book = new Book();

book.displayBooks();

addBookBtn.addEventListener('click', (e) => {
  if (titleInput.value !== '' && authorInput.value !== '') {
    const book = new Book(titleInput.value, authorInput.value);
    book.addBooks();
    titleInput.value = '';
    authorInput.value = '';
  } else {
    e.preventDefault();
    alert('You need to provide valid input for book title and author.');
  }
});

// traverse through the remove buttons and add onclick event listeners
Array.from(document.querySelectorAll('.remove-btn')).forEach((btn) => btn.addEventListener('click', () => {
  book.removeBook(btn.dataset.id);
}));

showFormNavButton.addEventListener('click', () => {
  bookForm.style.display = 'block';
  booksContainer.style.display = 'none';
  homepageTitle.style.display = 'none';
  divider.style.display = 'none';
  contact.style.display = 'none';
});

showBookNavButton.addEventListener('click', () => {
  window.location.reload();
  bookForm.style.display = 'none';
  booksContainer.style.display = 'block';
  homepageTitle.style.display = 'block';
  divider.style.display = 'block';
  contact.style.display = 'none';
});

showContactNavButton.addEventListener('click', () => {
  contact.style.display = 'flex';
  booksContainer.style.display = 'none';
  homepageTitle.style.display = 'none';
  divider.style.display = 'none';
  bookForm.style.display = 'none';
});

/* eslint-disable no-undef */
const { DateTime } = luxon;
const now = DateTime.now();

timeNow.innerHTML = `${now.toLocaleString(DateTime.DATETIME_MED)}`;

setInterval(() => {
  window.location.reload();
}, 60000);
