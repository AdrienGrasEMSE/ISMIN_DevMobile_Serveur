import {Module}         from '@nestjs/common';
import {HttpModule}     from "@nestjs/axios";
import {UserController} from "./user.controller";
import {UserService}    from "./user.service";


/**
 * UserModule
 *
 * @author Adrien GRAS
 */
@Module({
  imports:      [HttpModule],
  controllers:  [UserController],
  providers:    [UserService],
})
export class UserModule {}
