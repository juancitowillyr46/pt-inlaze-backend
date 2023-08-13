import { ApiProperty } from "@nestjs/swagger";

export class AuthMessageDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}