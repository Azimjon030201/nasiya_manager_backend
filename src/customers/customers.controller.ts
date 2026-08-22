import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create.customer.dto';
import { QueryCustomerDto } from './dto/query.customer.dto';
import { UpdateBlacklistDto } from './dto/update.blacklist.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll(@Query() query: QueryCustomerDto) {
    return this.customersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Patch(':id/blacklist')
  updateBlacklist(
    @Param('id') id: string,
    @Body() updateBlacklistDto: UpdateBlacklistDto,
  ) {
    return this.customersService.updateBlacklist(id, updateBlacklistDto);
  }
}