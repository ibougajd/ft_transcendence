import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const port = process.env.FRONT_SERVICE_PORT || 3003;
    const app = await NestFactory.create(AppModule);
    // Set global prefix to handle requests routed from /api/front
    // app.setGlobalPrefix('api/front');
    await app.listen(port);
}
bootstrap();
