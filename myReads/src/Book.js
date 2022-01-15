import React, { Component } from 'react'

class Book extends Component {
    
    handleChange(value) {
        this.props.updateShelf(this.props.myBook, value)
    }

    render() {
        let imageLink= ''
        if (this.props.myBook.imageLinks) {
	        if (this.props.myBook.imageLinks.thumbnail) {
		        imageLink= this.props.myBook.imageLinks.thumbnail
	        }
	        else if (this.props.myBook.imageLinks.smallThumbnail) {
		        imageLink= this.props.myBook.imageLinks.smallThumbnail
	        }
        }

        return (
            <div>
               <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLink}")` }}></div>
                            <div className="book-shelf-changer">
                              <select
                                value= {this.props.myBook.shelf || 'none'}
                                onChange={(event)=>this.handleChange(event.target.value)}
                              >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{this.props.myBook.title}</div>
                          <div className="book-authors">
                              {this.props.myBook.authors? this.props.myBook.authors.join(', '): ''}
                          </div>
                        </div>
                </li>  
            </div>
        )
    }
}
export default Book;