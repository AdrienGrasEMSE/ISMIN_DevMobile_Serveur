import {ValidationPipe} from '@nestjs/common';
import {NestFactory}    from '@nestjs/core';
import {BookModule}     from './book.module';



/**
 * Boostrap
 *
 * @author Gaëtan MAISSE (modified by Adrien GRAS)
 */
async function bootstrap(): Promise<String> {

  // Creating the app
  const app = await NestFactory.create(BookModule);
  app.useGlobalPipes(new ValidationPipe());


  // Getting the correct port
  const port : string = process.env.PORT || "3000";


  // Listening on the correct port
  await app.listen(port);


  // Dynamic port updating
  return app.getHttpServer().address().port;

}
bootstrap().then(port => console.log("Running on port : ", port));
