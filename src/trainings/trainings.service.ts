import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { userSelect } from 'src/shared/utils/user.select';

import { Personal, Prisma, Training } from '.prisma/client';

@Injectable()
export class TrainingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TrainingCreateInput): Promise<Training> {
    const { day, hour } = data;
    if (day < 0 || day > 6 || hour < 0 || hour > 10) {
      throw new BadRequestException('Day or hour is wrong');
    }
    const personal = await this.prisma.personal.findUnique({
      where: { id: data.personal.connect.id },
      include: { trainings: true },
    });
    if (!personal) {
      throw new NotFoundException('Personal not found!');
    }
    const findTrainingPersonal = personal.trainings.find(
      training => training.day === day && training.hour === hour,
    );
    const user = await this.prisma.user.findUnique({
      where: { id: data.user.connect.id },
      include: { trainings: true },
    });
    const findTrainingUser = user.trainings.find(
      training => training.day === day && training.hour === hour,
    );
    if (findTrainingPersonal) {
      throw new BadRequestException(
        'This personal already has a training on this day and hour!',
      );
    }
    if (findTrainingUser) {
      throw new BadRequestException(
        'This user already has a training on this day and hour!',
      );
    }
    return this.prisma.training.create({ data });
  }

  async findByPersonalId(id: string): Promise<Personal> {
    return this.prisma.personal.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            ...userSelect,
          },
        },
        trainings: {
          include: {
            user: {
              select: {
                ...userSelect,
              },
            },
          },
        },
      },
    });
  }

  async findByUserId(id: string): Promise<Training[]> {
    return this.prisma.training.findMany({
      where: { user_id: id },
      include: {
        personal: {
          include: {
            user: true,
          },
        },
      },
    });
  }
}
