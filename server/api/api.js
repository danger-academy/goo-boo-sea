const router = require('express').Router();
const path = require('path');

router.use('/books', require('./book/bookRoutes'));

router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

module.exports = router;
