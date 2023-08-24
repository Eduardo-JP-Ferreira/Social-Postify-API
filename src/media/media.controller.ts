import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';

@Controller('medias')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  createMedia(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.createMedia(createMediaDto);
  }

  @Get()
  findAllMedias() {
    return this.mediaService.findAllMedias();
  }

  @Get(':id')
  findOneMedia(@Param('id') id: string) {
    return this.mediaService.findOneMedia(+id);
  }

  @Put(':id')
  updateMedia(@Body() createMediaDto: CreateMediaDto, @Param('id') id: string) {
    return this.mediaService.updateMedia(createMediaDto, +id)
  }

  @Delete(':id')
  removeMedia(@Param('id') id: string) {
    return this.mediaService.removeMedia(+id);
  }
}
