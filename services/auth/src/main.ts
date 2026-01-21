import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const port = process.env.AUTH_SERVICE_PORT;
    const app = await NestFactory.create(AppModule);
    //Set global prefix to handle requests routed from /api/auth
    app.setGlobalPrefix('api/auth');
    await app.listen(port);
}
bootstrap();
