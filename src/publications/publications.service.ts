import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const publication = await this.publicationRepository.findOnePublication(id);
    if(!publication) throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND);
    return publication;
  }

  async findOnePublicationByPostId(postId: number) {
    console.log('pub')
    const publication = await this.publicationRepository.findOnePublicationByPostId(postId);
    console.log('publicação', publication)
    if(publication) throw new HttpException("FORBIDDEN", HttpStatus.FORBIDDEN)
    console.log('return')
    return
  }

  async updatePublication(id: number, createPublicationDto: CreatePublicationDto) {
    await this.findOnePublication(id)

    const checkPublishment = await this.publicationRepository.findOneNotPublishedYetPublication(id)
    if(!checkPublishment[0]) throw new HttpException("FORBIDDEN", HttpStatus.FORBIDDEN)

    if(checkPublishment[0].mediaId !== createPublicationDto.mediaId ||
      checkPublishment[0].postId !== createPublicationDto.postId
      ) throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND);

    return await this.publicationRepository.updatePublication(createPublicationDto, id)
  }

  async removePublication(id: number) {
    await this.findOnePublication(id)

    return await this.publicationRepository.removePublication(id)
  }
}
