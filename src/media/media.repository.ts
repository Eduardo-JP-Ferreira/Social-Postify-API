import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaRepository{
  constructor(private readonly prisma: PrismaService) {}

  createMedia(createMediaDto: CreateMediaDto) {
    return this.prisma.media.create({ data: createMediaDto });
  }

  findAllMedias() {
    return this.prisma.media.findMany({});
  }

  findOneMedia(id: number) {
    return this.prisma.media.findFirst({ where: { id } });
  }

  findSpecificMedia(createMediaDto: CreateMediaDto) {
    return this.prisma.media.findFirst({ 
      where: { 
        title: createMediaDto.title,
        username: createMediaDto.username
      }
    });
  }

  updateMedia(createMediaDto: CreateMediaDto, id: number){
    return this.prisma.media.update({ where: { id }, data: createMediaDto})
  }

  removeMedia(id: number) {
    return this.prisma.media.delete({ where: { id }});
  }
}
