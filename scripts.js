const bookShelf = document.querySelector('.book-shelf');

const library = []

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

function addBookToLibrary(author, title, pages, isRead) {
    const newBook = new Book(author, title, pages, isRead);
    library.push(newBook)
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



