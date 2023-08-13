import * as Joi from 'joi';
import { AuthMessageDto } from "./auth.message.dto";

export const authValidate = Joi.object<any, true, AuthMessageDto>({
    username: Joi.string().required().email(),
    password: Joi.string().required().min(6)
});