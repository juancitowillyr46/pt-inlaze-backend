import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException, HttpStatus } from "@nestjs/common";
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {

    constructor(private readonly schema: Joi.Schema) {
    }

    transform(value: any, metadata: ArgumentMetadata) {
        
        const { error } = this.schema.validate(value);

        if (error) {
            throw new BadRequestException({
                message: 'Validation failed',
                detail: error.message.replace(/"/g, `'`),
                statusCode: HttpStatus.BAD_REQUEST
            });
        }

        return value;
    } 

    
}