import { ConflictException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { AddMemberDto } from './dto/add-member.dto';

@Injectable()
export class ShopsService {
  constructor(private readonly prisma: PrismaService) {}

  async createShop(userId: string, dto: CreateShopDto) {
    const shop = await this.prisma.shop.create({
      data: {
        name: dto.name,
        address: dto.address,
        ownerId: userId,

        members: {
          create: {
            userId,
            role: 'OWNER',
          },
        },
      },
    });

    return shop;
  }

  async searchShops(query: string) {
    const shops = await this.prisma.shop.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    return shops;
  }

  async addMember(
    userId: string,
    shopId: string,
    dto: AddMemberDto,
  ) {
    const owner = await this.prisma.shopMember.findUnique({
      where: {
        userId_shopId: {
          userId,
          shopId,
        },
      },
    });

    if (!owner || owner.role !== 'OWNER') {
      throw new ForbiddenException(
        'Faqat OWNER xodim qo‘sha oladi',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
    });

    if (!user) {
      throw new NotFoundException(
        'User topilmadi',
      );
    }

    const existingMember =
      await this.prisma.shopMember.findUnique({
        where: {
          userId_shopId: {
            userId: dto.userId,
            shopId,
          },
        },
      });

    if (existingMember) {
      throw new ConflictException(
        'Bu user allaqachon ushbu shop a’zosi',
      );
    }

    const member = await this.prisma.shopMember.create({
      data: {
        userId: dto.userId,
        shopId,
        role: 'CASHIER',
      },
      include: {
        user: {
          select: {
            id: true,
            phone: true,
            fullName: true,
          },
        },
      },
    });

    return member;
  }
}
