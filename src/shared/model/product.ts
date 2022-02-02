import AppError from '@shared/infra/agregators/AppError';
import * as yup from 'yup';
export interface Product {
  id: string;
  name: string;
}

const ProductCreateSchema = yup.object({
  name: yup.string().required(),
});

const ProductUpdateSchema = yup.object({
  name: yup.string().required(),
});

/**
 * Will throw a AppError when validation failures.
 */
export async function validateProductCreate(payload: Product): Promise<Product> {
  try {
    const user = sanitizeProduct(payload);
    await ProductCreateSchema.validate(user, { abortEarly: false });

    return user;
  } catch (err) {
    throw new AppError('Invalid request body.', 400, err.errors);
  }
}

/**
 * Will throw a AppError when validation failures.
 */
export async function validateProductUpdate(payload: Product): Promise<Product> {
  try {
    const user = sanitizeProduct(payload);
    await ProductUpdateSchema.validate(user, { abortEarly: false });

    return user;
  } catch (err) {
    throw new AppError('Invalid request body.', 400, err.errors);
  }
}

/**
 * Will sanitize the Product object.
 */
export function sanitizeProduct(payload: any): Product {
  const user: Partial<Product> = {
    name: payload?.name,
  };

  return user as Product;
}
