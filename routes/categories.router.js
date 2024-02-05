const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Soy las categories');
});

module.exports = router;
