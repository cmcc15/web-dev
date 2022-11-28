const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'This is a required field'
    },
    image:{
        type: String,
        required: 'This is a required field'
    }
});

module.exports = mongoose.model('test',testSchema);