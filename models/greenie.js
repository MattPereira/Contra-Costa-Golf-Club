const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const greenieSchema = new Schema({
    holeNum: Number,
    feet: Number,
    inches: Number,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Greenie", greenieSchema);