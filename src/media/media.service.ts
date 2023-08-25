import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediaRepository } from './media.repository';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  async createMedia(createMediaDto: CreateMediaDto) {
    const media = await this.mediaRepository.findSpecificMedia(createMediaDto);
    if(media) throw new HttpException("CONFLICT", HttpStatus.CONFLICT)

    return this.mediaRepository.createMedia(createMediaDto);
  }

  async findAllMedias() {
    return await this.mediaRepository.findAllMedias();
  }

  async findOneMedia(id: number) {
    const media = await this.mediaRepository.findOneMedia(id);
    if(!media) throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND);
    return media;
  }

  async updateMedia(createMediaDto: CreateMediaDto, id: number){
    await this.findOneMedia(id)

    const media = await this.mediaRepository.findSpecificMedia(createMediaDto);
    if(media) throw new HttpException("CONFLICT", HttpStatus.CONFLICT)

    return await this.mediaRepository.updateMedia(createMediaDto, id)
  }

  async removeMedia(id: number) {
    await this.findOneMedia(id)
    return await this.mediaRepository.removeMedia(id);
  }
}
