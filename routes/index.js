const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'TinyPlate' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({}));
});

module.exports = router;
