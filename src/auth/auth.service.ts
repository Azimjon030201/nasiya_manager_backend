import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { phone, password, fullName } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { phone },
    });

    if (existingUser) {
      throw new UnauthorizedException('Bu telefon royxatdan otgan !');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        phone,
        password: hashedPassword,
        fullName,
      },
    });

    const accessToken = this.jwtService.sign({
      sub: user.id,
      phone: user.phone,
    });

    return {
      message: ' muvaffaqiyatli',
      user,
      access_token: accessToken,
    };
  }

  async login(loginDto: LoginDto) {
    const { phone, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      throw new UnauthorizedException('Telefon yoki parol xato !');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Telefon yoki parol xato !');
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      phone: user.phone,
    });

    return {
      message: 'Login muvaffaqiyatli ',
      user,
      access_token: accessToken,
    };
  }
}