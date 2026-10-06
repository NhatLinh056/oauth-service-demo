import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import assert from 'node:assert/strict';
import request from 'supertest';

import { AppController } from './../src/app.controller';
import { AppService } from './../src/app.service';

async function runE2eTest() {
  let app: INestApplication | undefined;

  try {
    const moduleFixture = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    assert.deepEqual(response.body, [
      {
        id: 1,
        name: 'Linh',
        email: 'linh@gmail.com',
      },
      {
        id: 2,
        name: 'Nam',
        email: 'nam@gmail.com',
      },
    ]);

    console.log('E2E test passed: GET /users');
  } finally {
    await app?.close();
  }
}

runE2eTest().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
