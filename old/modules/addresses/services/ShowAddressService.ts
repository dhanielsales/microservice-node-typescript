import { PrismaClient, addresses } from '@prisma/client';
import AppError from '@shared/errors/AppError';

class ShowAddressService {
  private dbInstance = new PrismaClient();

  public async run(id: string): Promise<addresses | null> {
    const address = this.dbInstance.addresses.findUnique({ where: { id } });

    if (!address) {
      throw new AppError('Not found user', 404);
    }

    return address;
  }
}

export default ShowAddressService;
