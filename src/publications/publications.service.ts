import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationRepository } from './publications.repository';

@Injectable()
export class PublicationsService {
  constructor(private readonly publicationRepository: PublicationRepository) {}

  async createPublication(createPublicationDto: CreatePublicationDto) {
    return await this.publicationRepository.createPublication(createPublicationDto);
  }

  async findAllPublications(published: boolean, after: Date) {
    if(published && after) return await this.publicationRepository.findAllPublishedOrNotPublicationAfterDate(published, after);
    else if(published === undefined && !after) return await this.publicationRepository.findAllPublication();
    else if(!after) return await this.publicationRepository.findAllPublishedOrNotPublication(published);
    else return await this.publicationRepository.findAllAfterDate(after);
  }

  async findOnePublication(id: number) {
    return `This action returns a #${id} publication`;
  }

  async updatePublication(id: number, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  async removePublication(id: number) {
    return `This action removes a #${id} publication`;
  }
}
