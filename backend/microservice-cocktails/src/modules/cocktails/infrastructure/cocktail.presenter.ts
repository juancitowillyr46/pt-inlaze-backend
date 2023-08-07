import { ApiProperty } from "@nestjs/swagger";

export class CocktailPresenter {
    
    @ApiProperty()
    message: string;

    @ApiProperty()
    data: any;

    constructor(message: string, data: any) {
        this.message = message;
        this.data = data;
    }

}