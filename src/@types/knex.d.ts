import { Knex } from 'knex';
import { User } from '@model/user';

declare module 'knex/types/tables' {
  interface Tables {
    users: User;
    users_composite: Knex.CompositeTableType<
      User, // Tipo base
      Pick<User, 'name'> & Partial<Pick<User, 'created_at' | 'updated_at'>>, // Tipo para Criação
      Partial<Omit<User, 'id'>> // Tipo para Update = Retirando o 'id'
    >;
  }
}
