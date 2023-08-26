import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationRepository } from './publications.repository';
import { MediaService } from '../media/media.service';

@Injectable()
export class PublicationsService {
  constructor(private readonly publicationRepository: PublicationRepository, private readonly mediaService: MediaService) {}

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
    const publication = await this.publicationRepository.findOnePublicationByPostId(postId);
    if(publication) throw new HttpException("FORBIDDEN", HttpStatus.FORBIDDEN)

    return
  }

  async updatePublication(id: number, createPublicationDto: CreatePublicationDto) {
    await this.findOnePublication(id)

    const checkPublishment = await this.publicationRepository.findOneNotPublishedYetPublication(id)
    if(!checkPublishment[0]) throw new HttpException("FORBIDDEN", HttpStatus.FORBIDDEN)

    const checkMedia = await this.mediaService.findOneMedia(createPublicationDto.mediaId)
    const checkPost = await this.publicationRepository.findOnePost(createPublicationDto.postId)

    if(!checkMedia || !checkPost) throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND);

    return await this.publicationRepository.updatePublication(createPublicationDto, id)
  }

  async removePublication(id: number) {
    await this.findOnePublication(id)

    return await this.publicationRepository.removePublication(id)
  }
}
