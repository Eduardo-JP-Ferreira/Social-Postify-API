import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  updateMedia(createMediaDto: CreateMediaDto, id: number){
    return this.prisma.media.update({ where: { id }, data: createMediaDto})
  }

  removeMedia(id: number) {
    return this.prisma.media.delete({ where: { id }});
  }
}
