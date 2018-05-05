const express = require('express');
const router = express.Router();
const fs = require ('fs');

const TOTAL_IMAGES = 13;

var Activity = require('../models/activity.js');
var Page = require ('../models/page.js');

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
    var page = req.params.page;
    Page.find ({page_id: page}).then ((pages) => {
        if (pages.length === 0) {
            // res.send (['watch1.jpg', 'watch2.jpg', 'watch3.jpg', 'watch4.jpg', 'watch5.jpg']);
            try {
                var count = fs.readFileSync ('routes/counts.txt');
                count = parseInt (count);
                Page.create ({page_id: page,
                    photo1: 'watch' + count + '.jpg',
                    photo2: 'watch' + (count + 1) % TOTAL_IMAGES + '.jpg',
                    photo3: 'watch' + (count + 2) % TOTAL_IMAGES + '.jpg',
                    photo4: 'watch' + (count + 3) % TOTAL_IMAGES + '.jpg',
                    photo5: 'watch' + (count + 4) % TOTAL_IMAGES + '.jpg'
                }, (err, doc) => {
                    if (err) return next (err);
                    fs.writeFileSync ('routes/counts.txt', (count + 5) % TOTAL_IMAGES);
                    //res.json (doc);
                    res.json ([doc['photo1'], doc['photo2'], doc['photo3'], doc['photo4'], doc['photo5']]);
                });
                // res.send ({count});
            } catch (e) {
                res.send ({e})
            }
        } else {
            // res.json (pages);
            res.json ([pages[0]['photo1'], pages[0]['photo2'], pages[0]['photo3'], pages[0]['photo4'], pages[0]['photo5']]);
        }
        // res.send (pages);
    }, (e) => {
        res.status (400).send ();
    });
    // photoArray = ['watch1.jpg', 'watch2.jpg', 'watch3.jpg', 'watch4.jpg', 'watch5.jpg'];
    // res.send (photoArray);
});

module.exports = router;
