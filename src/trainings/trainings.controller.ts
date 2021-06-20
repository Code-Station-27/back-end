import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';

import { CreateTrainingDto } from './dtos/create-training.dto';
import { TrainingsService } from './trainings.service';

@Controller('trainings')
export class TrainingsController {
  constructor(private trainingsService: TrainingsService) {}

  @Post()
  async createTraining(@Body() body: CreateTrainingDto, @Req() req) {
    const { personal_id, ...data } = body;
    return this.trainingsService.create({
      ...data,
      personal: { connect: { id: personal_id } },
      user: { connect: { id: req.user.sub } },
    });
  }

  @Get()
  async findTrainingsByPersonal(@Query() query) {
    const { personal_id, user_id } = query;
    if (personal_id) {
      return this.trainingsService.findByPersonalId(personal_id);
    }
    return this.trainingsService.findByUserId(user_id);
  }

  @Get('/me')
  async findMyTrainings(@Req() req) {
    return this.trainingsService.findByUserId(req.user.sub);
  }
}
