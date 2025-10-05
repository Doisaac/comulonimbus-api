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

```
docker run --name cumulonimbus-db -v cumulonimbus-volume:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=cumulonimbus-db -d postgres
```