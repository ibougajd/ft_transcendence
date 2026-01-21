import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const port = process.env.USER_SERVICE_PORT;
    const app = await NestFactory.create(AppModule);
    // Set global prefix to handle requests routed from /api/user
    app.setGlobalPrefix('api/user');
    await app.listen(port);
}
bootstrap();
