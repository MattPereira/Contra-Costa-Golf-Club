const express = require('express');
const router = express.Router();
const scores = require('../controllers/scores')
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isOwner, validateScore } = require('../middleware')


router.route('/')
    .get(catchAsync(scores.leaderboard))
    .post(isLoggedIn, validateScore, catchAsync(scores.createScore))


router.get('/greenies', catchAsync(scores.showAllGreenies));



router.get('/new', isLoggedIn, scores.renderNewForm)
    

router.route('/:id')
    .get(catchAsync(scores.showScore))
    .put(isLoggedIn, isOwner, catchAsync(scores.updateScore))
    .delete(isLoggedIn, isOwner, catchAsync(scores.deleteScore))


router.get('/:id/newGreenie', catchAsync(scores.newGreenie))

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(scores.renderEditForm))


module.exports = router;