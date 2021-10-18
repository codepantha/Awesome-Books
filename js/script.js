// STEP 1: create the html skeleton of the website - completed

// STEP 2: Create an array of objects containing the collection of books
let books = [
  { title: "The keys to success", author: "codepanther" },
  { title: "The girl with the dragon tatoo", author: "the unknown author" },
];

// STEP 3: Create a function that adds new books to the array in step 2

const addBookBtn = document.querySelector("#addBtn");

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBooks();
});

const addBooks = () => {
  const title = document.querySelector(".title-input").value;
  const author = document.querySelector(".author-input").value;

  const newBook = {
    title,
    author,
  };

  books.push(newBook);
};

// const booksElement = document.querySelector(".books");

// const addBook = (title, author) => {
//   books.forEach((book) => {
//     booksElement.innerHTML = `
//     <div class="book">
//     <p class="title">${book.title}</p>
//     <p class="author">${book.author}</p>
//     <button id="remove-btn">Remove</button>
//     <hr class="bottom-border" />
//   </div>`;
//   });
// };

// 3.1: Store individual books in localstorage
// 3.2: Add functionality to the add button to add new books to the array and display it

// STEP 4: Create a function to remove books from the array( book collection)
// 4.1 : When the remove button is clicked, remove the books from the array and stop displaying it
// 4.2 : Remove the book item from localStorage

// STEP 5: Display the books in the top part of the page
