import { Controller, Get, Param, Query } from '@nestjs/common';

import { Personal } from '.prisma/client';

import { PersonalService } from './personal.service';

@Controller('personal')
export class PersonalController {
  constructor(private personalService: PersonalService) {}

  @Get()
  async findAll(@Query() query): Promise<Personal[]> {
    const { city, page, amountPerPage } = query;
    if (city) {
      return this.personalService.findByCityId(
        city,
        Number(page),
        Number(amountPerPage),
      );
    }
    return this.personalService.findAll(Number(page), Number(amountPerPage));
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return this.personalService.findById(id);
  }
}
