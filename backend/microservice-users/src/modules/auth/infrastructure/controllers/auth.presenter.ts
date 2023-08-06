import { ApiProperty } from "@nestjs/swagger";
import { AuthModel } from "../../domain/models/auth.model";

export class AuthPresenter {
    
    @ApiProperty()
    message: string;

    @ApiProperty()
    data: any;

    @ApiProperty()
    done: boolean;

    constructor(authModel: AuthModel) {
        this.message = `${authModel.fullname} inicio sesión correctamente`;
        this.data = authModel;
        this.done = true;
    }

}