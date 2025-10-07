## API REST para Comulonimbus API

### 🔨 TECH

- Express.js
- PostgreSQL

### 💻 Para desarrollar

Instalar PNPM

```bash
npm install -g pnpm@latest-10
```

Crear contenedor con base de datos en postgres

```bash
docker run --name cumulonimbus-db -v cumulonimbus-volume:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=cumulonimbus-db -e TZ=America/El_Salvador -d postgres
```

Ejecutar la API en modo desarrollo:
```bash
pnpm dev
```
