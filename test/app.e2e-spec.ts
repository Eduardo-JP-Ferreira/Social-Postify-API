import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaModule } from '../src/prisma/prisma.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = await moduleFixture.get(PrismaService);
		await prisma.publications.deleteMany();
		await prisma.post.deleteMany();
		await prisma.media.deleteMany();

    await app.init();
  });


  it('/ (GET health) shoul return "I’m okay!"', async () => {
    return request(app.getHttpServer()).get('/health')
      .expect(HttpStatus.OK)
      .expect('I’m okay!');
  });

});
