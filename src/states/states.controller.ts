import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/shared/decorators/public.decorator';

import { State } from '.prisma/client';

import { StatesService } from './states.service';

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Public()
  @Get()
  async findAll(): Promise<State[]> {
    return this.statesService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<State> {
    return this.statesService.findOne(id);
  }
}
