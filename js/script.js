// STEP 1: create the html skeleton of the website - completed

// STEP 2: Create an array of objects containing the collection of books
let books = [];

const booksElement = document.querySelector(".books");
const titleInput = document.querySelector(".title-input");
const authorInput = document.querySelector(".author-input");
const addBookBtn = document.querySelector("#addBtn");

// STEP 3: Create a function that adds new books to the array in step 2


addBookBtn.addEventListener("click", (e) => {
  // e.preventDefault();
  addBooks();
});

const getExistingBooks = () => {
  return JSON.parse(localStorage.getItem("books"));
}

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

  localStorage.setItem("books", JSON.stringify(books));
  books = [];

  titleInput.value = authorInput.value = "";
};

const displayBooks = () => {

  if (getExistingBooks()) {
    getExistingBooks().forEach((book) => {
      booksElement.innerHTML += `
      <div class="book">
      <p class="title">${book.title}</p>
      <p class="author">${book.author}</p>
      <button id="remove-btn">Remove</button>
      <hr class="bottom-border" />
      </div>`;
    });
  }
};

displayBooks();

// 3.1: Store individual books in localstorage
// 3.2: Add functionality to the add button to add new books to the array and display it

// STEP 4: Create a function to remove books from the array( book collection)
// 4.1 : When the remove button is clicked, remove the books from the array and stop displaying it
// 4.2 : Remove the book item from localStorage

// STEP 5: Display the books in the top part of the page
