import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsString()
    @IsOptional()
    image?: string;
}
export interface PostWithoutImage extends CreatePostDto {
    id: number;
}