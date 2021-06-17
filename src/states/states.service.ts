import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

import { State } from '.prisma/client';

@Injectable()
export class StatesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<State[]> {
    return this.prisma.state.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: string): Promise<State> {
    return this.prisma.state.findUnique({ where: { id } });
  }
}
