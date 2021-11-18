const Score = require('../models/score');
const Greenie = require('../models/greenie');

module.exports.createGreenie = async (req, res) => {
    const score = await Score.findById(req.params.id);
    const greenie = new Greenie(req.body.greenie);
    greenie.owner = req.user._id;
    score.greenies.push(greenie);
    await greenie.save();
    await score.save();
    req.flash('success', 'Created a new greenie!')
    res.redirect(`/scores/${score._id}`)
}


module.exports.deleteGreenie = async (req, res) => {
    const { id, greenieId } = req.params;
    await Score.findByIdAndUpdate(id, { $pull: { greenies: greenieId } });
    await Greenie.findByIdAndDelete(greenieId);
    req.flash('success', 'Successfully deleted a greenie')
    res.redirect(`/scores/${id}`);
}