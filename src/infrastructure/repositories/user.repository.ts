import { type UserPayload } from "@/entities/models/user";
import { type Prisma, type PrismaClient } from "@prisma/client";

export class UserRepository {
  constructor(private _db: PrismaClient | Prisma.TransactionClient) {}

  async findUserByUsername(username: string) {
    const data = await this._db.user.findFirst({ where: { username } });
    return data;
  }

  async findUserById(id: string) {
    const data = await this._db.user.findUnique({ where: { id } });
    return data;
  }

  async create(user: UserPayload) {
    return this._db.user.create({ data: user });
  }
}
