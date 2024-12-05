import {IsDateString, IsNotEmpty, IsString} from 'class-validator';
import {ISBN}                               from './ISBN';



/**
 * Book Data Transfer Object
 *
 * @author Gaëtan MAISSE
 */
export class BookDto {
    @IsString()
    @IsNotEmpty()
    isbn!: ISBN;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    author!: string;

    @IsString()
    @IsDateString()
    date!: string;
}
