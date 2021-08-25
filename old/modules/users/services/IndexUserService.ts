import { PrismaClient, users } from '@prisma/client';

class IndexUserService {
  private dbInstance = new PrismaClient();

  public async run(): Promise<users[]> {
    const users = await this.dbInstance.users.findMany();

    return users;
  }
}

export default IndexUserService;
