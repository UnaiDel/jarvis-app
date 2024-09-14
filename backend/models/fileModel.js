// File model to handle file data
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    data: Buffer,
    contentType: String
});

module.exports = mongoose.model('File', fileSchema);
