import { Knex } from 'knex';
import { User } from '@model/user';
import { Product } from '@model/product';

declare module 'knex/types/tables' {
  interface Tables {
    // Users Table
    users: User;
    users_composite: Knex.CompositeTableType<
      User, // Tipo base
      Partial<Omit<User, 'id'>> & Partial<Pick<User, 'created_at' | 'updated_at'>>, // Tipo para Criação
      Partial<Omit<User, 'id'>> // Tipo para Update = Retirando o 'id'
    >;

    // Products Table
    products: Product;
    products_composite: Knex.CompositeTableType<
      Product, // Tipo base
      Partial<Omit<Product, 'id'>> & Partial<Pick<Product, 'created_at' | 'updated_at'>>, // Tipo para Criação
      Partial<Omit<Product, 'id'>> // Tipo para Update = Retirando o 'id'
    >;
  }
}
