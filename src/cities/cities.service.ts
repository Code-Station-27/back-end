import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

import { City } from '.prisma/client';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  async findAllByState(state_uf: string): Promise<City[]> {
    return this.prisma.city.findMany({
      where: { state_uf },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string): Promise<City> {
    return this.prisma.city.findUnique({
      where: { id },
      include: {
        state: true,
      },
    });
  }
}
