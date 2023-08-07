import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const configSwagger = new DocumentBuilder()
.addBearerAuth()
.setTitle('Cocktails API')
.setDescription('Cocktails API description')
.setVersion('1.0')
.addTag('Documentation')
.build();