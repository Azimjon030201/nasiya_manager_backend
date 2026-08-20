import {  Injectable, } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import {PrismaService} from '../prisma/prismaservice'
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  private otpStore = new Map<string, { code: string; expiresAt: number; registerData: RegisterDto }>();

  constructor(private prisma: PrismaService) {}
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
