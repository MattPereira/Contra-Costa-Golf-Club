const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});


const Joi = BaseJoi.extend(extension)

module.exports.scoreSchema = Joi.object({
    score: Joi.object({
        name: Joi.string().required().escapeHTML(),
        handicap: Joi.number().required().min(0)
    }).required()
});


module.exports.greenieSchema = Joi.object({
    greenie: Joi.object({
        holeNum: Joi.number().required().min(1).max(18),
        feet: Joi.number().required().min(0),
        inches: Joi.number().required().min(0).max(11)
    }).required()
})


