import { CreateProviderUseCase } from "../application/CreateProviderUseCase";
import { DeleteProviderUseCase } from "../application/DeleteProviderUseCase";
import { FindAllProvidersUseCase } from "../application/FindAllProviderUseCase";
import { FindByCategoryProvidersUseCase } from "../application/FindByCategoryProvidersUseCase";
import { FindByIdProviderUseCase } from "../application/FindByIdProviderUseCase";
import { UpdateProviderUseCase } from "../application/UpdateProviderUseCase";

import { CreateProviderController } from "./controllers/CreateProviderController";
import { DeleteProviderController } from "./controllers/DeleteProviderController";
import { FindAllProviderController } from "./controllers/FindAllProviderController";
import { FindByCategoryProviderController } from "./controllers/FindByCategoryProvidersController";
import { FindByIdProviderController } from "./controllers/FindByIdProviderController";
import { UpdateProviderController } from "./controllers/UpdateProviderController";

import { ProviderRepository } from "./implementation/ProviderRepository";

const providerRepository = new ProviderRepository();

const createProviderUseCase = new CreateProviderUseCase(providerRepository);
export const createProviderController = new CreateProviderController(createProviderUseCase);

const deleteProviderUseCase = new DeleteProviderUseCase(providerRepository);
export const deleteProviderController = new DeleteProviderController(deleteProviderUseCase);

const findAllProviderUseCase = new FindAllProvidersUseCase(providerRepository);
export const findAllProviderController = new FindAllProviderController(findAllProviderUseCase);

const findByIdProviderUseCase = new FindByIdProviderUseCase(providerRepository);
export const findByIdProviderController = new FindByIdProviderController(findByIdProviderUseCase);

const findByCategoryProvidersUseCase = new FindByCategoryProvidersUseCase(providerRepository);
export const findByCategoryProvidersController = new FindByCategoryProviderController(findByCategoryProvidersUseCase);

const updateProviderUseCase = new UpdateProviderUseCase(providerRepository);
export const updateProviderController = new UpdateProviderController(updateProviderUseCase, findByIdProviderUseCase);