import * as Joi from 'joi';

export const userSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    phone: Joi.string().required(),
    roleId: Joi.number()
});