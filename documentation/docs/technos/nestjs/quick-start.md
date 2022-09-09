---
sidebar_position: 1
---

# Quick start

## Installation

```bash
# Install dependencies
$ yarn
# Create local env file
$ cp .env.example.rc .env.rc
```

## Running the app

```bash
# Start database
$ docker-compose up -d

# Execute migrations
$ pnpm migration:run

# Start dev server
$ pnpm start
```

## Test

```bash
# unit tests
$ pnpm test

# test coverage
$ pnpm test:coverage
```

## Migrations

```bash
# Generate a migration
$ pnpm migration:generate migration/YourMigrationName

# Run all pending migrations
$ pnpm migration:run
```
