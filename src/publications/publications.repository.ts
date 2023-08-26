import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePublicationDto } from './dto/create-publication.dto';

@Injectable()
export class PublicationRepository{
  constructor(private readonly prisma: PrismaService) {}

  createPublication(createPublicationDto: CreatePublicationDto) {
    return this.prisma.publications.create({ data: createPublicationDto });
  }

  findAllPublication() {
    return this.prisma.publications.findMany({});
  }
  
  findAllPublishedOrNotPublication(published: boolean) {
    const currentDate = new Date();

    if(String(published) === 'false'){
      return this.prisma.publications.findMany({ where: { date: { lt: currentDate.toISOString() } } });
    }
    else{
      return this.prisma.publications.findMany({ where: { date: { gt: currentDate.toISOString() } } });
    }
  }

  findAllPublishedOrNotPublicationAfterDate(published: boolean, after: Date) {
    const currentDate = new Date();
    const afterDate = new Date(after);

    if(String(published) === 'false'){
      return this.prisma.publications.findMany({ 
        where: { 
          date: { 
            lt: currentDate.toISOString(),
            gt: afterDate.toISOString(), 
      }}});
    }
    return this.prisma.publications.findMany({       
      where: {
        date: {
          gt: currentDate.toISOString(),
          gte: afterDate.toISOString(),
    }}});
  }

  findAllAfterDate(after: Date) {
    const afterDate = new Date(after);

    return this.prisma.publications.findMany({       
      where: {
        date: {
          gt: afterDate.toISOString(),
    }}});
  }

  findOnePublication(id: number) {
    return this.prisma.publications.findFirst({ where: { id } })
  }

  findOnePublicationByPostId(postId: number){
    return this.prisma.publications.findFirst({ where: { postId } })
  }

  findOneNotPublishedYetPublication(id: number){
    const currentDate = new Date();
    return this.prisma.publications.findMany({ 
      where: { 
        id,
        date: {
          gt: currentDate.toISOString() 
    }}});
  }

  updatePublication(createPublicationDto: CreatePublicationDto, id: number) {
    return this.prisma.publications.update({ where: { id }, data: createPublicationDto})
  }

  removePublication(id: number) {
    return this.prisma.publications.delete({ where: { id } });
  }
}
