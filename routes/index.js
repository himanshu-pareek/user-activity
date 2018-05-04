const express = require('express');
const router = express.Router();

var page;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'User Activity' });
});

// render photos page
router.get ('/:page', (req, res) =>  {
    res.render ('photos', {page: req.params.page})
});

// render admin page
router.get ('/:page/admin', (req, res) => {
    res.render ('activity-detail', {page: req.params.page});
});

module.exports = router;
