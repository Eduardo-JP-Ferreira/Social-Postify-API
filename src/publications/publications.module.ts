import { Module, forwardRef } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationRepository } from './publications.repository';
import { MediaModule } from '../media/media.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [MediaModule, forwardRef(() => PostsModule)],
  controllers: [PublicationsController],
  providers: [PublicationsService, PublicationRepository],
  exports: [PublicationsService]
})
export class PublicationsModule {}
