var mongoose = require('mongoose');

var PageSchema = new mongoose.Schema({
    page_id: String,
    photo1: String,
    photo2: String,
    photo3: String,
    photo4: String,
    photo5: String
});

module.exports = mongoose.model('Page', PageSchema);
