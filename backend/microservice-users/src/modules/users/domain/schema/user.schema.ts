import * as Joi from 'joi';

export const createUserSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().required()
}).options({ abortEarly: false, allowUnknown: true });