var express = require('express');
var router = express.Router();

var Activity = require('../models/activity.js');

// Get all the activities for specific page
router.get ('/:page/admin', (req, res) => {
    var page = req.params.page;
    //console.log("page", page);
    Activity.find ({page: page}).then ((Activities) => {
        res.send (Activities);
    }, (e) => {
        res.status (400).send ();
    });
});

/* POST /activities */
router.post('/', (req, res, next) => {
    console.log(req.body);
    Activity.create(req.body, (err, doc) => {
        if (err) return next(err);
        res.json(doc);
    });
});

// Get all the photos for specific page
router.get ('/:page', (req, res) =>  {
    // res.render ('photos', {page: req.params.page})
    page = req.params.page;
    photoArray = ['watch1.jpg', 'watch2.jpg', 'watch3.jpg', 'watch4.jpg', 'watch5.jpg'];
    res.send (photoArray);
});

module.exports = router;
