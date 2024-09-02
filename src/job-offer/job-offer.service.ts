import { Injectable } from '@nestjs/common';
import { PrismaClient, jobOffer } from '@prisma/client';

@Injectable()
export class JobOfferService {
  constructor(private prisma: PrismaClient) {}

  create(data: jobOffer) {
    return this.prisma.jobOffer.create({ data });
  }

  findAll() {
    return `This action returns all jobOffer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobOffer`;
  }

  // update(id: number, updateJobOfferDto: UpdateJobOfferDto) {
  //   return `This action updates a #${id} jobOffer`;
  // }

  remove(id: number) {
    return `This action removes a #${id} jobOffer`;
  }
}
