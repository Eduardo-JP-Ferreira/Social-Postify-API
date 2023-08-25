import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationRepository } from './publications.repository';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService, PublicationRepository],
  exports: [PublicationsService]
})
export class PublicationsModule {}
