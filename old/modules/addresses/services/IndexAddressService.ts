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

class IndexAddressService {
  private dbInstance = new PrismaClient();

  public async run(): Promise<addresses[]> {
    const addresses = this.dbInstance.addresses.findMany();

    return addresses;
  }
}

export default IndexAddressService;
