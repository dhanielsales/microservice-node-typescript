import * as yup from 'yup';

export interface User {
  id: string;
  name: string;
}

const UserValidateSchemas = {
  create: (user: User) => null,
};

const a = yup.object({
  name: yup.string().nullable(),
});
