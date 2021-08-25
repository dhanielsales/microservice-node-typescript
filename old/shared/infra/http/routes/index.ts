import { Router } from 'express';

import addresses from '@modules/addresses/infra/http/routes/addresses.routes';
import users from '@modules/users/infra/http/routes/users.routes';
import sessions from '@modules/users/infra/http/routes/sessions.routes';
import products from '@modules/products/infra/http/routes/products.routes';
import categories from '@modules/categories/infra/http/routes/categories.routes';
import savedProducts from '@modules/savedProducts/infra/http/routes/savedProducts.routes';
import catalog from '@modules/catalog/infra/http/routes/catalog.routes';

const routes = Router();

routes.use('/users', users);
routes.use('/addresses', addresses);
routes.use('/sessions', sessions);
routes.use('/products', products);
routes.use('/categories', categories);
routes.use('/saved-products', savedProducts);
routes.use('/catalog', catalog);

export default routes;
