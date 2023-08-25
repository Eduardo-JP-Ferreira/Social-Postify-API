import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';

@Controller('medias')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  createMedia(@Body() createMediaDto: CreateMediaDto) {
    try {
      return this.mediaService.createMedia(createMediaDto);
    } catch (error) {
      if(error.response === 'CONFLICT') throw new HttpException("CONFLICT", HttpStatus.CONFLICT)
      throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  findAllMedias() {    
    try {
      return this.mediaService.findAllMedias();
    } catch (error) {
      throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

  @Get(':id')
  findOneMedia(@Param('id') id: string) {   
    try {
      return this.mediaService.findOneMedia(+id);
    } catch (error) {
      throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND)
    }
  }

  @Put(':id')
  updateMedia(@Body() createMediaDto: CreateMediaDto, @Param('id') id: string) {    
    try {
      return this.mediaService.updateMedia(createMediaDto, +id);
    } catch (error) {
      if(error.response === 'CONFLICT') throw new HttpException("CONFLICT", HttpStatus.CONFLICT)
      throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND)
    }
  }

  @Delete(':id')
  removeMedia(@Param('id') id: string) {    
    try {
      return this.mediaService.removeMedia(+id);
    } catch (error) {
      if(error.response === 'FORBIDDEN') throw new HttpException("CONFLICT", HttpStatus.FORBIDDEN)
      throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND)
    }
  }
}
