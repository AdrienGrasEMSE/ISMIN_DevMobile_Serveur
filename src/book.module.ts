import {Module}         from '@nestjs/common';
import {BookController} from './book.controller';
import {BookService}    from './book.service';
import {HttpModule}     from "@nestjs/axios";


/**
 * BookModule
 *
 * @author Gaëtan MAISSE (modified by Adrien GRAS)
 */
@Module({
  imports: [HttpModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
