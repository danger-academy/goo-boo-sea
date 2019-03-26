/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import API from '../utils/API';


class Saved extends Component {
  state = {
    savedBooks: []
  }

  componentDidMount() {
    const { handlePageChange } = this.props;
    handlePageChange('Saved');
    this.getSavedBooks();
  }

  getSavedBooks = () => {
    API.getSavedBooks()
      .then(({ data: savedBooks }) => this.setState({ savedBooks }))
      .catch(err => console.log(err));
  }

  deleteBook = (bookId) => {
    const { savedBooks } = this.state;
    const { _id: deleteId } = savedBooks.find(({ _id }) => bookId === _id);
    API.deleteBook(deleteId)
      .then(() => this.getSavedBooks())
      .catch(err => console.log(err));
  }

  render() {
    const { savedBooks: bookList } = this.state;
    return (
      <div className="savedPage">
        {!bookList.length ? (<div className="noMessage">No Saved Books!</div>) : (
          bookList.map(book => (
            <div className="card-container" onTouchStart={() => this.classList.toggle('hover')} key={book._id}>
              <div className="card">
                <div className="front">
                  <img className="cardImg" src={book.image} alt={book.title} />
                </div>
                <div className="back">
                  <div className="cardTitle">{book.title}</div>
                  <div className="cardAuthor">{book.authors}</div>
                  <div className="cardDesc">{book.description}</div>
                  <a className="cardInfo" href={book.link} rel="noopener noreferrer" target="_blank">View More Info</a>
                  <button type="button" className="cardDel" onClick={() => this.deleteBook(book._id)}>Delete This Book</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}

Saved.propTypes = {
  handlePageChange: PropTypes.func.isRequired
};

export default Saved;
