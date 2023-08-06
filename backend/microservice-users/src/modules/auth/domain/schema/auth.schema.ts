import * as Joi from 'joi';

export const authSchema = Joi.object({
    username: Joi.string().required().email(),
    password: Joi.string().required().min(6),
}).options({ abortEarly: false, allowUnknown: true });