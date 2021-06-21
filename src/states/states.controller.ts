import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';

import { State } from '.prisma/client';

import { StatesService } from './states.service';

@ApiTags('states')
@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Public()
  @Get()
  @ApiResponse({ status: 200, description: 'OK' })
  async findAll(): Promise<State[]> {
    return this.statesService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiResponse({ status: 200, description: 'OK' })
  async findOne(@Param('id') id: string): Promise<State> {
    return this.statesService.findOne(id);
  }
}
