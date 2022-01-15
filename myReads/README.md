# MyReads Project

## Table of Contents:

* [Pre_Notification](#pre_notification)
* [Description](#description).
* [Details](#details).
* [Code_Overview](#code_quick_overview).
* [Acquired_knowledge](#acquired_knowledge).
* [Backend_Server](#backend_server).
* [Important](#important).
* [Create_React_App](#create_react_app).

### Pre_Notification
    The application was created with create-react-app and requires only "npm install" (in order to install all node modules required), and "npm start" to get it launched.

### Description

   * This is the 1st Project at the Udacity ND Advanced Web Development Track. It is about a lending page which states the state of the books (Currently Reading, Want To Read, or Read).
   * In the Main App page these states are assembled with 3 shelves. Every shelf has a group of book which state is the same as the holding shelf. The Book state can be altered with a control button which gives you the ability to change the state of the book between the 3 states or even remove it from the shelves.
   * The other Page is for search purposes, which can be opened with a Link in the right bottom of the page. This page allows you to search for the books which is provided by the BookAPI we have. If the search process is right you will see all book that matches your query (along with the books in your shelves) with the current state of each book. If the query doesn't match any of our BookAPI the page will show nothing.

### Details

   * The App consists of:
    * Front-End Part:
        Which consists of 3 Components (Book, BookShelf, and SearchPage) + the Main page.
    * Back-End Part:
        Which is (BooksAPI) and it is already provided By Udacity.(please review the [Backend_Server](#backend_server) section for details)

### Code_Overview
    This is A quick but not full overwiew about what code we implemented
   * Main Page `App.js`  :
    * what was imported:
        ```javascript
        import React from 'react' /*in order to benefit of React adv.*/
        import * as BooksAPI from './BooksAPI' /* to link with our Back-End Server */
        import './App.css' /* to style our code */
        import BookShelf from './BookShelf' /* to use the 1st component, which imports the 2nd component by itself */
        import SearchPage from './searchPage' /* to use the 3rd component */
        import { Route } from 'react-router-dom' /* to Route between the Main page and the search page */
        import { Link } from 'react-router-dom' /* to Link between the Main page and the search page instead of using button */
        ```
   * `BookShelf.js` component :
    ```javascript
        /* we used this code to set the shelf with the Book/s that met the state of each shelf when updated*/
        {
            this.props.shelfBooks.length > 0 && this.props.shelfBooks.map((item)=> (
                <Book key={item.id} myBook={item} updateShelf={(book, shelf)=> {this.updateShelf(book, shelf)}}/>
            ))
        }
    ```
   * `Book.js` component :
    ```javascript
        /* We used this part to overcome the problem that results from that some books has no Thumbnail*/
        let imageLink= ''
        if (this.props.myBook.imageLinks) {
	        if (this.props.myBook.imageLinks.thumbnail) {
		        imageLink= this.props.myBook.imageLinks.thumbnail
	        }
	        else if (this.props.myBook.imageLinks.smallThumbnail) {
		        imageLink= this.props.myBook.imageLinks.smallThumbnail
	        }
        }
        /* This part was used to overcome the issue resulting from that some books has more than one author*/
        {this.props.myBook.authors? this.props.myBook.authors.join(', '): ''}
    ```
   * `searchPage.js` component :
    ```javascript
        /* This function was made to do the required search and handle errors from not finding a book or typing any letters*/
        findBooks(query) {
        if(!!query) {
            BooksAPI.search(query)
                .then(data=>{
                    if(!!data.error) {
                        this.setState({
                            books: []
                        });
                    }
                    else {
                        let checkforShelfState = data.map(book=> {
                            for(let i=0; i < this.props.booksOnShelf.length; i++) {
                                if(this.props.booksOnShelf[i].id === book.id) {
                                    book.shelf = this.props.booksOnShelf[i].shelf;
                                }
                            }
                            return book;
                        })
                        this.setState({
                            books: checkforShelfState
                        });
                    }
                })
        }
        else {
            this.setState({
                books: []
            });
        }
    }
    ```
### Acquired_knowledge
   * How to use [React](https://reactjs.org/) in Building projects
   * How to divide projects into smaller usable components
   * How to use Routes and Links to maintain the Ease of navigation between Pages of the App

### Backend_Server

Provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

#### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

#### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

#### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

### Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

### Create_React_App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).