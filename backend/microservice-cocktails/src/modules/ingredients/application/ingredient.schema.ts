import * as Joi from 'joi';

export const ingredientSchema = Joi.object({
    name: Joi.string().required()
});