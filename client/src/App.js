import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import Search from './components/Search';
import Saved from './components/Saved';

import API from './utils/API';
import './scss/styles.scss';

class App extends Component {
  state = {
    bookQuery: '',
    bookList: [],
    activePageHeader: 'One Huge Library'
  };

  searchGoogleBooks = (query) => {
    API.searchGoogleBooks(query)
      .then(({ data }) => {
        const bookList = data.items.map(book => ({
          bookId: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors || 'J. R. R. Tolkien',
          description: (book.searchInfo) ? book.searchInfo.textSnippet : 'No Description',
          link: book.volumeInfo.infoLink,
          image: (book.volumeInfo.imageLinks) ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/90x150'
        }));
        this.setState({ bookList }, () => this.handlePageChange('Search'));
      })
      .catch(err => console.log(err));
  }

  handlePageChange = (pageTitle) => {
    const activePageHeader = (pageTitle === 'Search' ? 'One Huge Library' : 'View the Collection');
    this.setState({ activePageHeader });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { bookQuery } = this.state;
    if (bookQuery) {
      this.searchGoogleBooks(bookQuery);
      this.setState({ bookQuery: '' });
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  saveBook = (id) => {
    const { bookList } = this.state;
    const book = bookList.find(book => book.bookId === id);

    API.saveBook(book)
      .then(() => {})
      .catch(err => console.log(err));
  }

  render() {
    const { activePageHeader, bookQuery, bookList } = this.state;

    return (
      <Router>
        <div>
          <Nav />

          <Dashboard activePageHeader={activePageHeader} />

          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Search
                  handleInputChange={this.handleInputChange}
                  bookQuery={bookQuery}
                  handleFormSubmit={this.handleFormSubmit}
                  handlePageChange={this.handlePageChange}
                  bookList={bookList}
                  saveBook={this.saveBook}
                />
              )}
            />
            <Route
              exact
              path="/saved"
              render={() => (
                <Saved
                  handlePageChange={this.handlePageChange} 
                />
              )}
            />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
