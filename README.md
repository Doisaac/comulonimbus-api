# 🌩️ Cumulonimbus API

API REST para la empresa **Cumulonimbus**, desarrollada con **Express.js** y **PostgreSQL**.

---

## 🔨 Tecnologías

- **Node.js** y **Express.js**
- **PostgreSQL** 
- **Docker**
- **PNPM** 

---

## 💻 Entorno de Desarrollo

### 🧩 Requisitos Previos

Asegúrate de tener instalados:

- **Node.js** y **npm**  
- **Docker**


### ⚙️ Instalación de PNPM

```bash
npm install -g pnpm@latest-10
```

---

## 📦 Instalación de Dependencias

Dentro del directorio del proyecto, instala todas las dependencias necesarias:

```bash
pnpm install
```

### 🐘 Variables de entorno requeridas

Crea un archivo .env en la raíz del proyecto, con el siguiente contenido:

```bash
# Configuración de la base de datos PostgreSQL
DB_USER=admin
DB_HOST=localhost
DB_PASSWORD=admin
DB_DATABASE=cumulonimbus-db
DB_PORT=5432
# Puerto del servidor API
PORT=4000
```

### 🐘 Configuración de la Base de Datos

Crea un contenedor de PostgreSQL usando Docker con el siguiente comando:

```bash
docker run --name cumulonimbus-db -v cumulonimbus-volume:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=cumulonimbus-db -e TZ=America/El_Salvador -d postgres
```

---

## 🚀 Ejecución del Proyecto

```bash
pnpm dev
```

---

# 🐳 Levantar entorno con Docker Compose — Cumulonimbus API

## 🗒️ Crear archivo `.env.compose` en la raíz del proyecto

Contenido (digitar la misma contraseña):

```bash
# Pool de conexión del servidor de la API
DB_USER=admin
DB_HOST=cumulonimbus_database
DB_PASSWORD=
DB_DATABASE=cumulonimbus-db
DB_PORT=5432

# Variable para el servidor de la API
PORT=4000

# Variables de entorno para el contenedor postgres
POSTGRES_USER=admin 
POSTGRES_PASSWORD=
POSTGRES_DB=cumulonimbus-db 
TZ=America/El_Salvador 
```

## 🚀 Levantar los Servicios

Ejecuta el siguiente comando desde el directorio raíz del proyecto:

```bash
docker compose up -d
```

## 🛠️ Detener los Contenedores

Para detener los servicios sin eliminar los volúmenes:

```bash
docker compose stop
```