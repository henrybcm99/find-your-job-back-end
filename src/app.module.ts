import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JobOfferModule } from './job-offer/job-offer.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [UsersModule, JobOfferModule, AuthModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
