---
sidebar_position: 1
---

# 😺 NestJs

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
$ yarn migration:run

# Start dev server
$ yarn start
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:coverage
```

## Migrations

```bash
# Generate a migration
$ yarn migration:generate migration/YourMigrationName

# Run all pending migrations
$ yarn migration:run
```
