import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly prisma: PrismaClient,
  ) {}
  async sendUserConfirmation(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
        ],
      },
    });
    if (!user.EmailV) {
      const emailVerif = await this.getEmailVerifByUser(user.id);
      await this.mailerService.sendMail({
        to: 'henrybcm@uci.cu',
        from: '"Support Team" <henrybcm99@gmail.com>',
        subject: 'Welcome to FYJOB! Confirm your Email',
        template: '../../../mail/templates/confirmation', // `.hbs` extension is appended automatically
        context: {
          name: user.username,
          code: emailVerif.code,
        },
      });
    }
  }

  async getEmailVerifByUser(userid: string) {
    return this.prisma.emailVerif.findFirst({ where: { userId: userid } });
  }

  async create(data: Prisma.emailVerifCreateInput) {
    return this.prisma.emailVerif.create({ data });
  }

  async getEmailVerifByCode(code: string) {
    return this.prisma.emailVerif.findFirst({ where: { code: code } });
  }

  async update(id: string, data: Prisma.emailVerifCreateInput) {
    return this.prisma.emailVerif.update({ where: { id: id }, data: data });
  }
}
