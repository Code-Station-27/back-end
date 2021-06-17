import { User } from '.prisma/client';

export type UserWithoutPassword = Omit<User, 'city_id' | 'password'>;
