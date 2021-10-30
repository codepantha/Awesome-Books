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

  saveToLocalStorage = () => {
    localStorage.setItem('books', JSON.stringify(this.books));
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

    this.saveToLocalStorage();
    // this.books = [];
  }

  removeBook(bookId) {
    this.books = this.getExistingBooks().filter(
      (existingBook) => existingBook.id !== bookId,
    );

    this.saveToLocalStorage();
    this.booksElement.innerHTML = "";
    this.displayBooks();
    // window.location.reload();
  }

  displayBooks() {
    if (this.getExistingBooks()) {
      this.getExistingBooks().forEach((book, i) => {
        const bookContainer = document.createElement('div');
        bookContainer.classList = 'book';
        bookContainer.classList.add(i % 2 === 0 ? 'ash': null);
        
        const bookTitle = document.createElement('p');
        bookTitle.classList = 'title';
        bookTitle.innerHTML = book.title;
        const span = document.createElement('span').innerText = ' by';
        bookTitle.append(span);

        const bookAuthor = document.createElement('p');
        bookAuthor.classList = 'author';
        bookAuthor.innerHTML = book.author;

        const removeBtn = document.createElement('button');
        removeBtn.classList = 'remove-btn';
        removeBtn.innerHTML = 'Remove';

        removeBtn.addEventListener('click', () => {
          this.removeBook(book.id);
        })

        bookContainer.appendChild(bookTitle);
        bookContainer.appendChild(bookAuthor);
        bookContainer.appendChild(removeBtn);
        this.booksElement.insertAdjacentElement('afterbegin', bookContainer);
      });
    }
  }
}

const book = new Book();

book.displayBooks();

addBookBtn.addEventListener('click', () => {
  if (titleInput.value !== '' && authorInput.value !== '') {
    const book = new Book(titleInput.value, authorInput.value);
    book.addBooks();
    titleInput.value = '';
    authorInput.value = '';
  }
})

showFormNavButton.addEventListener('click', () => {
  bookForm.style.display = 'block';
  booksContainer.style.display = 'none';
  homepageTitle.style.display = 'none';
  divider.style.display = 'none';
  contact.style.display = 'none';
  showFormNavButton.classList.add('active');
  showBookNavButton.classList.remove('active');
  showContactNavButton.classList.remove('active');
});

showBookNavButton.addEventListener('click', () => {
  book.booksElement.innerHTML = ""; // refactor this later to remove booksElement as book attribute and have it outside instead
  book.displayBooks();
  bookForm.style.display = 'none';
  booksContainer.style.display = 'block';
  homepageTitle.style.display = 'block';
  divider.style.display = 'block';
  contact.style.display = 'none';
  showFormNavButton.classList.remove('active');
  showContactNavButton.classList.remove('active');
  showBookNavButton.classList.add('active');
});

showContactNavButton.addEventListener('click', () => {
  contact.style.display = 'flex';
  booksContainer.style.display = 'none';
  homepageTitle.style.display = 'none';
  divider.style.display = 'none';
  bookForm.style.display = 'none';
  showContactNavButton.classList.add('active');
  showFormNavButton.classList.remove('active');
  showBookNavButton.classList.remove('active');
});

/* eslint-disable no-undef */
const { DateTime } = luxon;

setInterval(() => { timeNow.innerHTML = `${DateTime.now().toLocaleString(DateTime.DATETIME_MED)}`}, 1000);