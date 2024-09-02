import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma, PrismaClient } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
import { codedto } from './dto/code';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly prisma: PrismaClient,
    private readonly mailService: MailService,
  ) {}
  @Post('login')
  async login(
    @Body()
    data: {
      email: string;
      password: string;
    },
  ) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: data.email,
          },
        ],
      },
    });

    if (!user) {
      throw new UnauthorizedException('email not found');
    }
    const mailV = await this.mailService.getEmailVerifByUser(user.id);
    if (mailV == null) {
      const code = uuidv4();
      this.mailService.create({
        code: code,
        try: 0,
        userId: user.id,
      });
    }
    if (!mailV.isValid) {
      throw new UnauthorizedException(
        'your acount has been temporarily banned',
      );
    }
    if (!user.EmailV) {
      const code = uuidv4();
      mailV.code = code;
      mailV.try++;
      if (mailV.try >= 5) {
        mailV.isValid = false;
        this.mailService.update(mailV.id, mailV);
        throw new UnauthorizedException(
          'your acount has been temporarily banned',
        );
      }
      this.mailService.update(mailV.id, mailV);
      this.mailService.sendUserConfirmation(user.email);
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is invalid');
    }
    return this.authService.login({ ...data, emailV: user.EmailV });
  }

  @Post('register')
  async register(
    @Body()
    register: Prisma.userCreateInput,
  ) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: register.email,
          },
        ],
      },
    });
    console.log(register.email);
    console.log(user);
    if (user) {
      throw new UnauthorizedException('User already exists');
    }
    return this.userService.create(register);
  }
  @Post('confirmAcount')
  async confirmAcount(
    @Body()
    code: codedto,
  ) {
    const emailV = await this.prisma.emailVerif.findFirst({
      where: { code: code.code },
    });
    if (emailV == null) {
      throw new UnauthorizedException('Wrong code');
    }
    const user = await this.prisma.user.findFirst({
      where: { id: emailV.userId },
    });
    user.EmailV = true;
    return this.prisma.user.update({ where: { id: user.id }, data: user });
  }
}
