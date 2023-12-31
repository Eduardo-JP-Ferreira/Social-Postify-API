import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostRepository } from './posts.repository';
import { PublicationsModule } from '../publications/publications.module';

@Module({
  imports: [forwardRef(() => PublicationsModule)],
  controllers: [PostsController],
  providers: [PostsService, PostRepository],
  exports: [PostsService]
})
export class PostsModule {}
