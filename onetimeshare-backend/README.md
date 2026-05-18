# onetimeshare-backend

Express + TypeScript API with TypeORM and PostgreSQL.

## Database setup

### 1. Install PostgreSQL

**macOS (Homebrew)**

```bash
brew install postgresql@16
brew services start postgresql@16
```

**Docker**

```bash
docker run --name onetimeshare-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=onetimeshare \
  -p 5432:5432 \
  -d postgres:16
```

### 2. Create database and user (local install)

If you are not using Docker, connect as a superuser and create the database:

```bash
psql postgres
```

```sql
CREATE USER postgres WITH PASSWORD 'postgres';
CREATE DATABASE onetimeshare OWNER postgres;
GRANT ALL PRIVILEGES ON DATABASE onetimeshare TO postgres;
\q
```

### 3. Configure environment variables

Copy the example env file and edit values to match your PostgreSQL instance:

```bash
cp .env.example .env
```

| Variable       | Description                          | Example        |
|----------------|--------------------------------------|----------------|
| `DB_HOST`      | PostgreSQL host                      | `localhost`    |
| `DB_PORT`      | PostgreSQL port                      | `5432`         |
| `DB_USERNAME`  | Database user                        | `postgres`     |
| `DB_PASSWORD`  | Database password                    | `postgres`     |
| `DB_NAME`      | Database name                        | `onetimeshare` |
| `DB_SSL`       | Enable SSL (`true` / `false`)        | `false`        |
| `DB_LOGGING`   | Log SQL queries via Winston (`true` / `false`) | `false`  |

### Logging (Winston)

| Variable       | Description                          | Default (dev)  |
|----------------|--------------------------------------|----------------|
| `NODE_ENV`     | `development` or `production`        | `development`  |
| `LOG_LEVEL`    | `error`, `warn`, `info`, `http`, `verbose`, `debug`, `silly` | `debug` |
| `LOG_FORMAT`   | `pretty` (colored) or `json`         | `pretty`       |
| `LOG_SERVICE`  | Service name included in every log   | `onetimeshare-backend` |

Import the shared logger anywhere in the app:

```typescript
import { logger, createChildLogger } from "./config/logger.js";

const log = createChildLogger("my-module");
log.info("Something happened", { userId: "123" });
```

### 4. Verify connection

Start the server (loads `.env` and connects via TypeORM):

```bash
yarn dev
```

Check the health endpoint:

```bash
curl http://localhost:8000/health
```

Expected response:

```json
{ "status": "ok", "database": "connected" }
```

## Migrations

TypeORM is configured with `synchronize: false`. Schema changes must go through migrations.

**Run pending migrations**

```bash
yarn migration:run
```

**Generate a migration** (after adding or changing entities in `src/entities/`)

```bash
yarn migration:generate src/migrations/YourMigrationName
```

**Revert last migration**

```bash
yarn migration:revert
```

## Project scripts

| Command              | Description                    |
|----------------------|--------------------------------|
| `yarn dev`           | Start dev server with hot reload |
| `yarn build`         | Compile TypeScript to `dist/`  |
| `yarn start`         | Run compiled production server |
| `yarn migration:run` | Apply database migrations      |

## How the app connects

1. `dotenv` loads variables from `.env` via `src/config/env.ts`.
2. `src/data-source.ts` builds a TypeORM `DataSource` from those variables.
3. `src/index.ts` calls `AppDataSource.initialize()` before the HTTP server starts.

Use `AppDataSource` elsewhere in the app for repositories:

```typescript
import { AppDataSource } from "./data-source.js";

const repo = AppDataSource.getRepository(YourEntity);
```
