import { OmitType } from "@nestjs/mapped-types";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateBlogDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsBoolean()
    published: boolean;
}

export class GetBlogDto{
    @IsUUID()
    id:string;
}