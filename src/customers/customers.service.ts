import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create.customer.dto';
import { UpdateBlacklistDto } from './dto/update.blacklist.dto'

@Injectable()
export class CustomersService {
  async create(createCustomerDto: CreateCustomerDto) {
    return { id: 'customer_id', ...createCustomerDto };
  }

  async findAll(search?: string, filter?: string) {
    return [];
  }

  async findOne(id: string) {
    return { id, name: 'John Doe', debtHistory: [] };
  }

  async updateBlacklist(id: string, updateBlacklistDto: UpdateBlacklistDto) {
    return { message: 'Customer blacklist status updated' };
  }
}
