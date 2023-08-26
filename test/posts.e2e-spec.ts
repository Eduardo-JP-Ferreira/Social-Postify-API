import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaModule } from '../src/prisma/prisma.module';

describe('Posts Tests', () => {
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

  it('/ (post posts) should create media"', async () => {
    await request(app.getHttpServer()).post('/posts').send({      
      title: "Why you should have a guinea pig?",
	    text: "https://www.guineapigs.com/why-you-should-guinea",   
    });
    expect(HttpStatus.CREATED);

    const post = await prisma.post.findFirst({ where: { title: "Why you should have a guinea pig?" }})
    expect(post).not.toBe(null)
  });

  it('/ (GET posts) shoul return []"', async () => {
    let response = await request(app.getHttpServer()).get('/posts')
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toHaveLength(0);
  });

  it('/ (GET posts) shoul return a post"', async () => {
    await prisma.post.create({
      data: {
        title: "Why you should have a guinea pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea", 
      }
    })
    await prisma.post.create({
      data: {
        title: "Facebook",
        text: "https://www.guineapigs.com/why-you-should-guinea", 
      }
    })

    let response = await request(app.getHttpServer()).get('/posts')
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toHaveLength(2);
  });

  it('/ (GET posts/:id) shoul return a post"', async () => {
    let post = await prisma.post.create({
      data: {
        title: "Instagram",
        text: "https://www.guineapigs.com/why-you-should-guinea", 
      }
    })

    let response = await request(app.getHttpServer()).get(`/posts/${post.id}`)
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.title).toBe("Instagram");
    expect(response.body.text).toBe("https://www.guineapigs.com/why-you-should-guinea");

  });

  it('/ (put posts) should update a post"', async () => {

    let postCreated = await prisma.post.create({
      data: {
        title: "Instagram",
        text: "https://www.guineapigs.com/why-you-should-guinea", 
      }
    })

    await request(app.getHttpServer()).put(`/posts/${postCreated.id}`).send({      
      title: "Tweeter",
      text: "nada",      
    });
    expect(HttpStatus.CREATED);

    const post = await prisma.post.findFirst({ where: { id: postCreated.id }})
    expect(post).not.toBe(null)
    expect(post.title).toBe("Tweeter");
    expect(post.text).toBe("nada");
  });

  it('/ (delete posts) should update a post"', async () => {

    let postCreated = await prisma.post.create({
      data: {
        title: "Instagram",
        text: "https://www.guineapigs.com/why-you-should-guinea", 
      }
    })

    let response = await request(app.getHttpServer()).delete(`/posts/${postCreated.id}`)
    expect(response.statusCode).toBe(HttpStatus.OK);

    const post = await prisma.post.findFirst({ where: { id: postCreated.id }})
    expect(post).toBe(null);
  });

});
