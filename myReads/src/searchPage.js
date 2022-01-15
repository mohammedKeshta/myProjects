import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'

class searchPage extends Component {
    
    state={
        books:[],
    };

    updateShelf(book, shelf){
        this.props.updateShelf(book, shelf)
    }

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
                        const checkforShelfState = data.map(book=> {
                            const found = this.props.booksOnShelf.find(({ id }) => id === book.id);
                            book.shelf = found ? found.shelf : 'none';
                            return book;
                        })
                        /*
                        let checkforShelfState = data.map(book=> {
                            for(let i=0; i < this.props.booksOnShelf.length; i++) {
                                if(this.props.booksOnShelf[i].id === book.id) {
                                    book.shelf = this.props.booksOnShelf[i].shelf;
                                }
                            }
                            return book;
                        })
                        */
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
    render() {

        const { books } = this.state
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className='close-search' > Close </Link>
              <div className="search-books-input-wrapper">
                <input 
                    type="text" 
                    placeholder="Search by title or author"
                    onChange={(event)=> this.findBooks(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                { books.length !== 0 && books.map((book, index)=>
                        <Book key={index} myBook={book} updateShelf={(book, shelf)=> 
                            {this.updateShelf(book, shelf)}}
                        />
                    )
                }
              </ol>
            </div>
          </div>
        )
    }
}
export default searchPage;