# Establece la imagen base
FROM node:14-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json e instala las dependencias
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto en el que escucha la aplicación NestJS
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD [ "node", "dist/main" ]