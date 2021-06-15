import { Controller, Get, Param, Query } from '@nestjs/common';

import { City } from '.prisma/client';

import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  findAll(@Query('state_uf') state_uf: string): Promise<City[]> {
    return this.citiesService.findAllByState(state_uf);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<City> {
    return this.citiesService.findOne(id);
  }
}
