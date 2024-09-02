import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
          user: 'henrybcm99@gmail.com',
          pass: 'sven vosi bcth dugl',
        },
      },
      defaults: {
        from: '"Support Team" <henrybcm99@gmail.com>',
      },
      // preview: true,
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService, PrismaClient],
  exports: [MailService],
})
export class MailModule {}
