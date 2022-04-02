
// Book constructor: The blueprint for creating all books.


function Book(author, title, pages, id, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;

    this.info = function() {
        const readStatus = this.isRead ? 'has been read' : 'not yet read';
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus} `;
    }

}


// The library object houses the required methods that enables
// adding book to library
// setting book id
// deleting books
// getting books
// displaying books
// filtering books

const library = (function(Book) {
    const books = []
    let bookId = 0;

    function getBookId() {
        return bookId += 1;
    }

    function getBooks() {
        return books;
    }

    function addBookToLibrary(author, title, pages, id, isRead) {
        const newBook = new Book(author, title, pages, id, isRead);
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
                li +=  `<li class="book readMark" data-index="${counter}" data-author="${book.author}" data-title="${book.title}" data-id="${book.id}">
                            <div class="cover"></div>
                            <p class="title">${book.title}</p>
                            <p class="author">by ${book.author}</p>
                            <p class="info">
                            <span class="pages">${book.pages} pages</span>
                            <label><input type="checkbox" class="read-status-btn" checked>Mark as read</label>
                            </p>
                            <img src="img/bin-icon.svg" class="delete-btn" />
                            <img src="img/edit-btn.svg" class="edit-btn">
                        </li>`;
            }
            else{
                li +=  `<li class="book" data-index="${counter}" data-author="${book.author}" data-title="${book.title}" data-id="${book.id}">
                            <div class="cover"></div>
                            <p class="title">${book.title}</p>
                            <p class="author">by ${book.author}</p>
                            <p class="info">
                            <span class="pages">${book.pages} pages</span>
                            <label><input type="checkbox" class="read-status-btn">Mark as read</label>
                            </p>
                            <img src="img/bin-icon.svg" class="delete-btn" />
                            <img src="img/edit-btn.svg" class="edit-btn">
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
        addBookToLibrary, displayBooks, matchBook, getBooks, getBookId, removeBook
    }
})(Book);




// -------- DOM STUFF ---------- //

const searchInput = document.querySelector('input[type=search]');
const bookShelf = document.querySelector('.book-shelf');
const addBookBtn = document.querySelector('.add-book');
const bookInfoForm = document.querySelector('.form-div');

function removeElementDislay(element) {
    const div = element.parentNode.parentNode;
    div.style.display = 'none';
}

function addAndDisplayBooks() {
    const author  = document.querySelector('#author');
    const title  = document.querySelector('#title');
    const pages  = document.querySelector('#pages');
    const bookId = library.getBookId()
    
    if(author.value && title.value && pages.value) {
        library.addBookToLibrary(author.value, title.value, parseInt(pages.value), bookId, false)
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

function filterBooks(e) {
    const input = e.target;
    const books = bookShelf.children;

    for(let i = 0; i < books.length; i += 1) {
        const title = books[i].dataset.title;
        const author = books[i].dataset.author;
        const regex = new RegExp(input.value, 'gi')
        if(title.match(regex) || author.match(regex) || input.value === '') {
            books[i].style.display = 'block';
        }
        else{
            books[i].style.display = 'none';
        }
    }
}

function updateReadStatus(books, updateButton, readStatus) {
    const li = updateButton.parentNode.parentNode.parentNode;
    const bookId = li.dataset.id;

    books.forEach(book => {
        if(book.id == bookId) {
            book.isRead = readStatus;

            if(book.isRead) {
                li.classList.add('readMark');
            }
            else {
                li.classList.remove('readMark');
            }
        }
    })
}

function deleteBook(books, deleteButton) {
    const li = deleteButton.parentNode;
    const bookId = li.dataset.id

    books.forEach(book => {
        if(book.id == bookId) {
            books.splice(books.indexOf(book), 1)
            li.remove()
        }
    })

}

function openForm(buttonContent, headerContent) {
    const bookInfoForm = document.querySelector('.form-div');
    const saveBtn = document.querySelector('.add-btn')
    const formHeader = document.querySelector('.book-info-form h2')

    bookInfoForm.style.display = 'flex';
    saveBtn.textContent = buttonContent;
    formHeader.textContent = headerContent;
}

// -------- EVENT LISTENERS --------- //

addBookBtn.addEventListener('click', () => {
    openForm('Add book', 'Add book to library');
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

    if(button.textContent === 'Save') {
        
    }

    if(button.classList.contains('form-div')) {
        button.style.display = 'none';
        clearFormField()
    }
})

searchInput.addEventListener('input', filterBooks)

bookShelf.addEventListener('click', (e) => {
    const button = e.target;
    const books = library.getBooks();

    if(button.className === 'read-status-btn') {
        if(button.checked) {
            updateReadStatus(books, button, true)
        }
        else {
            updateReadStatus(books, button, false)
        }
    }

    if(button.className === 'delete-btn') {
        deleteBook(books, button)
    }

    if(button.className === 'edit-btn') {
        const li = button.parentNode
        bookShelf.dataset.elementId = li.dataset.id;
        openForm('Save', 'Edit book info')        
    }
})


//---------- ROAD MAP ----------- //
// Book edit feature
// Confirm book delete feature
// Sign in/Sign up
