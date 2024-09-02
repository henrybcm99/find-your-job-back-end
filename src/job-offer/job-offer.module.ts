import { Module } from '@nestjs/common';
import { JobOfferService } from './job-offer.service';
import { JobOfferController } from './job-offer.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [JobOfferController],
  providers: [JobOfferService, PrismaClient],
})
export class JobOfferModule {}
