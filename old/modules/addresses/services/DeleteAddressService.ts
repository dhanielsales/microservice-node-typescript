import { PrismaClient, addresses } from '@prisma/client';
import AppError from '@shared/errors/AppError';

class DeleteAddressService {
  private dbInstance = new PrismaClient();

  public async run(id: string): Promise<addresses | null> {
    const address = this.dbInstance.addresses.update({
      where: { id },
      data: { deleted_at: new Date() },
    });

    if (!address) {
      throw new AppError('Not found user', 404);
    }

    return address;
  }
}

export default DeleteAddressService;
