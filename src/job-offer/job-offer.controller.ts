import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { JobOfferService } from './job-offer.service';
import { ApiTags } from '@nestjs/swagger';
import { jobOffer } from '@prisma/client';

@Controller('job-offer')
@ApiTags('JobOffer')
export class JobOfferController {
  constructor(private readonly jobOfferService: JobOfferService) {}

  @Post()
  create(@Body() data: jobOffer) {
    return this.jobOfferService.create(data);
  }

  @Get()
  findAll() {
    return this.jobOfferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobOfferService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateJobOfferDto: UpdateJobOfferDto,
  // ) {
  //   return this.jobOfferService.update(+id, updateJobOfferDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobOfferService.remove(+id);
  }
}
