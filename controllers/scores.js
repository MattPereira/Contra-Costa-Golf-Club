const { modelNames } = require('mongoose');
const Score = require('../models/score');
const Course = require('../seeds/courses')



module.exports.leaderboard = async (req, res) => {
    const scores = await Score.find({});
    const courses = Course;
    res.render('scores/index', { scores, courses })
}


module.exports.showAllGreenies = async(req, res) => {
    const scores = await Score.find({}).populate('greenies');
    res.render('scores/greenies', { scores })
}

module.exports.renderNewForm = (req, res) => {
    res.render('scores/new')
}

module.exports.createScore = async (req, res, next) => {
    const score = new Score(req.body.score);
    score.owner = req.user._id;
    await score.save();
    req.flash('success', 'Successfully made a new score!')
    res.redirect(`/scores/${score._id}`)
}

module.exports.showScore = async (req, res) => {
    const score = await Score.findById(req.params.id).populate({
        path: 'greenies',
        populate: {
            path: 'owner'
        }
    }).populate('owner');
    if (!score) {
        req.flash('error', 'Cannot find that score')
        res.redirect('/scores')
    }
    res.render('scores/show', { score });
}


module.exports.newGreenie = async (req, res) => {
    const score = await Score.findById(req.params.id)
    res.render('scores/newGreenie', { score })
}


module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const score = await Score.findById(id)
    if (!score) {
        req.flash('error', 'Cannot find that score')
        res.redirect('/scores')
    }
    res.render('scores/edit', { score });
}

module.exports.updateScore = async (req, res) => {
    const { id } = req.params;

    const score = await Score.findByIdAndUpdate(id, { ...req.body.score })
    req.flash('success', 'Successfully updated score!')
    res.redirect(`/scores/${score._id}`)
}

module.exports.deleteScore = async (req, res) => {
    const { id } = req.params;
    await Score.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted your score')
    res.redirect('/scores');
}