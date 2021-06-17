import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

import { Prisma, User_Token } from '.prisma/client';

@Injectable()
export class TokensService {
  constructor(private prisma: PrismaService) {}

  async upsert(data: Prisma.User_TokenCreateInput): Promise<User_Token> {
    return this.prisma.user_Token.upsert({
      where: {
        user_id: data.user.connect.id,
      },
      update: {
        refresh_token: data.refresh_token,
        token: data.token,
      },
      create: data,
    });
  }

  async findOne({
    where,
  }: Prisma.User_TokenFindUniqueArgs): Promise<User_Token> {
    return this.prisma.user_Token.findUnique({
      where,
    });
  }
}
