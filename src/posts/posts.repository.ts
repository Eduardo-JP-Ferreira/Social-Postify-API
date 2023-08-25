import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto, PostWithoutImage } from './dto/create-post.dto';

@Injectable()
export class PostRepository{
  constructor(private readonly prisma: PrismaService) {}

  createPost(createPostDto: CreatePostDto) {
    return this.prisma.post.create({ data: createPostDto });
  }

  findAllPosts() {
    return this.prisma.post.findMany({}).then((results) => {
        return results.map((post) => {
          const { id, title, text, image } = post;
          const modifiedPost: PostWithoutImage = { id, title, text };
    
          if (image !== null) {
            modifiedPost.image = image;
          }
    
          return modifiedPost;
        });
    });
  }

  findOnePost(id: number) {
    return this.prisma.post.findFirst({ where: { id } }).then((post) => {
        if (!post) {
            return null;
        }

        const { title, text, image } = post;
        const modifiedPost: PostWithoutImage = { id, title, text };

        if (image !== null) {
            modifiedPost.image = image;
        }

        return modifiedPost;
    });
  }

  updatePost(createPostDto: CreatePostDto, id: number) {
    return this.prisma.post.update({ where: { id }, data: createPostDto})
  }

  removePost(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
