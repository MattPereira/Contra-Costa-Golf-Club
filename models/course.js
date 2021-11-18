const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    hole1: {
        par: Number,
    },
    hole2: {
        par: Number,
    },
    hole3: {
        par: Number,
    },
    hole4: {
        par: Number,
    },
    hole5: {
        par: Number,
    },
    hole6: {
        par: Number,
    },
    hole7: {
        par: Number,
    },
    hole8: {
        par: Number,
    },   
    hole9: {
        par: Number,
    },
    hole10: {
        par: Number,
    },
    hole11: {
        par: Number,
    },
    hole12: {
        par: Number,
    },
    hole13: {
        par: Number,
    },
    hole14: {
        par: Number,
    },
    hole15: {
        par: Number,
    },
    hole16: {
        par: Number,
    },
    hole17: {
        par: Number,
    },
    hole18: {
        par: Number,
        }
});

module.exports = mongoose.model('Course', CourseSchema)