import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create.customer.dto';
import { QueryCustomerDto } from './dto/query.customer.dto';
import { UpdateBlacklistDto } from './dto/update.blacklist.dto';

@Injectable()
export class CustomersService {
  async create(dto: CreateCustomerDto) {
    return {
      id: 'customer_uuid',
      ...dto,
      isBlacklisted: false,
      createdAt: new Date(),
    };
  }

  async findAll(query: QueryCustomerDto) {
    const { search, sortByDebt } = query;
    return {
      data: [],
      total: 0,
    };
  }

  async findOne(id: string) {
    return {
      id,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+998901234567',
      totalDebt: 1500000, 
      isBlacklisted: false,
      debtHistory: [],    
      paymentHistory: [],
    };
  }

  async updateBlacklist(id: string, dto: UpdateBlacklistDto) {
    return {
      message: 'Blacklist status updated successfully',
      id,
      isBlacklisted: dto.isBlacklisted,
    };
  }
}