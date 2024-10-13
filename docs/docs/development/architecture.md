---
sidebar_position: 1
---

# Project Structure Overview

This document provides a comprehensive overview of the project's structure, designed to assist developers and technical personnel in understanding the organization and components of the application. The project is organized in a modular fashion, promoting separation of concerns and maintainability. Below is a detailed description of each folder and its purpose.

## Directory Structure

```text
/src
│
├── /app
│   ├── app.ts               # Application configuration and startup
│   ├── routes.ts            # Route definitions (connects with controllers)
│   └── server.ts            # Express server configuration
│
├── /core                    # Core domain (business logic)
│   ├── /entities            # Domain entities
│   │   └── user.entity.ts   # Example entity (User)
│   ├── /services            # Services containing business logic
│   │   └── user.service.ts  # Example service (UserService)
│   ├── /repositories        # Persistence interfaces (ports)
│   │   └── user.repository.ts
│   └── /use_cases           # Use cases (application logic)
│       └── create_user.use_case.ts # Example use case (Create User)
│
├── /adapters                # Adapters (implementations of ports)
│   ├── /api                 # API adapters (controllers for HTTP input/output)
│   │   ├── user.controller.ts # Controller for handling user-related requests
│   │   └── error.handler.ts    # Global error handling
│   ├── /persistence         # Persistence adapters (repository interface implementations)
│   │   └── user.prisma.ts   # Repository implementation using Prisma
│   └── /mappers             # Data mappers (if necessary for layer translation)
│       └── user.mapper.ts   # User mapper between data and domain layers
│
├── /infrastructure          # Infrastructure configuration and dependencies
│   ├── /database            # Database configuration
│   │   └── prisma.ts        # Database connection using Prisma
│   ├── /http                # Express configuration and middlewares
│   │   └── express.ts       # Express middleware configuration
│   ├── /logger              # Logger (e.g., Winston or similar)
│   │   └── logger.ts        # Logger configuration
│   └── /env                 # Environment variable configuration
│       └── config.ts        # Environment configuration file
│
└── /tests                   # Unit and integration tests
    ├── /unit                # Unit tests for domain services
    ├── /integration         # Integration tests for APIs and databases
    └── /mocks               # Mocks of dependencies for tests
```

## Explanation of the Structure

### /app
This folder contains the application startup and Express routes.

### /core
The core layer, or "nucleus," contains:

- **Entities (/entities)**: Entities that represent business objects.
- **Services (/services)**: This is where the business logic resides.
- **Repositories (/repositories)**: Interfaces that define how to interact with data persistence.

### /adapters
This section includes adapters that connect the domain with the outside world:

- **API (/api)**: Express controllers that handle HTTP requests.
- **Persistence (/persistence)**: Concrete implementations of repositories (e.g., Prisma, Sequelize).
- **Mappers (/mappers)**: Optional mappers for converting data between different layers.

### /infrastructure
Contains infrastructure configurations, such as the database, logging, and any application infrastructure-related settings.

### /tests
Holds unit and integration tests, which can be divided into folders such as unit (testing domain logic) and integration (testing API, databases, etc.).

