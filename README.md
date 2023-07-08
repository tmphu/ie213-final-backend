## Description

This project is built on Nestjs, a robust framework to build web application using TypeScript and Nodejs. Read more: [NestJS](https://github.com/nestjs/nest)

## Install dependencies
This project uses yarn as package manager. For consistency between developers, please do not use npm.
```bash
$ yarn install
```

## Environment variables
Copy .env.example to .env
```bash
$ cp .env.example .env
```

## Database
This project uses MySQL as database management system.
First install MySQL, then create a new database in your local:
- name: db_ie213
- host: localhost
- username: root
- password: 1234
- port: 3306

If you do not create database with the above information then you have to change connection string on ENV file.

## Migrate database schemas
Prerequisite: must install prisma globally.
In the project's root directory, run command:
```bash
$ prisma migrate dev
```
Whenever you change current models or add new models to database, use Prisma Migrate to create migrations which will be then applied to database. DO NOT modify database manually or delete the migrations.
Read more:
- Prisma [data model](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model)
- Prisma [Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate/get-started)

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# debug mode
$ yarn run start:debug

# production mode
$ yarn run start:prod
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)
