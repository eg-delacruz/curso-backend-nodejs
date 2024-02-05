const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Soy los users');
});

module.exports = router;
