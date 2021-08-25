import { Router } from 'express';

import product from './product';
import user from './user';

const v0 = Router();

v0.use('/user', user);
v0.use('/product', product);

export { v0 };
