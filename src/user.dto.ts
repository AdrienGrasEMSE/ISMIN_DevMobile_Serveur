import {IsString, IsObject, IsNotEmpty, IsEmail, IsBoolean, IsBooleanString} from "class-validator";



export class NameDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    first: string;

    @IsString()
    @IsNotEmpty()
    last: string;
}




export class StreetDto {
    @IsString()
    @IsNotEmpty()
    number: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}




export class CoordinatesDto {
    @IsString()
    @IsNotEmpty()
    latitude: string;

    @IsString()
    @IsNotEmpty()
    longitude: string;
}




export class TimezoneDto {
    @IsString()
    @IsNotEmpty()
    offset: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}




export class LoginDto {
    @IsString()
    @IsNotEmpty()
    uuid: string;

    @IsString()
    @IsNotEmpty()
    username: string;
}




export class DobDto {
    @IsString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsNotEmpty()
    age: string;
}




export class RegisteredDto {
    @IsString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsNotEmpty()
    age: string;
}




export class IdDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    value: string;
}




export class PictureDto {
    @IsString()
    @IsNotEmpty()
    large: string;

    @IsString()
    @IsNotEmpty()
    medium: string;

    @IsString()
    @IsNotEmpty()
    thumbnail: string;
}




export class LocationDto {
    @IsObject()
    @IsNotEmpty()
    street: StreetDto;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    postcode: string;

    @IsObject()
    @IsNotEmpty()
    coordinates: CoordinatesDto;

    @IsObject()
    @IsNotEmpty()
    timezone: TimezoneDto;
}




/**
 * User Data Transfer Object
 *
 * @author Adrien GRAS
 */
export class UserDto {
    @IsBoolean()
    isFavorite: boolean;


    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsObject()
    @IsNotEmpty()
    name: NameDto;

    @IsObject()
    @IsNotEmpty()
    location: LocationDto;

    @IsEmail()
    email: string;

    @IsObject()
    @IsNotEmpty()
    login: LoginDto;

    @IsObject()
    @IsNotEmpty()
    dob: DobDto;

    @IsObject()
    @IsNotEmpty()
    registered: RegisteredDto;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    cell: string;

    @IsObject()
    @IsNotEmpty()
    id: IdDto;

    @IsObject()
    @IsNotEmpty()
    picture: PictureDto;

    @IsString()
    @IsNotEmpty()
    nat: string;
}
