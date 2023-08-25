import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Put, Query } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  createPublication(@Body() createPublicationDto: CreatePublicationDto) {
    try {
      return this.publicationsService.createPublication(createPublicationDto);
    } catch (error) {
      throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

  @Get()
  findAllPublications(@Query('published') published : boolean | undefined, @Query('after') after: Date | undefined) {
    try {
      return this.publicationsService.findAllPublications(published, after);
    } catch (error) {
      throw new HttpException("BAD_REQUEST", HttpStatus.BAD_REQUEST)
    }
  }

  @Get(':id')
  findOnePublication(@Param('id') id: string) {
    try {
      return this.publicationsService.findOnePublication(+id);
    } catch (error) {
      throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND)
    }
  }

  @Put(':id')
  updateMedia(@Body() createPublicationDto: CreatePublicationDto, @Param('id') id: string) {   
    try {
      return this.publicationsService.updatePublication(+id, createPublicationDto);
    } catch (error) {
      if(error.response === 'CONFLICT') throw new HttpException("CONFLICT", HttpStatus.CONFLICT)
      throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND)
    }
  }

  @Delete(':id')
  removePublication(@Param('id') id: string) {
    try {
      return this.publicationsService.removePublication(+id);
    } catch (error) {
      throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND)
    }
  }
}
