import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

import { Personal } from '.prisma/client';

@Injectable()
export class PersonalService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, amountPerPage: number): Promise<Personal[]> {
    return this.prisma.personal.findMany({
      include: {
        user: true,
      },
      skip: (page - 1) * amountPerPage,
      take: amountPerPage,
    });
  }

  async findByCityId(id: string): Promise<Personal[]> {
    return this.prisma.personal.findMany({
      where: {
        user: {
          city_id: id,
        },
      },
      include: { user: true },
    });
  }
}
