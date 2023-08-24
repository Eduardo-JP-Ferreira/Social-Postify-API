import { IsNotEmpty, IsString } from "class-validator";

export class CreateMediaDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    username: string;
}
