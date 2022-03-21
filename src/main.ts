import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('Title')
		.addBearerAuth({
			description: 'User JWT Token',
			type: 'http',
			name: 'Authorization',
			bearerFormat: 'JWT',
		})
		.setDescription('The API description')
		.setVersion('1.0')
		.addTag('Tag')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000, () => console.log(`http://localhost:${3000}/api`));
}
bootstrap();
