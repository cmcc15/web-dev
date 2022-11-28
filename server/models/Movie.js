const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'This is a required field'
    },
    description:{
        type: String,
        required: 'This a field is required'
    },
    email:{
        type: String,
        required: 'This a field is required'
    },
    category: {
        type: String,
        enum: ['Action','Comedy','Thriller','Horror','Sci-fi', 'Crime'],
        required: 'This field is required.'
      },
    image:{
        type: String,
        required: 'This a field is required'
    }
});



movieSchema.index({ name: 'text', description: 'text' });


module.exports = mongoose.model('Movie',movieSchema);