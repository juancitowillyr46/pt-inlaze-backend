import { ApiProperty } from "@nestjs/swagger";

export class IngredientPresenter {
    
    @ApiProperty()
    message: string;

    @ApiProperty()
    data: any;

    constructor(message: string, data: any) {
        this.message = message;
        this.data = data;
    }

}