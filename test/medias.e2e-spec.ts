import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaModule } from '../src/prisma/prisma.module';

describe('Medias Tests', () => {
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

  it('/ (post medias) should create media"', async () => {
    await request(app.getHttpServer()).post('/medias').send({      
      title: "Instagram",
      username: "myusername",      
    });
    expect(HttpStatus.CREATED);

    const media = await prisma.media.findFirst({ where: { title: "Instagram" }})
    expect(media).not.toBe(null)
  });

  it('/ (GET medias) shoul return []"', async () => {
    let response = await request(app.getHttpServer()).get('/medias')
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toHaveLength(0);
  });

  it('/ (GET medias) shoul return a media"', async () => {
    await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername", 
      }
    })
    await prisma.media.create({
      data: {
        title: "Tweeter",
        username: "myusername2", 
      }
    })

    let response = await request(app.getHttpServer()).get('/medias')
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toHaveLength(2);
  });

  it('/ (GET medias/:id) shoul return a media"', async () => {
    let media = await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername", 
      }
    })

    let response = await request(app.getHttpServer()).get(`/medias/${media.id}`)
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.title).toBe("Instagram");
    expect(response.body.username).toBe("myusername");

  });

  it('/ (put medias) should update a media"', async () => {

    let mediaCreated = await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername", 
      }
    })

    await request(app.getHttpServer()).put(`/medias/${mediaCreated.id}`).send({      
      title: "Tweeter",
      username: "myusername",      
    });
    expect(HttpStatus.CREATED);

    const media = await prisma.media.findFirst({ where: { id: mediaCreated.id }})
    expect(media).not.toBe(null)
    expect(media.title).toBe("Tweeter");
    expect(media.username).toBe("myusername");
  });

  it('/ (delete medias) should update a media"', async () => {

    let mediaCreated = await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername", 
      }
    })

    let response = await request(app.getHttpServer()).delete(`/medias/${mediaCreated.id}`)
    expect(response.statusCode).toBe(HttpStatus.OK);

    const media = await prisma.media.findFirst({ where: { id: mediaCreated.id }})
    expect(media).toBe(null);
  });

});
