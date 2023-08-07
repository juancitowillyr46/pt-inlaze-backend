import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const configSwagger = new DocumentBuilder()
.addBearerAuth()
.setTitle('Cocktails')
.setDescription('Cocktails API description')
.setVersion('1.0')
.addTag('Cocktails')
.build();