import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create.customer.dto';
import { QueryCustomerDto } from './dto/query.customer.dto';
import { UpdateBlacklistDto } from './dto/update.blacklist.dto';
import { not } from 'supertest/lib/cookies';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto & { shopId: string }) {
    return this.prisma.customer.create({
      data: {
        shopId: createCustomerDto.shopId,
        firstName: createCustomerDto.firstName,
        lastName: createCustomerDto.lastName,
        phone: createCustomerDto.phone,
        address: createCustomerDto.address,
      },
    });
  }

  async findAll(query: QueryCustomerDto, shopId?: string) {
    const { search, sortByDebt } = query;

    const where: any = {};

    if (shopId) {
      where.shopId = shopId;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ];
    }

    const customers = await this.prisma.customer.findMany({
      where,
      include: {
        debts: {
          where: {
            status: { in: ['ACTIVE', 'PARTIALLY_PAID', 'OVERDUE'] },
          },
          select: {
            totalAmount: true,
            paidAmount: true,
          },
        },
      },
    });

    const formattedData = customers.map((customer) => {
      const totalDebt = customer.debts.reduce((sum, debt) => {
        const remainingDebt =
          Number(debt.totalAmount) - Number(debt.paidAmount);
        return sum + remainingDebt;
      }, 0);

      const { debts, ...customerData } = customer;
      return {
        ...customerData,
        totalDebt,
      };
    });

    if (sortByDebt) {
      formattedData.sort((a, b) =>
        sortByDebt === 'ASC'
          ? a.totalDebt - b.totalDebt
          : b.totalDebt - a.totalDebt,
      );
    }

    return {
      data: formattedData,
      total: formattedData.length,
    };
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        debts: {
          orderBy: { createdAt: 'desc' },
          include: {
            items: true,
            payments: true,
          },
        },
      },
    });

    if (!customer) {
      throw new NotFoundException(customer with id "${id}" not found);
    }

    const paymentHistory = customer.debts.flatMap((debt) => debt.payments);

    const totalDebt = customer.debts
      .filter((d) => d.status !== 'PAID')
      .reduce(
        (sum, debt) =>
          sum + (Number(debt.totalAmount) - Number(debt.paidAmount)),
        0,
      );

    return {
      ...customer,
      totalDebt,
      debtHistory: customer.debts,
      paymentHistory,
    };
  }

  async updateBlacklist(id: string, updateBlacklistDto: UpdateBlacklistDto) {
    await this.findOne(id);

    const updatedCustomer = await this.prisma.customer.update({
      where: { id },
      data: {
        isBlacklisted: updateBlacklistDto.isBlacklisted,
      },
    });

    return {
      message: 'Blacklist status updated successfully',
      id: updatedCustomer.id,
      isBlacklisted: updatedCustomer.isBlacklisted,
    };
  }
}