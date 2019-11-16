import { get, post, put, del } from './requester.js';

const html = {
    'getAllBooks': () => document.getElementById('all-books'),
    'getBookTitle': () => document.getElementById('title'),
    'getBookAuthor': () => document.getElementById('author'),
    'getBookIsbn': () => document.getElementById('isbn'),
    'getEditTitle': () => document.getElementById('edit-title'),
    'getEditAuthor': () => document.getElementById('edit-author'),
    'getEditIsbn': () => document.getElementById('edit-isbn'),
    'getEditId': () => document.getElementById('edit-id'),
}

const actions = {
    'load-books': async function () {
        try {
            const books = await get('appdata', 'books');
            const booksContainer = html.getAllBooks();
            const fragment = document.createDocumentFragment();

            books.forEach((b) => {
                const trWrapper = document.createElement('tr');
                const trTitle = document.createElement('td');
                const trAuthor = document.createElement('td');
                const trIsbn = document.createElement('td');
                const tdWrapper = document.createElement('td');
                const btnEdit = document.createElement('button');
                const btnDelete = document.createElement('button');

                trTitle.textContent = b.title;
                trAuthor.textContent = b.author;
                trIsbn.textContent = b.isbn;

                btnEdit.textContent = 'Edit';
                btnEdit.id = b._id;
                btnEdit.addEventListener('click', this["edit-book-get"]);

                btnDelete.textContent = 'Delete';
                btnDelete.id = b._id;
                btnDelete.addEventListener('click', this["delete-book"]);

                tdWrapper.append(btnEdit, btnDelete);
                trWrapper.append(trTitle, trAuthor, trIsbn, tdWrapper);
                fragment.appendChild(trWrapper);
            })
            booksContainer.innerHTML = '';
            booksContainer.appendChild(fragment);

        } catch (error) {
            alert(error);
        }
    },
    'create-book': async function () {
        const $title = html.getBookTitle();
        const $author = html.getBookAuthor();
        const $isbn = html.getBookIsbn();

        if ($title !== null && $author !== null && $isbn !== null) {
            const data = {
                title: $title.value,
                author: $author.value,
                isbn: $isbn.value
            }

            try {
                await post('appdata', 'books');

                $title.value = '',
                    $author.value = '',
                    $isbn.value = ''

                this["load-books"]();
            } catch (error) {
                alert(error);
            }
        }

    },
    'edit-book-get': async function () {
        const id = this.id;
        try {
            const singleBook = await get('appdata', `books/${id}`);

            const $id = html.getEditId();
            const $title = html.getEditTitle();
            const $author = html.getEditAuthor();
            const $isbn = html.getEditIsbn();

            $title.value = singleBook.title;
            $author.value = singleBook.author;
            $isbn.value = singleBook.isbn;
            $id.value = singleBook._id;

        } catch (error) {
            alert(error);
        }
    },
    'edit-book-post': async function () {
        const $id = html.getEditId();
        const $title = html.getEditTitle();
        const $author = html.getEditAuthor();
        const $isbn = html.getEditIsbn();

        if ($title !== null && $author !== null && $isbn !== null) {
            const data = {
                title: $title.value,
                author: $author.value,
                isbn: $isbn.value
            };
            try {
                const modifiedBook = await put('appdata', `books/${$id.value}`, data);
                console.log(modifiedBook);
                $id.value = '';
                $title.value = '';
                $author.value = '';
                $isbn.value = '';
                actions['load-books']();
            } catch (error) {
                alert(error)
            }
        }

    },
    'delete-book': async function () {
        if (confirm('Are you sure?')) {
            const id = this.id;

            try {
                const entitiesDelete = await del('appdata', `books/${id}`);
                actions['load-books']();
            } catch (error) {
                alert(error)
            }
        }
    }
}

function handleEvent(e) {
    if (typeof actions[e.target.id] === 'function') {
        e.preventDefault();
        actions[e.target.id]();
    }
}


(function attachEvents() {
    document.addEventListener('click', handleEvent)
}());

