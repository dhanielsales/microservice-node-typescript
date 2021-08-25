import { PrismaClient, addresses } from '@prisma/client';
interface Request {
  id: string;
  user_id: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  latitude: number;
  longitude: number;
}

class UpdateAddressService {
  private dbInstance = new PrismaClient();

  public async run(data: Request): Promise<addresses> {
    const address = this.dbInstance.addresses.update({ where: { id: data.id }, data });

    return address;
  }
}

export default UpdateAddressService;
