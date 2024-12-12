import { IsBoolean } from 'class-validator';


/**
 * Patch User Body Data Transfer Object :
 *
 * Allow us to be sure that the body for the patch User request is correct
 *
 * @author Adrien GRAS
 */
export class PatchUserDto {
    @IsBoolean()
    isFavorite: boolean;
}
