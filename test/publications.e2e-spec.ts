import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaModule } from '../src/prisma/prisma.module';

describe('Publications Tests', () => {
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

  it('/ (post publications) should create a publication"', async () => {
    let post = await prisma.post.create({
      data: {
        title: "Why you should have a guinea pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea", 
      }
    })
    let media = await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername", 
      }
    })

    await request(app.getHttpServer()).post('/publications').send({      
      mediaId: media.id,
      postId: post.id,
      date: "2023-08-21T13:25:17.352Z"  
    });
    expect(HttpStatus.CREATED);

    const publications = await prisma.publications.findMany({})
    expect(publications).not.toBe(null)
  });

  it('/ (GET publications) shoul return []"', async () => {
    let response = await request(app.getHttpServer()).get('/publications')
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toHaveLength(0);
  });

  it('/ (GET publications) shoul return a publications"', async () => {
    let post = await prisma.post.create({
      data: {
        title: "Why you should have a guinea pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea", 
      }
    })
    let media = await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername", 
      }
    })
    await prisma.publications.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: "2023-08-21T13:25:17.352Z" 
      }
    })

    let response = await request(app.getHttpServer()).get('/publications')
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toHaveLength(1);
  });

  it('/ (GET publications/:id) shoul return a publications"', async () => {
    let post = await prisma.post.create({
      data: {
        title: "Why you should have a guinea pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea", 
      }
    })
    let media = await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername", 
      }
    })
    let publications = await prisma.publications.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: "2023-08-21T13:25:17.352Z" 
      }
    })

    let response = await request(app.getHttpServer()).get(`/publications/${publications.id}`)
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.mediaId).toBe(media.id);
    expect(response.body.postId).toBe(post.id);
    expect(response.body.date).toBe("2023-08-21T13:25:17.352Z");
  });

  it('/ (put publications) should update a publications"', async () => {
    let post = await prisma.post.create({
      data: {
        title: "Why you should have a guinea pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea", 
      }
    })
    let post2 = await prisma.post.create({
      data: {
        title: "Why you should pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea", 
      }
    })
    let media = await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername", 
      }
    })
    let publicationCreated = await prisma.publications.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: "2033-10-21T13:25:17.352Z" 
      }
    })

    const response = await request(app.getHttpServer())
    .put(`/publications/${publicationCreated.id}`)
    .send({      
        mediaId: media.id,
        postId: post2.id,
        date: "2033-10-21T13:25:17.352Z"    
    });     
    expect(response.status).toBe(HttpStatus.OK);

    const publications = await prisma.publications.findFirst({ where: { id: publicationCreated.id }})
    expect(publications).not.toBe(null)
    expect(publications.mediaId).toBe(media.id);
    expect(publications.postId).toBe(post2.id);
  });

  it('/ (delete publications) should update a publications"', async () => {

    let post = await prisma.post.create({
      data: {
        title: "Why you should have a guinea pig?",
        text: "https://www.guineapigs.com/why-you-should-guinea", 
      }
    })
    let media = await prisma.media.create({
      data: {
        title: "Instagram",
        username: "myusername", 
      }
    })
    let publicationCreated = await prisma.publications.create({
      data: {
        mediaId: media.id,
        postId: post.id,
        date: "2032-10-21T13:25:17.352Z" 
      }
    })

    let response = await request(app.getHttpServer()).delete(`/publications/${publicationCreated.id}`)
    expect(response.statusCode).toBe(HttpStatus.OK);

    const publications = await prisma.publications.findFirst({ where: { id: publicationCreated.id }})
    expect(publications).toBe(null);
  });

});
