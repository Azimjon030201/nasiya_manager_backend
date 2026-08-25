import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { AddMemberDto } from './dto/add-member.dto';

@Controller('shops')
export class ShopsController {
  constructor(
    private readonly shopsService: ShopsService,
  ) {}

  @Post()
  createShop(
    @Req() req: any,
    @Body() dto: CreateShopDto,
  ) {
    return this.shopsService.createShop(
      req.user.id,
      dto,
    );
  }

  @Get('search')
  searchShops(
    @Query('q') query: string,
  ) {
    return this.shopsService.searchShops(query);
  }

  @Post(':id/members')
  addMember(
    @Req() req: any,
    @Param('id') shopId: string,
    @Body() dto: AddMemberDto,
  ) {
    return this.shopsService.addMember(
      req.user.id,
      shopId,
      dto,
    );
  }
}
