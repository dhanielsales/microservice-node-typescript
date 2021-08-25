import { Router } from 'express';

import product from './product';
import user from './user';

const v1 = Router();

v1.use('/user', user);
v1.use('/product', product);

export { v1 };
