const mongoose = require('mongoose');
const Greenie = require('./greenie')

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
	name: String,
	handicap: Number,
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	greenies: [
		{
		type: Schema.Types.ObjectId,
		ref: 'Greenie'
		}   
	],
	hole1: {
			strokes: Number,
			putts: Number
	},
	hole2: {
			strokes: Number,
			putts: Number
	},
	hole3: {
			strokes: Number,
			putts: Number
	},
	hole4: {
			strokes: Number,
			putts: Number
	},
	hole5: {
			strokes: Number,
			putts: Number
	},
	hole6: {
			strokes: Number,
			putts: Number
	},
	hole7: {
			strokes: Number,
			putts: Number
	},
	hole8: {
			strokes: Number,
			putts: Number
	},   
	hole9: {
			strokes: Number,
			putts: Number
	},
	hole10: {
			strokes: Number,
			putts: Number
	},
	hole11: {
			strokes: Number,
			putts: Number
	},
	hole12: {
			strokes: Number,
			putts: Number
	},
	hole13: {
			strokes: Number,
			putts: Number
	},
	hole14: {
			strokes: Number,
			putts: Number
	},
	hole15: {
			strokes: Number,
			putts: Number
	},
	hole16: {
			strokes: Number,
			putts: Number
	},
	hole17: {
			strokes: Number,
			putts: Number
	},
	hole18: {
			strokes: Number,
			putts: Number
			}
});


ScoreSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Greenie.deleteMany({
            _id: {
                    $in: doc.greenies
            }
        })
    }
})



module.exports = mongoose.model('Score', ScoreSchema)