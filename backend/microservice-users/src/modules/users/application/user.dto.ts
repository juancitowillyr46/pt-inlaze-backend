import { ApiProperty } from "@nestjs/swagger";

export class UserDto {   

    id?: number; 

    @ApiProperty()
    fullname: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    roleId: number;
}