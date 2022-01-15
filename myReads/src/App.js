import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchPage from './searchPage'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books:[] ,
  }

  componentDidMount() {
    BooksAPI.getAll()
        .then(book=>this.setState({
          books: book
        }));
  };
  handleShelfUpdate(book, shelf) {
    BooksAPI.update(book, shelf)
      .then(()=>{
        book.shelf = shelf;
        this.setState(currState=>({
          books: currState.books.filter(item=> item.id !== book.id).concat([book])
        }))
      })
  }
  render() {
    return (
      <div className="app">
          <Route exact path ="/search">
          <SearchPage 
            updateShelf={(book, shelf)=> {this.handleShelfUpdate(book, shelf)}}
            booksOnShelf={this.state.books} 
          />
          </Route>
          <Route exact path='/' render={({ history })=>(
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf 
                    title='Currently Reading'
                    shelfBooks={
                      this.state.books.filter(item => item.shelf === 'currentlyReading')
                    }
                    updateShelf={(book, shelf)=>{this.handleShelfUpdate(book, shelf)}}
                  />
                  <BookShelf 
                    title='Want to Read'
                    shelfBooks={
                      this.state.books.filter(item => item.shelf === 'wantToRead')
                    }
                    updateShelf={(book, shelf)=>{this.handleShelfUpdate(book, shelf)}}
                  />
                  <BookShelf 
                    title='Read'
                    shelfBooks={
                      this.state.books.filter(item => item.shelf === 'read')
                    }
                    updateShelf={(book, shelf)=>{this.handleShelfUpdate(book, shelf)}}
                  />
                </div>
              </div>
              <div className="open-search"> 
                <Link to='/search' className="open-search">Add A Book</Link>
              </div>
            </div>
          )}/>
      </div>
    )
  }
}

export default BooksApp;
