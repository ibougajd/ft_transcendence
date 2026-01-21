import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const port = process.env.CHAT_SERVICE_PORT;
    const app = await NestFactory.create(AppModule);
    // Set global prefix to handle requests routed from /api/chat
    app.setGlobalPrefix('api/chat');
    await app.listen(port || 3001);
}
bootstrap();
