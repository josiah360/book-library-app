const people = [
    {
    name: 'Olajide Ajibola',
    occupation: 'engineer',
    salary: 30000,
    index: 1
    },
    {
    name: 'Mariam Balogun',
    occupation: 'fashion designer',
    salary: 20000,
    index: 1
    },
    {
    name: 'Israel',
    occupation: 'student',
    salary: 500,
    index: 1
    }
]

let person = people.filter(person => person.occupation === 'student');
person[0].delete = true;
people.forEach(person => {
    if(person.delete) {
        people.splice(people.indexOf(person), 1)
    }
})

person = people.filter(person => person.occupation === 'student');

console.log(person)
console.log(people)




// Book constructor: The blueprint for creating all books.


function Book(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function() {
        const readStatus = this.isRead ? 'has been read' : 'not yet read';
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus} `;
    }
}


// The library object houses the required methods that enables
// adding book to library
// deleting books
// getting books
// displaying books
// filtering books

const library = (function(Book) {
    const books = []

    function getBooks() {
        return books;
    }

    function addBookToLibrary(author, title, pages, isRead) {
        const newBook = new Book(author, title, pages, isRead);
        books.push(newBook)
    }

    function removeBook(index, array) {
        array.splice(index, 1)
    }

    function displayBooks(element, array) {
        let counter  = 0;
        const html = array.map(book => {
            let li =``;
            if(book.isRead) {
                li +=  `<li class="book readMark" data-index="${counter}">
                            <div class="cover"></div>
                            <p class="title">${book.title}</p>
                            <p class="author">by ${book.author}</p>
                            <p class="info">
                            <span class="pages">${book.pages} pages</span>
                            <label><input type="checkbox" class="read-status" checked>Mark as read</label>
                            </p>
                            <img src="img/bin-icon.svg" class="delete-btn" />
                        </li>`;
            }
            else{
                li +=  `<li class="book" data-index="${counter}">
                            <div class="cover"></div>
                            <p class="title">${book.title}</p>
                            <p class="author">by ${book.author}</p>
                            <p class="info">
                            <span class="pages">${book.pages} pages</span>
                            <label><input type="checkbox" class="read-status">Mark as read</label>
                            </p>
                            <img src="img/bin-icon.svg" class="delete-btn" />
                        </li>`;
            }
            
                counter += 1;
                return li;
        })
        element.innerHTML = html.join('');
    }

    function matchBook(wordToMatch) {
        return books.filter(book => {
            const regex = new RegExp(wordToMatch, 'gi');
            return book.title.match(regex) || book.author.match(regex);
        })
    }

    return {
        addBookToLibrary, displayBooks, matchBook, getBooks, removeBook
    }
})(Book);




// -------- DOM STUFF ---------- //

const searchInput = document.querySelector('input[type=search]');
const bookShelf = document.querySelector('.book-shelf');
const addBookBtn = document.querySelector('.add-book');
const bookInfoForm = document.querySelector('.form-div');

library.addBookToLibrary('Robert Green', '48 Laws of Power', 45, false)
library.addBookToLibrary('Robert Green', 'Power of Seduction', 45, false)
library.addBookToLibrary('Danielle Robert', 'Moral Compass', 45, false)
library.displayBooks(bookShelf, library.getBooks())

function removeElementDislay(element) {
    const div = element.parentNode.parentNode;
    div.style.display = 'none';
}

function addAndDisplayBooks() {
    const author  = document.querySelector('#author');
    const title  = document.querySelector('#title');
    const pages  = document.querySelector('#pages');

    if(author.value && title.value && pages.value) {
        library.addBookToLibrary(author.value, title.value, parseInt(pages.value))
        const books = library.getBooks()
        library.displayBooks(bookShelf, books)
    }

    author.value = '';
    title.value = '';
    pages.value = '';
}

function clearFormField() {
    const author  = document.querySelector('#author');
    const title  = document.querySelector('#title');
    const pages  = document.querySelector('#pages');
    author.value = '';
    title.value = '';
    pages.value = '';

}

addBookBtn.addEventListener('click', () => {
    const bookInfoForm = document.querySelector('.form-div');
    bookInfoForm.style.display = 'flex';
})

bookInfoForm.addEventListener('click', (e) => {
    const button = e.target;
    if(button.textContent === 'Cancel') {
        removeElementDislay(button);
        clearFormField()
    }

    if(button.textContent === 'Add book') {
        addAndDisplayBooks()
        removeElementDislay(button)  
    }

    if(button.classList.contains('form-div')) {
        button.style.display = 'none';
        clearFormField()
    }
})

searchInput.addEventListener('input', (e) => {
    const input = e.target;
    let filtered = library.matchBook(input.value);
    library.displayBooks(bookShelf, filtered);
})

bookShelf.addEventListener('click', (e) => {
    const checkbox = e.target;
    const books = library.getBooks();
    if(checkbox.className === 'read-status') {
        const li = checkbox.parentNode.parentNode.parentNode;
        
        if(checkbox.checked) {
            books[li.dataset.index].isRead = true;
            if(searchInput.value === '') {
                library.displayBooks(bookShelf, library.getBooks());
            }
            else {
                const filtered = library.matchBook(searchInput.value);
                library.displayBooks(bookShelf, filtered);
            }
        }
        else {
            books[li.dataset.index].isRead = false;
            if(searchInput.value !== '') {
                library.displayBooks(bookShelf, library.getBooks());
            }
            else {
                const filtered = library.matchBook(searchInput.value);
                library.displayBooks(bookShelf, filtered);
            }  
        }
    }

    else if(checkbox.className === 'delete-btn') {
        const li = checkbox.parentNode;
        if(searchInput.value !== '') {
            let filtered = library.matchBook(searchInput.value);

            filtered[li.dataset.index].delete = true;
            books.forEach(book => {
                if(book.delete) {
                    books.splice(books.indexOf(book), 1);
                }
            })

            filtered = library.matchBook(searchInput.value)
            library.displayBooks(bookShelf, filtered);
        }
        else {
            library.removeBook(li.dataset.index, books);
            library.displayBooks(bookShelf, books);
        }
    }
})


//---------- ROAD MAP ----------- //
// Book edit feature
// Confirm book delete feature
// Sign in/Sign up
