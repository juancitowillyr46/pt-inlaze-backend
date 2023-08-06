import * as Joi from 'joi';

export const roleSchema = Joi.object({
    name: Joi.string().required()
});