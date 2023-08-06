import { ApiProperty } from "@nestjs/swagger";

export class RoleDto {
    id?: number;

    @ApiProperty()
    name: string;
}