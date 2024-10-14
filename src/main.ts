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


  // Listening on the correct port
  await app.listen(process.env.PORT);

}
bootstrap();
