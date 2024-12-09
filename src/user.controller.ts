import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode, NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {UserService}  from "./user.service";
import {UserDto} from "./user.dto";
import {User} from "./user";




/**
 * UserController : class which creat and handle user endpoint on the server
 *
 * @author Adrien GRAS
 */
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  /**
   * Getting all users
   *
   * @author Adrien GRAS
   */
  @Get()
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }


  /**
   * Getting a page of 20 users
   *
   * @author Adrien GRAS
   */
  @Get('Page/:num_page')
  getAllUsersPage(@Param('num_page') num_page: number): User[] {
    try {
      return this.userService.getAllUsersPage(num_page);
    }
    catch (error) {
      throw new NotFoundException(error.message);
    }
  }


  /**
   * Getting a user using its uuid
   *
   * @author Adrien GRAS
   * @param uuid
   */
  @Get(':uuid')
  getUser(@Param('uuid') uuid: string): User {
    try {
      return this.userService.getUser(uuid);
    }
    catch (error) {
      throw new NotFoundException(error.message);
    }
  }


  /**
   * User creation
   *
   * @author Adrien GRAS
   * @param userDto
   */
  @Post()
  createUser(@Body() userDto: UserDto): User {
    this.userService.addUser({
      gender:         userDto.gender,
      name:           userDto.name,
      location:       userDto.location,
      email:          userDto.email,
      login:          userDto.login,
      dob:            userDto.dob,
      registered:     userDto.registered,
      phone:          userDto.phone,
      cell:           userDto.cell,
      id:             userDto.id,
      picture:        userDto.picture,
      nat:            userDto.nat,
    });
    return this.userService.getUser(userDto.login.uuid);
  }


  /**
   * User deletion
   *
   * @author Adrien GRAS
   * @param uuid
   */
  @Delete(':uuid')
  deleteUser(@Param('uuid') uuid: string): void {
    this.userService.remove(uuid);
  }


  /**
   * Clearing the server storage
   *
   * @author Adrien GRAS
   */
  @Delete()
  deleteAllUser(): void {
    this.userService.removeAll();
  }


  /**
   * Searching a user
   *
   * @author Adrien GRAS
   * @param term
   */
  @Post('search')
  @HttpCode(200)
  searchBooks(@Body() { term }: { term: string }): User[] {
    return this.userService.search(term);
  }
}
