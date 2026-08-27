import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService 
extends PrismaClient
implements OnModuleInit{
    shop: any;
  shopMember: any;
  user: any;
    async onModuleInit(){
        await this.$connect();
    }
}
