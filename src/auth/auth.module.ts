import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaClient } from '@prisma/client';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaClient],
  imports: [
    UsersModule,
    MailModule,
    JwtModule.register({
      global: true,
      secret: 'JWT_SECRET_TOKEN',
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
