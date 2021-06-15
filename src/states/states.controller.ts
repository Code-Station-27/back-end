import { Controller, Get, Param } from '@nestjs/common';

import { State } from '.prisma/client';

import { StatesService } from './states.service';

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Get()
  async findAll(): Promise<State[]> {
    return this.statesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<State> {
    return this.statesService.findOne(id);
  }
}
