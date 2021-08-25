import { PrismaClient, addresses } from '@prisma/client';
interface Request {
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

class CreateAddressService {
  private dbInstance = new PrismaClient();

  public async run(data: Request): Promise<addresses> {
    const address = this.dbInstance.addresses.create({ data });

    return address;
  }
}

export default CreateAddressService;
