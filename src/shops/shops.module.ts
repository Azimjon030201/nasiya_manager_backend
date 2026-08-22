import { Module } from '@nestjs/common';

import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ShopsController],
  providers: [
    ShopsService,
    PrismaService,
  ],
})
export class ShopsModule { }