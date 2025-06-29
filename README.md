<h1 align="center">Express.js + Postgresql + Prisma + Typescript Starter Kit</h1>

<p align="center">A starter kit for creating Express.js projects for Rest API.</p>

<p align="center">
  <a href="https://expressjs.com/" target="blank"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLA972a1NXwGHTIpgjxpRdu1DD5te1evggDgjNvM_FcbtGxaPYrHbV27RNzJSA_ZhrY28&usqp=CAU" height="100" width="100" alt="Express.js logo" /></a>
  <a href="https://www.prisma.io/" target="blank"><img src="https://www.datocms-assets.com/58377/1688031395-logo_on_light.svg" height="100" width="100" alt="Prisma logo" /></a>
  <a href="https://www.postgresql.org/" target="blank"><img src="https://www.postgresql.org/media/img/about/press/elephant.png" height="100" width="100" alt="PostgreSQL logo" /></a>
  <a href="https://www.docker.com/" target="blank"><img src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" height="100" width="100" alt="Docker logo" /></a>
  <a href="https://jestjs.io/" target="blank"><img src="https://raw.githubusercontent.com/jestjs/jest/main/website/static/img/jest.png" height="100" width="100" alt="Jest logo" /></a>
  <a href="https://prettier.io/" target="blank"><img src="https://raw.githubusercontent.com/prettier/prettier/main/website/static/icon.png" height="100" width="100" alt="Prettier logo" /></a>
  <a href="https://eslint.org/" target="blank"><img src="https://raw.githubusercontent.com/eslint/archive-website/e19d0bd4b5c116996f4cd94d4e90df5cc4367236/assets/img/logo.svg" height="100" width="100" alt="ESLint logo" /></a>
</p>

## Description

This starter kit provides a template for creating Express.js projects with Rest API as the API layer.


## ⚠️ Disclaimer

🚧 This project is currently under development and may contain bugs or incomplete features. Use it at your own risk. Contributions and feedback are welcome.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run start:dev

# production mode
npm run start:prod
```

## Migrations

```bash
# Create new Migration
npx prisma migrate dev --name migration_name

# Run Migrations
npx prisma migrate deploy

# Generate Schemas
npx prisma generate
```

## Seed

```bash
# Run the seed
npx prisma db seed

# Reinitialize the database with seed data.
npx prisma migrate reset
```

## Test

```bash
# unit tests
npm run test
```

## Stay in touch

- Author - LuchoBazz
- Twitter - [@LuchoBazz](https://twitter.com/LuchoBazz)

## License

This project is licensed under the [MIT licensed](#). See the LICENSE file for details.
