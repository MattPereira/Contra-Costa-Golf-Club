const { scoreSchema, greenieSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError')
const Score = require('./models/score');
const Greenie = require('./models/greenie')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}


module.exports.validateScore = (req, res, next) => {
    const { error } = scoreSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const score = await Score.findById(id);
    if (!score.owner.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/scores/${id}`)
    }
    next();
}

module.exports.isGreenieOwner = async (req, res, next) => {
    const { id, greenieId } = req.params;
    const greenie = await Greenie.findById(greenieId);
    if (!greenie.owner.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/scores/${id}`)
    }
    next();
}

module.exports.validateGreenie = (req, res, next) => {
    const { error } = greenieSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}