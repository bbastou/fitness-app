# Fitness App

## Description

Simple Fitness App API made with [Nest](https://github.com/nestjs/nest) framework and Typescript.

## Prerequisites

- docker
- npm
- node >= 18.12.0

## Quick run

```bash
$ git clone https://github.com/bbastou/fitness-app.git
$ cd fitness-app/
$ docker compose up -d
$ npm install
$ npm run start:dev
```

Add one Fitness program fixtures
```bash
$ npm run fixtures
```

## Test benchmarking

All next commands will call `api/v1/data` endpoint.

Default params is :
- 10 000 requests
- distribution of 3 seconds

Default: half cases of new users and half retriying ones.
```bash
$ npm run load
```

Edge case: 100% of new users
```bash
$ npm run load:full-insert
```

Override default params: 100 requests in 1 second with 25% of new users.
```bash
$ npm run load -- --number=100 --timelimit=1 --new_users_percent=25
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Api Swagger Documentation

Available on `/api`
