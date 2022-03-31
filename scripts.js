// const library = []

// function Book(author, title, pages, isRead) {
//     this.author = author;
//     this.title = title;
//     this.pages = pages;
//     this.isRead = isRead;

//     this.info = function() {
//         const readStatus = this.isRead ? 'has been read' : 'not yet read';
//         return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus} `;
//     }
// }

// function addBookToLibrary(author, title, pages, isRead) {
//     const newBook = new Book(author, title, pages, isRead);
//     library.push(newBook)
// }

// function displayBooks(element, array) {
//     const html = array.map(book => {
//         return `<li class='book'>
//                     <div class="cover"></div>
//                     <p class="title">${book.title}</p>
//                     <p class="author">by ${book.author}</p>
//                     <p class="info">
//                         <span class="pages">${book.pages} pages</span>
//                         <label><input type="checkbox">Mark as read</label>
//                     </p>
//                     <img src="img/bin-icon.svg">
//                 </li>`;
        
//     })
//     element.innerHTML = html.join('');
// }

// function matchBook(wordTomatch, library) {
//     return library.filter(book => {
//         const regex = new RegExp(wordTomatch, 'gi');
//         return book.title.match(regex) || book.author.match(regex);
//     })
// }

const searchInput = document.querySelector('input[type=search]');
const bookShelf = document.querySelector('.book-shelf');
const addBookBtn = document.querySelector('.add-book');
const bookInfoForm = document.querySelector('.book-info-form');

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


const library = (function(Book) {
    const books = []

    function getBooks() {
        return books;
    }

    function addBookToLibrary(author, title, pages, isRead) {
        const newBook = new Book(author, title, pages, isRead);
        books.push(newBook)
    }

    function displayBooks(element, array) {
        const html = array.map(book => {
            return `<li class='book'>
                        <div class="cover"></div>
                        <p class="title">${book.title}</p>
                        <p class="author">by ${book.author}</p>
                        <p class="info">
                            <span class="pages">${book.pages} pages</span>
                            <label><input type="checkbox">Mark as read</label>
                        </p>
                        <img src="img/bin-icon.svg">
                    </li>`;
            
        })
        element.innerHTML = html.join('');
    }

    function matchBook(wordTomatch, library) {
        return library.filter(book => {
            const regex = new RegExp(wordTomatch, 'gi');
            return book.title.match(regex) || book.author.match(regex);
        })
    }

    return {
        addBookToLibrary, displayBooks, matchBook, getBooks
    }
})(Book);


// DOM ELEMENTS

function removeElementDislay(element) {
    element.style.display = 'none'
}

addBookBtn.addEventListener('click', () => {
    const bookInfoForm = document.querySelector('.form-div');
    bookInfoForm.style.display = 'flex';
})

bookInfoForm.addEventListener('click', (e) => {
    const button = e.target;
    if(button.textContent === 'Cancel') {
        const div = button.parentNode.parentNode;
        div.style.display = 'none';
    }

    if(button.textContent === 'Add Book') {
        
    }
})