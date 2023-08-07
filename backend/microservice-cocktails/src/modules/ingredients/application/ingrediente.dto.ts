import { ApiProperty } from "@nestjs/swagger";

export class IngredientDto {
    id?: number;

    @ApiProperty()
    name: string;
}