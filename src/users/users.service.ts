import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly mailService: MailService,
  ) {}

  async create(data: Prisma.userCreateInput) {
    data.password = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({ data });
    const code = uuidv4();
    this.mailService.create({
      code: code,
      try: 0,
      userId: user.id,
    });
    this.mailService.sendUserConfirmation(data.email);
    return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(email: string) {
    return this.prisma.user.findUnique({ where: { email: email } });
  }

  // update(id: number, data: userModule) {
  //   return this.prisma.user.update({ where: { id }, data: data });
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
