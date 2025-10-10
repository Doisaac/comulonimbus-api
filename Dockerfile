# Utilizar node en una versión estable
FROM node:lts-alpine3.21

# Trabajar en carpeta /app/
WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos de dependencias para aprovechar caché
COPY package.json pnpm-lock.yaml* ./

# Instalar las dependencias
RUN pnpm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto de la app
EXPOSE ${PORT}

# Ejecutar la aplicación
CMD ["pnpm", "run", "start"]