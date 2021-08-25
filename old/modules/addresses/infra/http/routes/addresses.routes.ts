import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import CreateAddressService from '@modules/addresses/services/CreateAddressService';
import IndexAddressService from '@modules/addresses/services/IndexAddressService';
import UpdateAddressService from '@modules/addresses/services/UpdateAddressService';
import ShowAddressService from '@modules/addresses/services/ShowAddressService';
import DeleteAddressService from '@modules/addresses/services/DeleteAddressService';

const addressesRouter = Router();
addressesRouter.use(ensureAuthenticated);

/******************** INDEX ********************/
addressesRouter.get('/', async (request, response) => {
  const indexAddressService = new IndexAddressService();
  const addresses = await indexAddressService.run();

  return response.json(addresses);
});

/******************** SHOW ********************/
addressesRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const showAddressService = new ShowAddressService();
  const address = await showAddressService.run(id);

  return response.json(address);
});

/******************** STORE ********************/
addressesRouter.post('/', async (request, response) => {
  const {
    user_id,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    zipcode,
    latitude,
    longitude,
  } = request.body;

  const createAddressService = new CreateAddressService();

  const address = await createAddressService.run({
    user_id,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    zipcode,
    latitude,
    longitude,
  });

  return response.json(address);
});

/******************** UPDATE ********************/
addressesRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const {
    user_id,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    zipcode,
    latitude,
    longitude,
  } = request.body;

  const updateAddressService = new UpdateAddressService();
  const address = await updateAddressService.run({
    id,
    user_id,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    zipcode,
    latitude,
    longitude,
  });

  return response.json(address);
});

/******************** DELETE ********************/
addressesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteAddressService = new DeleteAddressService();
  const address = await deleteAddressService.run(id);

  return response.json(address);
});

export default addressesRouter;
