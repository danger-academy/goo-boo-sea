import axios from 'axios';

export default {
  getSavedBooks: () => axios.get('/api/books'),
  getBookById: bookId => axios.get(`/api/books/${bookId}`),
  saveBook: bookData => axios.post('/api/books', bookData),
  updateBook: (bookId, bookData) => axios.put(`/api/books/${bookId}`, bookData),
  deleteBook: bookId => axios.delete(`/api/books/${bookId}`),
  searchGoogleBooks: query => axios.get('https://www.googleapis.com/books/v1/volumes', { params: { q: query } })
};
