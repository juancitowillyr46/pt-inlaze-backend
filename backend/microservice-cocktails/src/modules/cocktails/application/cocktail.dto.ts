import { ApiProperty } from "@nestjs/swagger";

export class CocktailDto {
    id?: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    instructions: string;

    @ApiProperty()
    additionalNotes: string;

    @ApiProperty()
    ingredients: number[];
}