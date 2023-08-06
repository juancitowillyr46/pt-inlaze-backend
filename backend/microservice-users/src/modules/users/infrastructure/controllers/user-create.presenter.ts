import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "../../domain/models/user.model";

export class UserCreatePresenter {
    
    @ApiProperty()
    message: string;

    @ApiProperty()
    data: any;

    @ApiProperty()
    done: boolean;

    constructor(userModel: UserModel) {
        this.message = `El usuario: ${userModel.fullname}, se creó satisfactoriamente`;
        this.data = userModel;
        this.done = true;
    }

}