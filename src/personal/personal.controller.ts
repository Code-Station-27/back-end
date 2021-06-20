import { Controller, Get, Query } from '@nestjs/common';

import { Personal } from '.prisma/client';

import { PersonalService } from './personal.service';

@Controller('personal')
export class PersonalController {
  constructor(private personalService: PersonalService) {}

  @Get()
  async findAll(@Query() query): Promise<Personal[]> {
    const { city, page, amountPerPage } = query;
    if (city) {
      return this.personalService.findByCityId(city);
    }
    return this.personalService.findAll(Number(page), Number(amountPerPage));
  }
}
