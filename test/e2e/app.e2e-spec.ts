import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';

import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { User } from '../../src/users/user.entity';
import { Category } from '../../src/fitness/category.entity';

import { userFixtures, dataFixtures } from './fitness.fixtures';

let userRepository: Repository<User>;
let fitnessRepository: Repository<Category>;

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    fitnessRepository = moduleFixture.get('CategoryRepository');
    userRepository = moduleFixture.get('UserRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  it('/data (GET) Unauthorized', () => {
    return request(app.getHttpServer()).get('/data').expect(401);
  });

  it('/data (GET) Ok', async () => {
    // Given
    await fitnessRepository.save(dataFixtures);
    const identifierForVendor = 'e495e06f-e643-4e9f-a868-485150d3530b';

    // When
    const response = await request(app.getHttpServer())
      .get('/data')
      .set('identifier-for-vendor', identifierForVendor);

    // Then
    expect(response.status).toEqual(200);
    expect(response.body.user.id).toEqual(identifierForVendor);
    expect(response.body.user.token).toBeDefined();
    expect(response.body.data.categories.length).toBeGreaterThan(0);
    expect(response.body.data.categories[0].programs.length).toBeGreaterThan(0);
    expect(
      response.body.data.categories[0].programs[0].exercises.length,
    ).toBeGreaterThan(0);
  });

  it('/users/{userId} (PUT) Unauthorized', async () => {
    // Given
    const UnauthenticatedUser = {
      id: 'foo',
      bearerToken: 'foobar',
    };

    // When
    const { status } = await request(app.getHttpServer())
      .put(`/users/${UnauthenticatedUser.id}`)
      .set('Authorization', `Bearer ${UnauthenticatedUser.bearerToken}`);

    // Then
    expect(status).toEqual(401);
  });

  it('/users/{userId} (PUT) Ok', async () => {
    // Given
    await userRepository.save(userFixtures);

    // When
    const { status, body } = await request(app.getHttpServer())
      .put(`/users/${userFixtures.id}`)
      .set('Authorization', `Bearer ${userFixtures.token}`);

    // Then
    expect(status).toEqual(200);
    expect(body.id).toEqual(userFixtures.id);
    expect(body.token).toBeDefined();
    expect(body.token).not.toEqual(userFixtures.token);
  });
});
