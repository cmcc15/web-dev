const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    Username:{
        type: String,
        required: 'This is a required field'
    },
    Email:{
        type: String,
        required: 'This is a required field'
    },
    Password:{
        type: String,
        required: 'This is a required field'
    },
    Confirm_Password:{
        type: String,
        required: 'This is a required field'
    }
});

module.exports = mongoose.model('log',logSchema);