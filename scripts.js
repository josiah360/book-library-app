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
// Adding book to library
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

    function displayBooks(element, array) {
        let counter  = 0;
        const html = array.map(book => {
            const li =`<li class='book' data-index="${counter}">
                        <div class="cover"></div>
                        <p class="title">${book.title}</p>
                        <p class="author">by ${book.author}</p>
                        <p class="info">
                            <span class="pages">${book.pages} pages</span>
                            <label><input type="checkbox" class="read-status">Mark as read</label>
                        </p>
                        <img src="img/bin-icon.svg" class="delete-btn" />
                    </li>`;
                    counter += 1;
                    return li;
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
    const filtered = library.matchBook(input.value, library.getBooks())
    library.displayBooks(bookShelf, filtered);
})

bookShelf.addEventListener('click', (e) => {
    const checkbox = e.target;
    const books = library.getBooks();
    if(checkbox.className === 'read-status') {
        const li = checkbox.parentNode.parentNode.parentNode;
        
        if(checkbox.checked) {
            books[li.dataset.index].isRead = true;
            li.classList.add('readMark')
        }
        else {
            books[li.dataset.index].isRead = false;
            li.classList.remove('readMark');   
        }
    }

    else if(checkbox.className === 'delete-btn') {
        const li = checkbox.parentNode;
        books.splice(li.dataset.index, 1)
        library.displayBooks(bookShelf, books)
    }
})


//---------- ROAD MAP ----------- //
// Book edit feature
// Confirm book delete feature
// Sign in/Sign up
