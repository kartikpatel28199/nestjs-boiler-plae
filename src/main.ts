import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppConfigService } from './core/config/app-config.service';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: AppConfigService = app.get(AppConfigService);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // access control origin
  app.use('*', function (req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,OPTIONS,POST,PUT,PATCH',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, x-xsrf-token, x-csrf-token, X-XSRF-TOKEN, X-CSRF-TOKEN',
    );
    //_csrf
    next();
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.useGlobalInterceptors(new TransformInterceptor());

  app.setGlobalPrefix('api');

  const port = configService.port;
  if (configService.nodeEnv !== 'production') {
    // Swagger Documentation configs
    const config = new DocumentBuilder()
      .setTitle('Boiler Plate API Development')
      .setDescription('Backend APIs for Boiler Plate application')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(port || 3000);
  console.log(`Running on Port ${port}`);
}
bootstrap();
