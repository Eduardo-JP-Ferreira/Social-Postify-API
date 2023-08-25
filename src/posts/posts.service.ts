import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './posts.repository';
import { PublicationRepository } from 'src/publications/publications.repository';
import { PublicationsService } from 'src/publications/publications.service';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository, private readonly publicationsService: PublicationsService) {}

  async createPost(createPostDto: CreatePostDto) {    
    return await this.postRepository.createPost(createPostDto);
  }

  async findAllPosts() {
    return await this.postRepository.findAllPosts();
  }

  async findOnePost(id: number) {
    const post = await this.postRepository.findOnePost(id);
    if(!post) throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND);
    return post
  }

  async updatePost(createPostDto: CreatePostDto, id: number) {
    await this.findOnePost(id)

    if(!createPostDto.image) createPostDto.image = null
    return await this.postRepository.updatePost(createPostDto, id)
  }

  async removePost(id: number) {
    await this.findOnePost(id)
    console.log('1')
    await this.publicationsService.findOnePublicationByPostId(id)
    console.log('2')
    return await this.postRepository.removePost(id);
  }
}
