import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaClient } from '@prisma/client';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaClient],
  exports: [UsersService],
  imports: [MailModule],
})
export class UsersModule {}
