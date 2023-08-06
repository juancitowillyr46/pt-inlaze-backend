import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto {   
    id?: number; 

    @ApiProperty()
    fullname: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    phone: string;
}