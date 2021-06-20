import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';

import { City } from '.prisma/client';

import { CitiesService } from './cities.service';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Public()
  @Get()
  findAll(@Query('state_uf') state_uf: string): Promise<City[]> {
    return this.citiesService.findAllByState(state_uf);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<City> {
    return this.citiesService.findOne(id);
  }
}
