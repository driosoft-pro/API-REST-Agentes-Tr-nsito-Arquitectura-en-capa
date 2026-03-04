
# Módulo AGENTES
Arquitectura en capas + API REST  
React + Vite + Tailwind | Node.js + Express | PostgreSQL

# Descripción
Este módulo hace parte del sistema de **Comparendos de Tránsito** y fue desarrollado como base para el **Taller 5 (Arquitectura en Capas)**.

---
# Imagen del Módulo Agentes

- Agentes
![Agentes.png](img/Agentes.png)

- Crear Agente
![Create.png](img/Create.png)

- Actualizar Agente
![Update.png](img/Update.png)

---


# Stack Tecnológico

## Frontend
- React
- Vite
- Tailwind CSS

## Backend
- Node.js
- Express
- Arquitectura en capas

## Base de Datos
- PostgreSQL
- Compatible con **Supabase**

---

# Requisitos Previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- Node.js ≥ 20
- pnpm
- Docker o Podman
- Git

Instalar pnpm si no está instalado:
```
npm install -g pnpm
```
---

# 1 Levantar PostgreSQL + Backend

Desde la carpeta raíz del proyecto.

## Opción A — Docker
```
docker compose up -d --build
```
Verificar contenedores:
```
docker ps
```

Probar endpoints:

```
curl http://localhost:8080/health
```
```
curl http://localhost:8080/api/agentes
```
---

## Opción B — Podman 

Si usas Podman:
```
podman-compose up -d --build
```

Ver contenedores:
```
podman ps
```

Ver logs:
```
podman logs agentes_service
```
```
podman logs taller5_postgres
```

Probar API:
```
curl http://localhost:8080/health
```
```
curl http://localhost:8080/api/agentes
```

---

# 2 Dependencias del Backend

Si ejecutas el backend sin contenedor:

Ingresar a la carpeta del backend:
```
cd backend
```
Instalar dependencias:
```
pnpm install
```

Dependencias:
```
pnpm add express cors morgan dotenv pg zod
```

Dependencias de desarrollo:
```
pnpm add -D nodemon
```

Ejecutar backend:
```
pnpm run dev
```

Servidor disponible en:
```
http://localhost:8080
```

---

# 3 Ejecutar el Frontend
si ejecutas el frontend sin contenedor:

Ingesar a la carpeta del frontend:
```
cd frontend
```

Crear copia de .env:
```
cp .env.example .env
```

Instalar dependencias:
```
pnpm install
```

Dependencias:
```
pnpm add react react-dom react-router-dom
```

Abrir en el navegador:
```
http://localhost:5173
```

---

# 4 Endpoints REST
- GET    `/api/agentes`
- GET    `/api/agentes/:id`
- POST   `/api/agentes`
- PUT    `/api/agentes/:id`
- DELETE `/api/agentes/:id` (soft delete)


---

# 5 Uso con Supabase

1 Ejecutar en SQL Editor:
```
db/postgres_schema.sql
```

2 Configurar backend:
```
backend/.env
```

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
Si requiere SSL:
```
PGSSLMODE=require
```

3 Ejecutar backend:
```
pnpm run dev
```


# Conexion local a PostgreSQL

| Campo    | Valor         |
| -------- | ------------- |
| Host     | `localhost`   |
| Puerto   | `5432`        |
| Database | `transito_db` |
| User     | `postgres`    |
| Password | `postgres`    |

---

# Arquitectura

localhost:5173   → React Frontend
localhost:8080   → API Backend
localhost:5432   → PostgreSQL

Podman o Docker

│
├─ postgres
│    puerto 5432
│
├─ backend-api
│    puerto 8080
│
└─ frontend-react
     puerto 3000

---

React (Frontend)
      │
      │ HTTP REST
      ▼
Node.js API
      │
      │ SQL
      ▼
PostgreSQL

---

# Autores

- **Deyton Riasco Ortiz** — driosoftpro@gmail.com
- **Samuel Izquierdo Bonilla** — samuelizquierdo98@gmail.com
- **Mauricio Taborda Gongora** — mauricio.taborda@uao.edu.co

  **Año:** 2026
