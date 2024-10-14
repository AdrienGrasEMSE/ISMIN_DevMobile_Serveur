import {ValidationPipe} from '@nestjs/common';
import {NestFactory}    from '@nestjs/core';
import {BookModule}     from './book.module';



/**
 *
 *
 */
async function bootstrap() {

  //
  const app = await NestFactory.create(BookModule);
  app.useGlobalPipes(new ValidationPipe());


  // Getting the correct port
  //const port = process.env.PORT;


  // Listening on the correct port
  await app.listen(8080);

}
bootstrap();
