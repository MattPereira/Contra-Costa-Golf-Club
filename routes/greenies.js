const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateGreenie, isLoggedIn, isGreenieOwner } = require('../middleware');
const greenies = require('../controllers/greenies')
const catchAsync = require('../utils/catchAsync');



router.post('/', isLoggedIn, validateGreenie, catchAsync(greenies.createGreenie))

router.delete('/:greenieId', isLoggedIn, isGreenieOwner, catchAsync(greenies.deleteGreenie))

module.exports = router;