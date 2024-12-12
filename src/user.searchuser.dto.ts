import { IsString } from 'class-validator';


/**
 * Search User Body Data Transfer Object :
 *
 * Allow us to be sure that the body for the search User request is correct
 *
 * @author Adrien GRAS
 */
export class SearchUserDto {
    @IsString()
    term: string;
}
