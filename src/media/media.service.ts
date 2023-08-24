import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediaRepository } from './media.repository';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  createMedia(createMediaDto: CreateMediaDto) {
    return this.mediaRepository.createMedia(createMediaDto);
  }

  findAllMedias() {
    return this.mediaRepository.findAllMedias();
  }

  findOneMedia(id: number) {
    return this.mediaRepository.findOneMedia(id);
  }

  updateMedia(createMediaDto: CreateMediaDto, id: number){
    return this.mediaRepository.updateMedia(createMediaDto, id)
  }

  removeMedia(id: number) {
    return this.mediaRepository.removeMedia(id);
  }
}
