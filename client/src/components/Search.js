/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  componentDidMount() {
    const { handlePageChange } = this.props;
    handlePageChange('Search');
  }

  render() {
    const {
      handleInputChange, bookQuery, handleFormSubmit, bookList, saveBook
    } = this.props;
    return (
      <div className="searchPage">
        <form className="searchForm">
          <input
            id="search"
            className="searchInput searchField"
            type="text"
            value={bookQuery}
            onChange={handleInputChange}
            placeholder="Type a Book Name"
            name="bookQuery"
          />
          <button type="button" className="searchBtn searchField" onClick={handleFormSubmit}>Search For Books</button>
        </form>

        <div className="searchResults">
          {!bookList.length ? (<div className="noMessage">No Results!</div>) : (
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
                    <button type="button" className="cardDel" onClick={() => saveBook(book.bookId)}>Save This Book</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    );
  }
}

Search.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  bookQuery: PropTypes.string.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  bookList: PropTypes.arrayOf(PropTypes.any).isRequired,
  saveBook: PropTypes.func.isRequired
};

export default Search;
