import * as Joi from 'joi';

export const cocktailSchema = Joi.object({
    name: Joi.string().required(),
    instructions: Joi.string().required(),
    additionalNotes: Joi.string().required(),
    ingredients: Joi.array().items(Joi.number()).required()
});