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

