import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    try {
      return this.postsService.createPost(createPostDto);
    } catch (error) {
      throw new HttpException("Error!", HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  findAllPosts() {
    try {
      return this.postsService.findAllPosts();
    } catch (error) {
      throw new HttpException("Error!", HttpStatus.BAD_REQUEST)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.postsService.findOnePost(+id);
    } catch (error) {
      throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND)
    }
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() createPostDto: CreatePostDto) {    
    try {
      return this.postsService.updatePost(createPostDto, +id);
    } catch (error) {
      if(error.response === 'CONFLICT') throw new HttpException("CONFLICT", HttpStatus.CONFLICT)
      throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND)
    }
  }

  @Delete(':id')
  removePost(@Param('id') id: string) {
    try {
      return this.postsService.removePost(+id);
    } catch (error) {
      if(error.response === 'FORBIDDEN') throw new HttpException("FORBIDDEN", HttpStatus.FORBIDDEN)
      throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND)
    }
  }
}
