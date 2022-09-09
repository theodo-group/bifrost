---
sidebar_position: 2
---

# Architecture

After creating an app, it should look something like:

```
.
├── README.md
├── migration
│   ├── migration1.ts
│   └── [...]
├── node_modules
│   ├── [...]
├── src
│   ├── decorators
│   │   └── // Custom decorators used to improve swagger auto generation
│   ├── exception
│   │   └── // Custom exception filters
│   ├── helpers
│   │   └── BaseEntity // Entity to extend in all entities to have auto generated uuid, createdAt and updatedAt
│   ├── modules // here lies all the modules of the app
│   │   ├── auth
│   │   │   └── // Contains auth routes, jwt strategy and a global guard to authenticate by default ALL routes
│   │   ├── logger
│   │   │   └── // Custom logger in JSON format built on top of Winston
│   │   └── user
│   ├── env.validation.ts // Validate the env variables before the app starts
│   ├── main.ts
│   └── repl.ts // File to enable REPL functionnality introduced in NestJs 9
├── testUtils
│   ├── factory.ts
│   └── setup.ts
├── datasource.options.ts // Connection options to the database to use it in datasource and AppModule
├── datasource.ts // Connection to the database for typeorm cli
├── nest-cli.json
├── tsconfig.build.json // tsconfig for prod build
├── tsconfig.json // tsconfig for dev
└── package.json
```
